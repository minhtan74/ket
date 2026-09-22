<?php
// ExamController: hiển thị đề thi KET Reading Part 1 (dạng Matching).
// Tuyệt đối không truyền correct_answer / explanation sang View ở bước này,
// nếu không người dùng có thể xem đáp án đúng trong HTML source.

class ExamController extends Controller
{
    private Test $testModel;
    private Question $questionModel;
    private Option $optionModel;

    public function __construct(private PDO $pdo)
    {
        $this->testModel = new Test($pdo);
        $this->questionModel = new Question($pdo);
        $this->optionModel = new Option($pdo);
    }

    public function index(): void
    {
        $testId = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        $test = $testId > 0 ? $this->testModel->getTestById($testId) : null;

        if ($test === null || (int) $test['part'] !== 1) {
            $this->renderNotFound();
            return;
        }

        $questionRows = $this->questionModel->getQuestionsByTestId($testId);
        $options = $this->optionModel->getOptionsByTestId($testId);

        // Chỉ giữ lại các trường cần thiết cho giao diện làm bài,
        // bỏ correct_answer và explanation.
        $questions = array_map(static function (array $q): array {
            return [
                'id'              => $q['id'],
                'question_number' => $q['question_number'],
                'question_text'   => $q['question_text'],
            ];
        }, $questionRows);

        $this->render('exam/index', [
            'test'      => $test,
            'questions' => $questions,
            'options'   => $options,
        ]);
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
}
