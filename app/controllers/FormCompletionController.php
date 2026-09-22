<?php
// FormCompletionController: KET Reading Part 6 (Form Completion).
// Khác hẳn Part 1/4/Open Cloze: người dùng đọc 2 văn bản KHÔNG có chỗ
// trống, rồi tự tổng hợp thông tin để điền vào 1 cái FORM riêng biệt
// (5 ô 51-55). Chấm điểm phải LINH HOẠT hơn Open Cloze vì đáp án ở đây
// là cụm từ/thông tin suy luận được diễn đạt theo nhiều cách, không phải
// 1 từ ngữ pháp duy nhất. Tuyệt đối không để lộ correct_answer trong HTML
// source của trang làm bài.

class FormCompletionController extends Controller
{
    private const MAX_ANSWER_LENGTH = 40;

    private FormQuestion $formModel;

    public function __construct(private PDO $pdo)
    {
        $this->formModel = new FormQuestion($pdo);
    }

    public function index(): void
    {
        $testId = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        $test = $testId > 0 ? $this->formModel->getTestById($testId) : null;

        if ($test === null) {
            $this->renderNotFound();
            return;
        }

        $fieldRows = $this->formModel->getFieldsByTestId($testId);

        // Không truyền correct_answer / explanation sang View ở bước làm bài.
        $fields = array_map(static function (array $f): array {
            return [
                'field_number' => (int) $f['field_number'],
                'field_label'  => $f['field_label'],
                'field_prefix' => $f['field_prefix'],
            ];
        }, $fieldRows);

        $this->render('formcompletion/index', [
            'test'   => $test,
            'fields' => $fields,
        ]);
    }

    public function result(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->renderError('Yêu cầu không hợp lệ.', null);
            return;
        }

        $testId = isset($_POST['test_id']) ? (int) $_POST['test_id'] : 0;
        $test = $testId > 0 ? $this->formModel->getTestById($testId) : null;

        if ($test === null) {
            $this->renderError('Không tìm thấy đề thi.', null);
            return;
        }

        $fieldRows = $this->formModel->getFieldsByTestId($testId);
        $submittedAnswers = is_array($_POST['answers'] ?? null) ? $_POST['answers'] : [];

        $correctCount = 0;
        $review = [];

        foreach ($fieldRows as $field) {
            $number = (int) $field['field_number'];
            $raw = $submittedAnswers[$number] ?? '';
            $raw = is_string($raw) ? trim($raw) : '';
            $raw = mb_substr($raw, 0, self::MAX_ANSWER_LENGTH); // chặn spam dữ liệu bất thường

            $acceptedAnswers = explode('|', (string) $field['correct_answer']);
            $isCorrect = $raw !== '' && $this->matchesAnyAnswer($raw, $acceptedAnswers);

            if ($isCorrect) {
                $correctCount++;
            }

            $review[] = [
                'field_number'          => $number,
                'field_label'           => $field['field_label'],
                'field_prefix'          => $field['field_prefix'],
                'user_answer'           => $raw,
                'correct_answer_display' => str_replace('|', ' / ', (string) $field['correct_answer']),
                'is_correct'            => $isCorrect,
                'explanation'           => $field['explanation'],
            ];
        }

        $total = count($review);
        $wrong = $total - $correctCount;
        $accuracy = $total > 0 ? round($correctCount / $total * 100, 1) : 0.0;

        $this->render('formcompletion/result', [
            'test'     => $test,
            'total'    => $total,
            'correct'  => $correctCount,
            'wrong'    => $wrong,
            'accuracy' => $accuracy,
            'review'   => $review,
        ]);
    }

    // So khớp linh hoạt: chữ thường, bỏ khoảng trắng thừa, chấp nhận nhiều
    // cách diễn đạt đúng nghĩa (correct_answer phân tách bởi "|"). Đây là
    // điểm khác biệt so với Open Cloze (chỉ so khớp 1 từ ngữ pháp).
    private function matchesAnyAnswer(string $userAnswer, array $acceptedAnswers): bool
    {
        $normalizedUserAnswer = $this->normalize($userAnswer);

        foreach ($acceptedAnswers as $accepted) {
            if ($normalizedUserAnswer === $this->normalize($accepted)) {
                return true;
            }
        }

        return false;
    }

    private function normalize(string $text): string
    {
        $lower = mb_strtolower(trim($text));

        // Gộp nhiều khoảng trắng liên tiếp thành 1 khoảng trắng, để "Walton   Zoo"
        // và "Walton Zoo" được coi là giống nhau.
        return preg_replace('/\s+/', ' ', $lower);
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
            ? 'index.php?controller=formcompletion&action=index&id=' . $testId
            : 'index.php';

        echo '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8">'
            . '<title>Lỗi</title><link rel="stylesheet" href="css/style.css"></head><body>'
            . '<main class="page"><p class="error-message">' . htmlspecialchars($message) . '</p>'
            . '<p><a href="' . htmlspecialchars($backLink) . '">Quay lại làm bài</a></p></main></body></html>';
    }
}
