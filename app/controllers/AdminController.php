<?php
// AdminController: trang quản trị nội bộ để thêm/sửa/xoá câu hỏi, sửa nội
// dung đáp án A-H, và đổi tiêu đề/ảnh đề thi — không cần đăng nhập.
//
// LƯU Ý: trang này KHÔNG có xác thực (theo yêu cầu), chỉ dùng khi chạy
// local qua XAMPP để chỉnh nội dung đề thi. Không đưa lên server công khai.

class AdminController extends Controller
{
    private const VALID_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    private const DEFAULT_TEST_ID = 1;

    private Test $testModel;
    private Question $questionModel;
    private Option $optionModel;

    public function __construct(private PDO $pdo)
    {
        $this->testModel = new Test($pdo);
        $this->questionModel = new Question($pdo);
        $this->optionModel = new Option($pdo);
    }

    // Trang tổng quan: thông tin đề thi + danh sách câu hỏi + danh sách đáp án.
    public function index(): void
    {
        $test = $this->testModel->getTestById(self::DEFAULT_TEST_ID);

        if ($test === null) {
            echo 'Không tìm thấy đề thi.';
            return;
        }

        $this->render('admin/index', [
            'test'      => $test,
            'questions' => $this->questionModel->getQuestionsByTestId(self::DEFAULT_TEST_ID),
            'options'   => $this->optionModel->getOptionsByTestId(self::DEFAULT_TEST_ID),
            'message'   => $_GET['msg'] ?? null,
        ]);
    }

    // Form thêm câu hỏi (không có ?id=) hoặc sửa câu hỏi (có ?id=).
    public function questionForm(): void
    {
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->saveQuestion($id);
            return;
        }

        $question = $id > 0 ? $this->questionModel->getQuestionById($id) : null;

        $this->render('admin/question_form', ['question' => $question]);
    }

    private function saveQuestion(int $id): void
    {
        $questionNumber = isset($_POST['question_number']) ? (int) $_POST['question_number'] : 0;
        $questionText = trim((string) ($_POST['question_text'] ?? ''));
        $correctAnswer = strtoupper(trim((string) ($_POST['correct_answer'] ?? '')));
        $explanation = trim((string) ($_POST['explanation'] ?? ''));

        $errors = [];

        if ($questionNumber <= 0) {
            $errors[] = 'Số thứ tự câu hỏi không hợp lệ.';
        }
        if ($questionText === '') {
            $errors[] = 'Nội dung câu hỏi không được để trống.';
        }
        if (!in_array($correctAnswer, self::VALID_LETTERS, true)) {
            $errors[] = 'Đáp án đúng phải là một chữ cái từ A đến H.';
        }

        if (!empty($errors)) {
            $this->render('admin/question_form', [
                'question' => [
                    'id'              => $id,
                    'question_number' => $questionNumber,
                    'question_text'   => $questionText,
                    'correct_answer'  => $correctAnswer,
                    'explanation'     => $explanation,
                ],
                'errors' => $errors,
            ]);
            return;
        }

        if ($id > 0) {
            $this->questionModel->updateQuestion($id, $questionNumber, $questionText, $correctAnswer, $explanation);
        } else {
            $this->questionModel->createQuestion(self::DEFAULT_TEST_ID, $questionNumber, $questionText, $correctAnswer, $explanation);
        }

        $this->redirect('index.php?controller=admin&action=index&msg=saved');
    }

    // Xoá câu hỏi (chỉ chấp nhận POST).
    public function questionDelete(): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;

            if ($id > 0) {
                $this->questionModel->deleteQuestion($id);
            }
        }

        $this->redirect('index.php?controller=admin&action=index&msg=deleted');
    }

    // Sửa nội dung một đáp án (A-H). Không thêm/xoá vì Matching luôn cần đủ 8 đáp án.
    public function optionForm(): void
    {
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        $option = $id > 0 ? $this->optionModel->getOptionById($id) : null;

        if ($option === null) {
            $this->redirect('index.php?controller=admin&action=index');
            return;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $text = trim((string) ($_POST['option_text'] ?? ''));

            if ($text === '') {
                $this->render('admin/option_form', [
                    'option' => $option,
                    'errors' => ['Nội dung đáp án không được để trống.'],
                ]);
                return;
            }

            $this->optionModel->updateOptionText($id, $text);
            $this->redirect('index.php?controller=admin&action=index&msg=saved');
            return;
        }

        $this->render('admin/option_form', ['option' => $option]);
    }

    // Sửa tiêu đề đề thi và/hoặc tải ảnh mới lên.
    public function testForm(): void
    {
        $test = $this->testModel->getTestById(self::DEFAULT_TEST_ID);

        if ($test === null) {
            $this->redirect('index.php?controller=admin&action=index');
            return;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $title = trim((string) ($_POST['title'] ?? ''));
            $image = $test['image'];
            $errors = [];

            if ($title === '') {
                $errors[] = 'Tiêu đề không được để trống.';
            }

            if (!empty($_FILES['image']['name'])) {
                $upload = $this->handleImageUpload($_FILES['image']);

                if ($upload['success']) {
                    $image = $upload['path'];
                } else {
                    $errors[] = $upload['error'];
                }
            }

            if (!empty($errors)) {
                $this->render('admin/test_form', [
                    'test'   => ['id' => self::DEFAULT_TEST_ID, 'title' => $title, 'image' => $image],
                    'errors' => $errors,
                ]);
                return;
            }

            $this->testModel->updateTest(self::DEFAULT_TEST_ID, $title, $image);
            $this->redirect('index.php?controller=admin&action=index&msg=saved');
            return;
        }

        $this->render('admin/test_form', ['test' => $test]);
    }

    // Xử lý upload ảnh: chỉ nhận jpg/jpeg/png/gif, tối đa 5MB, kiểm tra thật sự là ảnh.
    private function handleImageUpload(array $file): array
    {
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        $maxSize = 5 * 1024 * 1024;

        if ($file['error'] !== UPLOAD_ERR_OK) {
            return ['success' => false, 'error' => 'Tải ảnh lên thất bại.'];
        }

        if ($file['size'] > $maxSize) {
            return ['success' => false, 'error' => 'Ảnh quá lớn (tối đa 5MB).'];
        }

        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if (!in_array($extension, $allowedExtensions, true)) {
            return ['success' => false, 'error' => 'Chỉ chấp nhận ảnh JPG, PNG hoặc GIF.'];
        }

        if (@getimagesize($file['tmp_name']) === false) {
            return ['success' => false, 'error' => 'File tải lên không phải là ảnh hợp lệ.'];
        }

        $fileName = 'test1_' . time() . '.' . $extension;
        $destination = __DIR__ . '/../../public/images/part1/' . $fileName;

        if (!move_uploaded_file($file['tmp_name'], $destination)) {
            return ['success' => false, 'error' => 'Không thể lưu ảnh vào server.'];
        }

        return ['success' => true, 'path' => 'images/part1/' . $fileName];
    }
}
