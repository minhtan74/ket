<?php
// Part4Controller: KET Reading Part 4 (Multiple Choice Cloze).
// Đoạn văn có các chỗ trống {{n}} được thay bằng <select> ngay trong văn bản.
// Câu EXAMPLE (số 0) không tính điểm. Tuyệt đối không để lộ correct_answer
// của các câu thật (28-35) trong HTML source của trang làm bài.

class Part4Controller extends Controller
{
    private const VALID_LETTERS = ['A', 'B', 'C'];

    private ClozeQuestion $clozeModel;

    public function __construct(private PDO $pdo)
    {
        $this->clozeModel = new ClozeQuestion($pdo);
    }

    public function index(): void
    {
        $testId = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        $test = $testId > 0 ? $this->clozeModel->getTestById($testId) : null;

        if ($test === null || (int) $test['part'] !== 4) {
            $this->renderNotFound();
            return;
        }

        $questionRows = $this->clozeModel->getQuestionsByTestId($testId);

        // Chỉ giữ correct_answer cho câu EXAMPLE (dùng để hiển thị sẵn đáp án mẫu).
        // Các câu thật (28-35) không được mang correct_answer sang View.
        $questions = array_map(static function (array $q): array {
            $isExample = (int) $q['is_example'] === 1;

            return [
                'question_number' => (int) $q['question_number'],
                'option_a'        => $q['option_a'],
                'option_b'        => $q['option_b'],
                'option_c'        => $q['option_c'],
                'is_example'      => $isExample,
                'correct_answer'  => $isExample ? $q['correct_answer'] : null,
            ];
        }, $questionRows);

        $passageHtml = $this->buildPassageHtml($test['passage_html'], $questions);

        $this->render('part4/index', [
            'test'        => $test,
            'passageHtml' => $passageHtml,
            'blankCount'  => count(array_filter($questions, static fn (array $q) => !$q['is_example'])),
        ]);
    }

    public function result(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->renderError('Yêu cầu không hợp lệ.', null);
            return;
        }

        $testId = isset($_POST['test_id']) ? (int) $_POST['test_id'] : 0;
        $test = $testId > 0 ? $this->clozeModel->getTestById($testId) : null;

        if ($test === null || (int) $test['part'] !== 4) {
            $this->renderError('Không tìm thấy đề thi.', null);
            return;
        }

        $questions = $this->clozeModel->getQuestionsByTestId($testId);
        $submittedAnswers = is_array($_POST['answers'] ?? null) ? $_POST['answers'] : [];

        $correctCount = 0;
        $review = [];

        foreach ($questions as $question) {
            // Câu EXAMPLE (số 0) không tính điểm, không đưa vào bài chấm/review.
            if ((int) $question['is_example'] === 1) {
                continue;
            }

            $number = (int) $question['question_number'];
            $raw = $submittedAnswers[$number] ?? '';
            $raw = is_string($raw) ? strtoupper(trim($raw)) : '';

            // Giá trị lạ hoặc rỗng -> coi như chưa trả lời (không tin dữ liệu client).
            if (!in_array($raw, self::VALID_LETTERS, true)) {
                $raw = '';
            }

            $correctAnswer = $question['correct_answer'];
            $isCorrect = $raw !== '' && $raw === $correctAnswer;

            if ($isCorrect) {
                $correctCount++;
            }

            $review[] = [
                'question_number' => $number,
                'option_a'        => $question['option_a'],
                'option_b'        => $question['option_b'],
                'option_c'        => $question['option_c'],
                'user_answer'     => $raw,
                'correct_answer'  => $correctAnswer,
                'is_correct'      => $isCorrect,
            ];
        }

        $total = count($review);
        $wrong = $total - $correctCount;
        $accuracy = $total > 0 ? round($correctCount / $total * 100, 1) : 0.0;

        $this->render('part4/result', [
            'test'     => $test,
            'total'    => $total,
            'correct'  => $correctCount,
            'wrong'    => $wrong,
            'accuracy' => $accuracy,
            'review'   => $review,
        ]);
    }

    // Thay từng {{n}} trong đoạn văn bằng <select> tương ứng.
    // Phần văn bản xung quanh được escape bằng htmlspecialchars trước,
    // sau đó mới chèn <select> (tự dựng, đã escape nội dung option) vào chỗ trống.
    private function buildPassageHtml(string $rawPassage, array $questions): string
    {
        $questionsByNumber = [];
        foreach ($questions as $question) {
            $questionsByNumber[$question['question_number']] = $question;
        }

        $escapedPassage = htmlspecialchars($rawPassage, ENT_QUOTES, 'UTF-8');

        return preg_replace_callback(
            '/\{\{(\d+)\}\}/',
            function (array $matches) use ($questionsByNumber): string {
                $number = (int) $matches[1];

                if (!isset($questionsByNumber[$number])) {
                    return $matches[0];
                }

                return $this->renderInlineSelect($questionsByNumber[$number]);
            },
            $escapedPassage
        );
    }

    private function renderInlineSelect(array $question): string
    {
        $letters = [
            'A' => $question['option_a'],
            'B' => $question['option_b'],
            'C' => $question['option_c'],
        ];

        if ($question['is_example']) {
            $optionsHtml = '';
            foreach ($letters as $letter => $text) {
                $selected = $letter === $question['correct_answer'] ? ' selected' : '';
                $optionsHtml .= '<option value="' . $letter . '"' . $selected . '>' . htmlspecialchars($text) . '</option>';
            }

            return '<span class="cloze-example-badge">EXAMPLE</span>'
                . '<select class="cloze-select cloze-example" disabled>' . $optionsHtml . '</select>';
        }

        $number = $question['question_number'];
        $optionsHtml = '<option value="">' . $number . '</option>';

        foreach ($letters as $letter => $text) {
            $optionsHtml .= '<option value="' . $letter . '">' . htmlspecialchars($text) . '</option>';
        }

        return '<select name="answers[' . $number . ']" class="cloze-select" data-question="' . $number . '">'
            . $optionsHtml . '</select>';
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
            ? 'index.php?controller=part4&action=index&id=' . $testId
            : 'index.php';

        echo '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8">'
            . '<title>Lỗi</title><link rel="stylesheet" href="css/style.css"></head><body>'
            . '<main class="page"><p class="error-message">' . htmlspecialchars($message) . '</p>'
            . '<p><a href="' . htmlspecialchars($backLink) . '">Quay lại làm bài</a></p></main></body></html>';
    }
}
