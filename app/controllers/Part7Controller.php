<?php
// Part7Controller: KET Reading Part 7 (Complete the Letter(s)).
// Giống Part 5 (Open Cloze) về bản chất - ô nhập tự do, không phải A/B/C -
// nhưng tổng quát hơn: 1 đề có thể có 1 hoặc NHIỀU thư (Part 5 luôn cố định
// 2 thư). Thêm tính năng riêng: bảng "Gợi ý" ẩn/hiện theo yêu cầu người
// dùng. Câu EXAMPLE (số 0) không tính điểm. Không để lộ correct_answer của
// các câu thật trong HTML ở chế độ ẩn gợi ý (chỉ xuất hiện khi người dùng
// chủ động bấm mở bảng gợi ý - đây là tính năng có chủ đích của Part 7,
// khác với các Part khác không có nút "xem đáp án" trước khi nộp bài).

class Part7Controller extends Controller
{
    private const MAX_ANSWER_LENGTH = 30;

    private Part7Question $part7Model;

    public function __construct(private PDO $pdo)
    {
        $this->part7Model = new Part7Question($pdo);
    }

    // Trang chọn đề: bấm 1 KET (KET 2..KET 6) để mở ra các nút Test 1-4 của
    // nhóm đó, bấm Test để vào làm bài. Đây là trang chủ của Part 7 (link
    // trang chủ / tab bar trỏ vào đây thay vì thẳng vào 1 đề cố định, vì
    // Part 7 có nhiều đề).
    public function browse(): void
    {
        $tests = $this->part7Model->getAllTests();

        $grouped = [];
        foreach ($tests as $test) {
            $groupLabel = $test['ket_group'] !== '' ? $test['ket_group'] : 'Khác';
            $grouped[$groupLabel][] = $test;
        }

        $this->render('part7/browse', ['grouped' => $grouped]);
    }

    public function index(): void
    {
        $testId = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        $test = $testId > 0 ? $this->part7Model->getTestById($testId) : null;

        if ($test === null) {
            $this->renderNotFound();
            return;
        }

        $letterRows = $this->part7Model->getLettersByTestId($testId);
        $questionRows = $this->part7Model->getQuestionsByTestId($testId);

        $questions = array_map(static function (array $q): array {
            $isExample = (int) $q['is_example'] === 1;

            return [
                'question_number' => (int) $q['question_number'],
                'is_example'      => $isExample,
                'correct_answer'  => $isExample ? $q['correct_answer'] : null,
            ];
        }, $questionRows);

        $letters = array_map(function (array $letter) use ($questions): array {
            return [
                'dateline'   => $letter['dateline'],
                'salutation' => $letter['salutation'],
                'bodyHtml'   => $this->buildLetterHtml($letter['body_html'], $questions),
                'closing'    => $letter['closing'],
                'signature'  => $letter['signature'],
            ];
        }, $letterRows);

        $realQuestions = array_filter($questionRows, static fn (array $q) => (int) $q['is_example'] !== 1);
        usort($realQuestions, static fn ($a, $b) => (int) $a['question_number'] <=> (int) $b['question_number']);

        $hints = array_map(static function (array $q): array {
            return [
                'question_number' => (int) $q['question_number'],
                'answer'          => explode('|', (string) $q['correct_answer'])[0],
            ];
        }, $realQuestions);

        $instructionLines = array_filter(explode("\n", (string) $test['instructions']));

        $this->render('part7/index', [
            'test'             => $test,
            'letters'          => $letters,
            'hints'            => $hints,
            'blankCount'       => count($realQuestions),
            'instructionLines' => $instructionLines,
        ]);
    }

    public function result(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->renderError('Yêu cầu không hợp lệ.', null);
            return;
        }

        $testId = isset($_POST['test_id']) ? (int) $_POST['test_id'] : 0;
        $test = $testId > 0 ? $this->part7Model->getTestById($testId) : null;

        if ($test === null) {
            $this->renderError('Không tìm thấy đề thi.', null);
            return;
        }

        $letterRows = $this->part7Model->getLettersByTestId($testId);
        $questionRows = $this->part7Model->getQuestionsByTestId($testId);
        $submittedAnswers = is_array($_POST['answers'] ?? null) ? $_POST['answers'] : [];

        $questionsByNumber = [];
        foreach ($questionRows as $q) {
            $questionsByNumber[(int) $q['question_number']] = $q;
        }

        $correctCount = 0;
        $review = [];

        foreach ($questionRows as $question) {
            if ((int) $question['is_example'] === 1) {
                continue;
            }

            $number = (int) $question['question_number'];
            $raw = $submittedAnswers[$number] ?? '';
            $raw = is_string($raw) ? trim($raw) : '';
            $raw = mb_substr($raw, 0, self::MAX_ANSWER_LENGTH);

            $userAnswerLower = mb_strtolower($raw);
            $acceptedAnswers = array_map('mb_strtolower', explode('|', (string) $question['correct_answer']));

            $isCorrect = $raw !== '' && in_array($userAnswerLower, $acceptedAnswers, true);

            if ($isCorrect) {
                $correctCount++;
            }

            $review[] = [
                'question_number'        => $number,
                'user_answer'            => $raw,
                'correct_answer_display' => str_replace('|', ' / ', (string) $question['correct_answer']),
                'is_correct'             => $isCorrect,
            ];
        }

        $total = count($review);
        $wrong = $total - $correctCount;
        $accuracy = $total > 0 ? round($correctCount / $total * 100, 1) : 0.0;

        $reviewByNumber = [];
        foreach ($review as $item) {
            $reviewByNumber[$item['question_number']] = $item;
        }

        $letters = array_map(function (array $letter) use ($questionsByNumber, $reviewByNumber): array {
            return [
                'dateline'   => $letter['dateline'],
                'salutation' => $letter['salutation'],
                'bodyHtml'   => $this->buildReviewLetterHtml($letter['body_html'], $questionsByNumber, $reviewByNumber),
                'closing'    => $letter['closing'],
                'signature'  => $letter['signature'],
            ];
        }, $letterRows);

        $this->render('part7/result', [
            'test'     => $test,
            'letters'  => $letters,
            'total'    => $total,
            'correct'  => $correctCount,
            'wrong'    => $wrong,
            'accuracy' => $accuracy,
            'review'   => $review,
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
            ? 'index.php?controller=part7&action=index&id=' . $testId
            : 'index.php';

        echo '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8">'
            . '<title>Lỗi</title><link rel="stylesheet" href="css/style.css"></head><body>'
            . '<main class="page"><p class="error-message">' . htmlspecialchars($message) . '</p>'
            . '<p><a href="' . htmlspecialchars($backLink) . '">Quay lại làm bài</a></p></main></body></html>';
    }
}
