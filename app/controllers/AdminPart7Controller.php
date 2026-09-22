<?php
// AdminPart7Controller: trang quản trị nội bộ cho KET Reading Part 7
// (Complete the Letter(s)) — không cần đăng nhập.
//
// Khác các Admin trước (luôn quản lý đúng 1 đề cố định id=1): Part 7 hỗ trợ
// NHIỀU đề (chọn qua dropdown ở trang làm bài), nên Admin ở đây có 2 cấp:
//   1. index()  - danh sách tất cả đề, có thể thêm đề mới / xoá đề.
//   2. manage() - quản lý thư + câu hỏi của MỘT đề cụ thể (theo test_id).
//
// LƯU Ý: giống các Admin khác, trang này KHÔNG có xác thực, chỉ dùng khi
// chạy local qua XAMPP. Không đưa lên server công khai.

class AdminPart7Controller extends Controller
{
    private Part7Question $part7Model;

    public function __construct(private PDO $pdo)
    {
        $this->part7Model = new Part7Question($pdo);
    }

    // ================= Danh sách đề =================

    public function index(): void
    {
        $tests = $this->part7Model->getAllTests();

        $grouped = [];
        foreach ($tests as $test) {
            $groupLabel = $test['ket_group'] !== '' ? $test['ket_group'] : 'Khác';
            $grouped[$groupLabel][] = $test;
        }

        $this->render('admin_part7/index', [
            'grouped'   => $grouped,
            'testCount' => count($tests),
            'message'   => $_GET['msg'] ?? null,
        ]);
    }

    // Thêm đề mới (không có ?id=) hoặc sửa tiêu đề đề đã có (có ?id=).
    public function testForm(): void
    {
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $title = trim((string) ($_POST['title'] ?? ''));
            $ketGroup = trim((string) ($_POST['ket_group'] ?? ''));
            $testLabel = trim((string) ($_POST['test_label'] ?? ''));
            $instructions = trim((string) ($_POST['instructions'] ?? ''));

            if ($title === '') {
                $this->render('admin_part7/test_form', [
                    'test'   => ['id' => $id, 'title' => $title, 'ket_group' => $ketGroup, 'test_label' => $testLabel, 'instructions' => $instructions],
                    'errors' => ['Tiêu đề không được để trống.'],
                ]);
                return;
            }

            if ($id > 0) {
                $this->part7Model->updateTest($id, $title, $ketGroup, $testLabel, $instructions);
                $this->redirect('index.php?controller=admin_part7&action=manage&test_id=' . $id . '&msg=saved');
            } else {
                $newId = $this->part7Model->createTest($title, $ketGroup, $testLabel, $instructions);
                $this->redirect('index.php?controller=admin_part7&action=manage&test_id=' . $newId . '&msg=created');
            }
            return;
        }

        $test = $id > 0 ? $this->part7Model->getTestById($id) : null;

        if ($id > 0 && $test === null) {
            $this->redirect('index.php?controller=admin_part7&action=index');
            return;
        }

        $this->render('admin_part7/test_form', ['test' => $test]);
    }

    public function testDelete(): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;

            if ($id > 0) {
                $this->part7Model->deleteTest($id); // FK ON DELETE CASCADE xoá luôn thư + câu hỏi
            }
        }

        $this->redirect('index.php?controller=admin_part7&action=index&msg=deleted');
    }

    // ================= Quản lý 1 đề: thư + câu hỏi =================

    public function manage(): void
    {
        $testId = isset($_GET['test_id']) ? (int) $_GET['test_id'] : 0;
        $test = $testId > 0 ? $this->part7Model->getTestById($testId) : null;

        if ($test === null) {
            $this->redirect('index.php?controller=admin_part7&action=index');
            return;
        }

        $this->render('admin_part7/manage', [
            'test'     => $test,
            'letters'  => $this->part7Model->getLettersByTestId($testId),
            'questions' => $this->part7Model->getQuestionsByTestId($testId),
            'message'  => $_GET['msg'] ?? null,
        ]);
    }

    // ----- Thư -----

    public function letterForm(): void
    {
        $testId = isset($_GET['test_id']) ? (int) $_GET['test_id'] : 0;
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        $test = $testId > 0 ? $this->part7Model->getTestById($testId) : null;

        if ($test === null) {
            $this->redirect('index.php?controller=admin_part7&action=index');
            return;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->saveLetter($testId, $id);
            return;
        }

        $letter = $id > 0 ? $this->part7Model->getLetterById($id) : null;

        $this->render('admin_part7/letter_form', ['test' => $test, 'letter' => $letter]);
    }

    private function saveLetter(int $testId, int $id): void
    {
        $letterOrder = isset($_POST['letter_order']) ? (int) $_POST['letter_order'] : 0;
        $dateline = trim((string) ($_POST['dateline'] ?? ''));
        $salutation = trim((string) ($_POST['salutation'] ?? ''));
        $bodyHtml = trim((string) ($_POST['body_html'] ?? ''));
        $closing = trim((string) ($_POST['closing'] ?? ''));
        $signature = trim((string) ($_POST['signature'] ?? ''));

        $errors = [];

        if ($letterOrder <= 0) {
            $errors[] = 'Thứ tự thư phải là số dương (1, 2...).';
        }
        if ($salutation === '') {
            $errors[] = 'Lời chào đầu thư không được để trống.';
        }
        if ($bodyHtml === '') {
            $errors[] = 'Nội dung thư không được để trống.';
        }
        if ($closing === '') {
            $errors[] = 'Lời chào cuối thư không được để trống.';
        }
        if ($signature === '') {
            $errors[] = 'Chữ ký không được để trống.';
        }

        if (!empty($errors)) {
            $this->render('admin_part7/letter_form', [
                'test' => $this->part7Model->getTestById($testId),
                'letter' => [
                    'id' => $id, 'letter_order' => $letterOrder, 'dateline' => $dateline,
                    'salutation' => $salutation, 'body_html' => $bodyHtml,
                    'closing' => $closing, 'signature' => $signature,
                ],
                'errors' => $errors,
            ]);
            return;
        }

        $datelineOrNull = $dateline !== '' ? $dateline : null;

        if ($id > 0) {
            $this->part7Model->updateLetter($id, $letterOrder, $datelineOrNull, $salutation, $bodyHtml, $closing, $signature);
        } else {
            $this->part7Model->createLetter($testId, $letterOrder, $datelineOrNull, $salutation, $bodyHtml, $closing, $signature);
        }

        $this->redirect('index.php?controller=admin_part7&action=manage&test_id=' . $testId . '&msg=saved');
    }

    public function letterDelete(): void
    {
        $testId = isset($_POST['test_id']) ? (int) $_POST['test_id'] : 0;

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;

            if ($id > 0) {
                $this->part7Model->deleteLetter($id);
            }
        }

        $this->redirect('index.php?controller=admin_part7&action=manage&test_id=' . $testId . '&msg=deleted');
    }

    // ----- Câu hỏi -----

    public function questionForm(): void
    {
        $testId = isset($_GET['test_id']) ? (int) $_GET['test_id'] : 0;
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        $test = $testId > 0 ? $this->part7Model->getTestById($testId) : null;

        if ($test === null) {
            $this->redirect('index.php?controller=admin_part7&action=index');
            return;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->saveQuestion($testId, $id);
            return;
        }

        $question = $id > 0 ? $this->part7Model->getQuestionById($id) : null;

        $this->render('admin_part7/question_form', ['test' => $test, 'question' => $question]);
    }

    private function saveQuestion(int $testId, int $id): void
    {
        $questionNumber = isset($_POST['question_number']) ? (int) $_POST['question_number'] : -1;
        $correctAnswer = trim((string) ($_POST['correct_answer'] ?? ''));
        $note = trim((string) ($_POST['note'] ?? ''));
        $noteOrNull = $note !== '' ? $note : null;

        $errors = [];

        if ($questionNumber < 0) {
            $errors[] = 'Số thứ tự câu hỏi không hợp lệ (0 = example, hoặc số dương).';
        }
        if ($correctAnswer === '') {
            $errors[] = 'Đáp án đúng không được để trống (nhiều đáp án cách nhau bởi "|").';
        }

        if (!empty($errors)) {
            $this->render('admin_part7/question_form', [
                'test' => $this->part7Model->getTestById($testId),
                'question' => ['id' => $id, 'question_number' => $questionNumber, 'correct_answer' => $correctAnswer, 'note' => $note],
                'errors' => $errors,
            ]);
            return;
        }

        // Câu số 0 luôn là câu EXAMPLE (theo đúng định dạng đề thi KET), giống Part 4/5.
        $isExample = $questionNumber === 0 ? 1 : 0;

        if ($id > 0) {
            $this->part7Model->updateQuestion($id, $questionNumber, $correctAnswer, $isExample, $noteOrNull);
        } else {
            $this->part7Model->createQuestion($testId, $questionNumber, $correctAnswer, $isExample, $noteOrNull);
        }

        $this->redirect('index.php?controller=admin_part7&action=manage&test_id=' . $testId . '&msg=saved');
    }

    public function questionDelete(): void
    {
        $testId = isset($_POST['test_id']) ? (int) $_POST['test_id'] : 0;

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;

            if ($id > 0) {
                $this->part7Model->deleteQuestion($id);
            }
        }

        $this->redirect('index.php?controller=admin_part7&action=manage&test_id=' . $testId . '&msg=deleted');
    }
}
