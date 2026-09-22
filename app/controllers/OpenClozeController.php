<?php
// OpenClozeController: KET Reading/Writing Part 5 (Open Cloze - Letter
// Completion). Khác hẳn Part 4: đây là ô nhập tự do (không có A/B/C),
// người dùng phải tự gõ đúng từ vào mỗi chỗ trống. Câu EXAMPLE (số 0)
// không tính điểm. Tuyệt đối không để lộ correct_answer của các câu thật
// (41-50) trong HTML source của trang làm bài.

class OpenClozeController extends Controller
{
    private const MAX_ANSWER_LENGTH = 30;

    private OpenClozeQuestion $openClozeModel;

    public function __construct(private PDO $pdo)
    {
        $this->openClozeModel = new OpenClozeQuestion($pdo);
    }

    public function index(): void
    {
        $testId = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        $test = $testId > 0 ? $this->openClozeModel->getTestById($testId) : null;

        if ($test === null) {
            $this->renderNotFound();
            return;
        }

        $questionRows = $this->openClozeModel->getQuestionsByTestId($testId);

        // Chỉ giữ correct_answer cho câu EXAMPLE (dùng để hiển thị sẵn đáp án mẫu).
        // Các câu thật (41-50) không được mang correct_answer sang View.
        $questions = array_map(static function (array $q): array {
            $isExample = (int) $q['is_example'] === 1;

            return [
                'question_number' => (int) $q['question_number'],
                'is_example'      => $isExample,
                'correct_answer'  => $isExample ? $q['correct_answer'] : null,
            ];
        }, $questionRows);

        $letter1Html = $this->buildLetterHtml($test['letter1_html'], $questions);
        $letter2Html = $this->buildLetterHtml($test['letter2_html'], $questions);

        $blankCount = count(array_filter($questions, static fn (array $q) => !$q['is_example']));

        $this->render('opencloze/index', [
            'test'        => $test,
            'letter1Html' => $letter1Html,
            'letter2Html' => $letter2Html,
            'blankCount'  => $blankCount,
        ]);
    }

    public function result(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->renderError('Yêu cầu không hợp lệ.', null);
            return;
        }

        $testId = isset($_POST['test_id']) ? (int) $_POST['test_id'] : 0;
        $test = $testId > 0 ? $this->openClozeModel->getTestById($testId) : null;

        if ($test === null) {
            $this->renderError('Không tìm thấy đề thi.', null);
            return;
        }

        $questionRows = $this->openClozeModel->getQuestionsByTestId($testId);
        $submittedAnswers = is_array($_POST['answers'] ?? null) ? $_POST['answers'] : [];

        $questions = [];
        foreach ($questionRows as $q) {
            $questions[(int) $q['question_number']] = $q;
        }

        $correctCount = 0;
        $review = [];

        foreach ($questionRows as $question) {
            // Câu EXAMPLE (số 0) không tính điểm, không đưa vào bài chấm/review.
            if ((int) $question['is_example'] === 1) {
                continue;
            }

            $number = (int) $question['question_number'];
            $raw = $submittedAnswers[$number] ?? '';
            $raw = is_string($raw) ? trim($raw) : '';
            $raw = mb_substr($raw, 0, self::MAX_ANSWER_LENGTH); // chặn spam dữ liệu bất thường

            $userAnswerLower = mb_strtolower($raw);
            $acceptedAnswers = array_map('mb_strtolower', explode('|', (string) $question['correct_answer']));

            $isCorrect = $raw !== '' && in_array($userAnswerLower, $acceptedAnswers, true);

            if ($isCorrect) {
                $correctCount++;
            }

            $review[] = [
                'question_number'       => $number,
                'user_answer'           => $raw,
                'correct_answer_display' => str_replace('|', ' / ', (string) $question['correct_answer']),
                'is_correct'            => $isCorrect,
            ];
        }

        $total = count($review);
        $wrong = $total - $correctCount;
        $accuracy = $total > 0 ? round($correctCount / $total * 100, 1) : 0.0;

        // Dựng lại 2 lá thư ở dạng "đã chấm": mỗi chỗ trống hiển thị đáp án
        // người dùng đã gõ, tô màu đúng/sai, để review có ngữ cảnh câu văn.
        $reviewByNumber = [];
        foreach ($review as $item) {
            $reviewByNumber[$item['question_number']] = $item;
        }

        $letter1ReviewHtml = $this->buildReviewLetterHtml($test['letter1_html'], $questions, $reviewByNumber);
        $letter2ReviewHtml = $this->buildReviewLetterHtml($test['letter2_html'], $questions, $reviewByNumber);

        $this->render('opencloze/result', [
            'test'              => $test,
            'letter1ReviewHtml' => $letter1ReviewHtml,
            'letter2ReviewHtml' => $letter2ReviewHtml,
            'total'             => $total,
            'correct'           => $correctCount,
            'wrong'             => $wrong,
            'accuracy'          => $accuracy,
            'review'            => $review,
        ]);
    }

    // ----- Trang làm bài: thay {{n}} bằng <input> (hoặc đáp án mẫu cho câu 0) -----

    private function buildLetterHtml(string $rawHtml, array $questions): string
    {
        $questionsByNumber = [];
        foreach ($questions as $question) {
            $questionsByNumber[$question['question_number']] = $question;
        }

        $escaped = htmlspecialchars($rawHtml, ENT_QUOTES, 'UTF-8');

        $html = preg_replace_callback(
            '/\{\{(\d+)\}\}/',
            function (array $matches) use ($questionsByNumber): string {
                $number = (int) $matches[1];

                if (!isset($questionsByNumber[$number])) {
                    return $matches[0];
                }

                return $this->renderInlineBlank($questionsByNumber[$number]);
            },
            $escaped
        );

        return nl2br($html);
    }

    private function renderInlineBlank(array $question): string
    {
        if ($question['is_example']) {
            $answerText = explode('|', (string) $question['correct_answer'])[0];

            return '(<span class="oc-example-label">Example:</span> '
                . '<span class="oc-example-answer">' . htmlspecialchars($answerText) . '</span>)';
        }

        $number = $question['question_number'];

        return '<span class="oc-blank">'
            . '<span class="oc-number">' . $number . '</span>'
            . '<input type="text" name="answers[' . $number . ']" size="8" maxlength="' . self::MAX_ANSWER_LENGTH . '" autocomplete="off" class="oc-input">'
            . '</span>';
    }

    // ----- Trang kết quả: thay {{n}} bằng đáp án người dùng đã gõ, tô màu đúng/sai -----

    private function buildReviewLetterHtml(string $rawHtml, array $questionsByNumber, array $reviewByNumber): string
    {
        $escaped = htmlspecialchars($rawHtml, ENT_QUOTES, 'UTF-8');

        $html = preg_replace_callback(
            '/\{\{(\d+)\}\}/',
            function (array $matches) use ($questionsByNumber, $reviewByNumber): string {
                $number = (int) $matches[1];

                if (!isset($questionsByNumber[$number])) {
                    return $matches[0];
                }

                $question = $questionsByNumber[$number];

                if ((int) $question['is_example'] === 1) {
                    $answerText = explode('|', (string) $question['correct_answer'])[0];

                    return '(<span class="oc-example-label">Example:</span> '
                        . '<span class="oc-example-answer">' . htmlspecialchars($answerText) . '</span>)';
                }

                $review = $reviewByNumber[$number] ?? null;

                if ($review === null) {
                    return $matches[0];
                }

                $displayText = $review['user_answer'] !== '' ? htmlspecialchars($review['user_answer']) : '—';
                $statusClass = $review['is_correct'] ? 'oc-review-correct' : 'oc-review-wrong';
                $title = 'Correct answer: ' . htmlspecialchars($review['correct_answer_display']);

                return '<span class="oc-review-blank ' . $statusClass . '" title="' . $title . '">'
                    . $displayText . '</span>';
            },
            $escaped
        );

        return nl2br($html);
    }

    private function renderNotFound(): void
    {
        http_response_code(404);
        echo '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8">'
            . '<title>Không tìm thấy đề thi</title>'
            . '<link rel="stylesheet" href="css/style.css"></head><body>'
            . '<main class="page"><p class="error-message">Không tìm thấy đề thi.</p>'
            . '<p><a href="index.php">Quay về trang chủ</a></p></main></body></html>';
    }

    private function renderError(string $message, ?int $testId): void
    {
        http_response_code(400);
        $backLink = $testId !== null
            ? 'index.php?controller=opencloze&action=index&id=' . $testId
            : 'index.php';

        echo '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8">'
            . '<title>Lỗi</title><link rel="stylesheet" href="css/style.css"></head><body>'
            . '<main class="page"><p class="error-message">' . htmlspecialchars($message) . '</p>'
            . '<p><a href="' . htmlspecialchars($backLink) . '">Quay lại làm bài</a></p></main></body></html>';
    }
}
