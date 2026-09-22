<?php
// AdminFormCompletionController: trang quản trị nội bộ cho KET Reading
// Part 6 (2 văn bản đọc hiểu + form 51-55) — không cần đăng nhập.
//
// LƯU Ý: giống AdminController/AdminPart4Controller, trang này KHÔNG có
// xác thực, chỉ dùng khi chạy local qua XAMPP để chỉnh nội dung đề thi.
// Không đưa lên server công khai. Hoàn toàn tách biệt khỏi các Part khác.

class AdminFormCompletionController extends Controller
{
    private const DEFAULT_TEST_ID = 1;

    private FormQuestion $formModel;

    public function __construct(private PDO $pdo)
    {
        $this->formModel = new FormQuestion($pdo);
    }

    // Trang tổng quan: 2 văn bản + tiêu đề form + danh sách 5 field (51-55).
    public function index(): void
    {
        $test = $this->formModel->getTestById(self::DEFAULT_TEST_ID);

        if ($test === null) {
            echo 'Không tìm thấy đề thi.';
            return;
        }

        $this->render('admin_formcompletion/index', [
            'test'    => $test,
            'fields'  => $this->formModel->getFieldsByTestId(self::DEFAULT_TEST_ID),
            'message' => $_GET['msg'] ?? null,
        ]);
    }

    // Form thêm field (không có ?id=) hoặc sửa field (có ?id=).
    public function fieldForm(): void
    {
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->saveField($id);
            return;
        }

        $field = $id > 0 ? $this->formModel->getFieldById($id) : null;

        $this->render('admin_formcompletion/field_form', ['field' => $field]);
    }

    private function saveField(int $id): void
    {
        $fieldNumber = isset($_POST['field_number']) ? (int) $_POST['field_number'] : 0;
        $fieldLabel = trim((string) ($_POST['field_label'] ?? ''));
        $fieldPrefix = trim((string) ($_POST['field_prefix'] ?? ''));
        $correctAnswer = trim((string) ($_POST['correct_answer'] ?? ''));
        $explanation = trim((string) ($_POST['explanation'] ?? ''));

        $errors = [];

        if ($fieldNumber <= 0) {
            $errors[] = 'Số thứ tự field không hợp lệ.';
        }
        if ($fieldLabel === '') {
            $errors[] = 'Label không được để trống.';
        }
        if ($correctAnswer === '') {
            $errors[] = 'Đáp án đúng không được để trống (nhiều đáp án cách nhau bởi "|").';
        }

        if (!empty($errors)) {
            $this->render('admin_formcompletion/field_form', [
                'field' => [
                    'id'             => $id,
                    'field_number'   => $fieldNumber,
                    'field_label'    => $fieldLabel,
                    'field_prefix'   => $fieldPrefix,
                    'correct_answer' => $correctAnswer,
                    'explanation'    => $explanation,
                ],
                'errors' => $errors,
            ]);
            return;
        }

        $prefixOrNull = $fieldPrefix !== '' ? $fieldPrefix : null;

        if ($id > 0) {
            $this->formModel->updateField($id, $fieldNumber, $fieldLabel, $prefixOrNull, $correctAnswer, $explanation);
        } else {
            $this->formModel->createField(self::DEFAULT_TEST_ID, $fieldNumber, $fieldLabel, $prefixOrNull, $correctAnswer, $explanation);
        }

        $this->redirect('index.php?controller=admin_formcompletion&action=index&msg=saved');
    }

    // Xoá một field (chỉ chấp nhận POST).
    public function fieldDelete(): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;

            if ($id > 0) {
                $this->formModel->deleteField($id);
            }
        }

        $this->redirect('index.php?controller=admin_formcompletion&action=index&msg=deleted');
    }

    // Sửa 2 văn bản (thư + note) và tiêu đề form.
    public function testForm(): void
    {
        $test = $this->formModel->getTestById(self::DEFAULT_TEST_ID);

        if ($test === null) {
            $this->redirect('index.php?controller=admin_formcompletion&action=index');
            return;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $title = trim((string) ($_POST['title'] ?? ''));
            $text1Html = trim((string) ($_POST['text1_html'] ?? ''));
            $text1Date = trim((string) ($_POST['text1_date'] ?? ''));
            $text1Signature = trim((string) ($_POST['text1_signature'] ?? ''));
            $text2Html = trim((string) ($_POST['text2_html'] ?? ''));
            $text2Signature = trim((string) ($_POST['text2_signature'] ?? ''));
            $formTitle = trim((string) ($_POST['form_title'] ?? ''));

            $errors = [];

            if ($title === '') {
                $errors[] = 'Tiêu đề đề thi không được để trống.';
            }
            if ($text1Html === '') {
                $errors[] = 'Nội dung thư (văn bản 1) không được để trống.';
            }
            if ($text1Date === '') {
                $errors[] = 'Ngày của thư không được để trống.';
            }
            if ($text1Signature === '') {
                $errors[] = 'Chữ ký thư không được để trống.';
            }
            if ($text2Html === '') {
                $errors[] = 'Nội dung note (văn bản 2) không được để trống.';
            }
            if ($text2Signature === '') {
                $errors[] = 'Chữ ký note không được để trống.';
            }
            if ($formTitle === '') {
                $errors[] = 'Tiêu đề form không được để trống.';
            }

            if (!empty($errors)) {
                $this->render('admin_formcompletion/test_form', [
                    'test' => [
                        'id'              => self::DEFAULT_TEST_ID,
                        'title'           => $title,
                        'text1_html'      => $text1Html,
                        'text1_date'      => $text1Date,
                        'text1_signature' => $text1Signature,
                        'text2_html'      => $text2Html,
                        'text2_signature' => $text2Signature,
                        'form_title'      => $formTitle,
                    ],
                    'errors' => $errors,
                ]);
                return;
            }

            $this->formModel->updateTest(
                self::DEFAULT_TEST_ID,
                $title,
                $text1Html,
                $text1Date,
                $text1Signature,
                $text2Html,
                $text2Signature,
                $formTitle
            );
            $this->redirect('index.php?controller=admin_formcompletion&action=index&msg=saved');
            return;
        }

        $this->render('admin_formcompletion/test_form', ['test' => $test]);
    }
}
