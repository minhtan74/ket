<?php
// ResultController: nhận đáp án người dùng gửi lên (POST), tự validate lại
// toàn bộ (không tin JavaScript phía client), so với correct_answer trong
// database rồi chấm điểm.

class ResultController extends Controller
{
    private const VALID_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    private Test $testModel;
    private Question $questionModel;

    public function __construct(private PDO $pdo)
    {
        $this->testModel = new Test($pdo);
        $this->questionModel = new Question($pdo);
    }

    public function index(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->renderError('Yêu cầu không hợp lệ.', null);
            return;
        }

        $testId = isset($_POST['test_id']) ? (int) $_POST['test_id'] : 0;
        $test = $testId > 0 ? $this->testModel->getTestById($testId) : null;

        if ($test === null || (int) $test['part'] !== 1) {
            $this->renderError('Không tìm thấy đề thi.', null);
            return;
        }

        $questions = $this->questionModel->getQuestionsByTestId($testId);
        $submittedAnswers = is_array($_POST['answers'] ?? null) ? $_POST['answers'] : [];

        // ----- Bước 1: làm sạch dữ liệu, chỉ chấp nhận A-H -----
        $cleanAnswers = [];   // question_id => 'A'..'H' hoặc '' (chưa trả lời)
        $usedLetters = [];

        foreach ($questions as $question) {
            $questionId = (int) $question['id'];
            $raw = $submittedAnswers[$questionId] ?? '';
            $raw = is_string($raw) ? strtoupper(trim($raw)) : '';

            if (!in_array($raw, self::VALID_LETTERS, true)) {
                $raw = ''; // giá trị lạ hoặc rỗng -> coi như chưa trả lời
            }

            $cleanAnswers[$questionId] = $raw;

            if ($raw !== '') {
                $usedLetters[$raw] = ($usedLetters[$raw] ?? 0) + 1;
            }
        }

        // ----- Bước 2: mỗi đáp án chỉ được dùng một lần -----
        foreach ($usedLetters as $count) {
            if ($count > 1) {
                $this->renderError('Đáp án này đã được sử dụng cho câu khác.', $testId);
                return;
            }
        }

        // ----- Bước 3: chấm điểm -----
        $correctCount = 0;
        $review = [];

        foreach ($questions as $question) {
            $questionId = (int) $question['id'];
            $userAnswer = $cleanAnswers[$questionId];
            $correctAnswer = $question['correct_answer'];
            $isCorrect = $userAnswer !== '' && $userAnswer === $correctAnswer;

            if ($isCorrect) {
                $correctCount++;
            }

            $review[] = [
                'question_number' => $question['question_number'],
                'question_text'   => $question['question_text'],
                'user_answer'     => $userAnswer,
                'correct_answer'  => $correctAnswer,
                'is_correct'      => $isCorrect,
                'explanation'     => $question['explanation'],
            ];
        }

        $total = count($questions);
        $wrong = $total - $correctCount;
        $accuracy = $total > 0 ? round($correctCount / $total * 100, 1) : 0.0;

        $this->render('result/index', [
            'test'     => $test,
            'total'    => $total,
            'correct'  => $correctCount,
            'wrong'    => $wrong,
            'accuracy' => $accuracy,
            'review'   => $review,
        ]);
    }

    private function renderError(string $message, ?int $testId): void
    {
        http_response_code(400);
        $backLink = $testId !== null
            ? 'index.php?controller=exam&action=index&id=' . $testId
            : 'index.php';

        echo '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8">'
            . '<title>Lỗi</title><link rel="stylesheet" href="css/style.css"></head><body>'
            . '<main class="page"><p class="error-message">' . htmlspecialchars($message) . '</p>'
            . '<p><a href="' . htmlspecialchars($backLink) . '">Quay lại làm bài</a></p></main></body></html>';
    }
}
