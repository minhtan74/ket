<?php
// AdminPart4Controller: trang quản trị nội bộ cho KET Reading Part 4
// (đoạn văn Cloze + các chỗ trống 0/28-35) — không cần đăng nhập.
//
// LƯU Ý: giống AdminController của Part 1, trang này KHÔNG có xác thực,
// chỉ dùng khi chạy local qua XAMPP để chỉnh nội dung đề thi. Không đưa
// lên server công khai. Hoàn toàn tách biệt khỏi AdminController/Part 1.

class AdminPart4Controller extends Controller
{
    private const VALID_LETTERS = ['A', 'B', 'C'];
    private const DEFAULT_TEST_ID = 1;

    private ClozeQuestion $clozeModel;

    public function __construct(private PDO $pdo)
    {
        $this->clozeModel = new ClozeQuestion($pdo);
    }

    // Trang tổng quan: đoạn văn hiện tại + danh sách các chỗ trống (0, 28-35).
    public function index(): void
    {
        $test = $this->clozeModel->getTestById(self::DEFAULT_TEST_ID);

        if ($test === null) {
            echo 'Không tìm thấy đề thi.';
            return;
        }

        $this->render('admin_part4/index', [
            'test'      => $test,
            'questions' => $this->clozeModel->getQuestionsByTestId(self::DEFAULT_TEST_ID),
            'message'   => $_GET['msg'] ?? null,
        ]);
    }

    // Form thêm chỗ trống (không có ?id=) hoặc sửa chỗ trống (có ?id=).
    public function questionForm(): void
    {
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->saveQuestion($id);
            return;
        }

        $question = $id > 0 ? $this->clozeModel->getQuestionById($id) : null;

        $this->render('admin_part4/question_form', ['question' => $question]);
    }

    private function saveQuestion(int $id): void
    {
        $questionNumber = isset($_POST['question_number']) ? (int) $_POST['question_number'] : -1;
        $optionA = trim((string) ($_POST['option_a'] ?? ''));
        $optionB = trim((string) ($_POST['option_b'] ?? ''));
        $optionC = trim((string) ($_POST['option_c'] ?? ''));
        $correctAnswer = strtoupper(trim((string) ($_POST['correct_answer'] ?? '')));

        $errors = [];

        if ($questionNumber < 0) {
            $errors[] = 'Số thứ tự câu hỏi không hợp lệ (0 = example, hoặc số dương).';
        }
        if ($optionA === '' || $optionB === '' || $optionC === '') {
            $errors[] = 'Cả 3 lựa chọn A, B, C đều không được để trống.';
        }
        if (!in_array($correctAnswer, self::VALID_LETTERS, true)) {
            $errors[] = 'Đáp án đúng phải là A, B hoặc C.';
        }

        if (!empty($errors)) {
            $this->render('admin_part4/question_form', [
                'question' => [
                    'id'              => $id,
                    'question_number' => $questionNumber,
                    'option_a'        => $optionA,
                    'option_b'        => $optionB,
                    'option_c'        => $optionC,
                    'correct_answer'  => $correctAnswer,
                ],
                'errors' => $errors,
            ]);
            return;
        }

        // Câu số 0 luôn là câu EXAMPLE (theo đúng định dạng đề thi KET Part 4).
        $isExample = $questionNumber === 0 ? 1 : 0;

        if ($id > 0) {
            $this->clozeModel->updateQuestion($id, $questionNumber, $optionA, $optionB, $optionC, $correctAnswer, $isExample);
        } else {
            $this->clozeModel->createQuestion(self::DEFAULT_TEST_ID, $questionNumber, $optionA, $optionB, $optionC, $correctAnswer, $isExample);
        }

        $this->redirect('index.php?controller=admin_part4&action=index&msg=saved');
    }

    // Xoá một chỗ trống (chỉ chấp nhận POST).
    public function questionDelete(): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;

            if ($id > 0) {
                $this->clozeModel->deleteQuestion($id);
            }
        }

        $this->redirect('index.php?controller=admin_part4&action=index&msg=deleted');
    }

    // Sửa tiêu đề và đoạn văn (passage_html). Bắt buộc đoạn văn mới phải còn đủ
    // placeholder {{n}} cho MỌI câu hỏi đang có, để trang làm bài không bị vỡ.
    public function testForm(): void
    {
        $test = $this->clozeModel->getTestById(self::DEFAULT_TEST_ID);

        if ($test === null) {
            $this->redirect('index.php?controller=admin_part4&action=index');
            return;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $title = trim((string) ($_POST['title'] ?? ''));
            $passageHtml = trim((string) ($_POST['passage_html'] ?? ''));
            $errors = [];

            if ($title === '') {
                $errors[] = 'Tiêu đề không được để trống.';
            }
            if ($passageHtml === '') {
                $errors[] = 'Đoạn văn không được để trống.';
            }

            if (empty($errors)) {
                $questions = $this->clozeModel->getQuestionsByTestId(self::DEFAULT_TEST_ID);
                $missing = [];

                foreach ($questions as $question) {
                    $placeholder = '{{' . (int) $question['question_number'] . '}}';
                    if (strpos($passageHtml, $placeholder) === false) {
                        $missing[] = $placeholder;
                    }
                }

                if (!empty($missing)) {
                    $errors[] = 'Đoạn văn đang thiếu placeholder: ' . implode(', ', $missing)
                        . '. Mỗi câu hỏi hiện có phải có đúng 1 placeholder {{n}} tương ứng trong đoạn văn.';
                }
            }

            if (!empty($errors)) {
                $this->render('admin_part4/test_form', [
                    'test'   => ['id' => self::DEFAULT_TEST_ID, 'title' => $title, 'passage_html' => $passageHtml],
                    'errors' => $errors,
                ]);
                return;
            }

            $this->clozeModel->updateTest(self::DEFAULT_TEST_ID, $title, $passageHtml);
            $this->redirect('index.php?controller=admin_part4&action=index&msg=saved');
            return;
        }

        $this->render('admin_part4/test_form', ['test' => $test]);
    }
}
