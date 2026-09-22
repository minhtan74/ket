<?php
// Model cho KET Reading Part 6 (Form Completion).
// Chỉ truy vấn MySQL (bảng ket_form_tests, ket_form_fields), không chứa HTML.
// Đây là 2 bảng RIÊNG cho Part 6, không đụng đến các bảng của Part 1, Part 4
// hay Open Cloze.

class FormQuestion
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Lấy thông tin một đề Form Completion (2 văn bản + tiêu đề form) theo id.
    public function getTestById(int $id): ?array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ket_form_tests WHERE id = ?'
        );
        $stmt->execute([$id]);

        $test = $stmt->fetch();

        return $test !== false ? $test : null;
    }

    // Lấy toàn bộ chỗ trống (51-55) của form, sắp xếp theo field_number.
    public function getFieldsByTestId(int $testId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ket_form_fields WHERE test_id = ? ORDER BY field_number'
        );
        $stmt->execute([$testId]);

        return $stmt->fetchAll();
    }

    // Lấy một field theo id. Trả về null nếu không tồn tại.
    public function getFieldById(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ket_form_fields WHERE id = ?');
        $stmt->execute([$id]);

        $field = $stmt->fetch();

        return $field !== false ? $field : null;
    }

    // Thêm một field mới, trả về id vừa tạo.
    public function createField(
        int $testId,
        int $fieldNumber,
        string $fieldLabel,
        ?string $fieldPrefix,
        string $correctAnswer,
        ?string $explanation
    ): int {
        $stmt = $this->pdo->prepare(
            'INSERT INTO ket_form_fields
                (test_id, field_number, field_label, field_prefix, correct_answer, explanation)
             VALUES (?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$testId, $fieldNumber, $fieldLabel, $fieldPrefix, $correctAnswer, $explanation]);

        return (int) $this->pdo->lastInsertId();
    }

    // Cập nhật một field đã có.
    public function updateField(
        int $id,
        int $fieldNumber,
        string $fieldLabel,
        ?string $fieldPrefix,
        string $correctAnswer,
        ?string $explanation
    ): void {
        $stmt = $this->pdo->prepare(
            'UPDATE ket_form_fields
             SET field_number = ?, field_label = ?, field_prefix = ?, correct_answer = ?, explanation = ?
             WHERE id = ?'
        );
        $stmt->execute([$fieldNumber, $fieldLabel, $fieldPrefix, $correctAnswer, $explanation, $id]);
    }

    // Xoá một field theo id.
    public function deleteField(int $id): void
    {
        $stmt = $this->pdo->prepare('DELETE FROM ket_form_fields WHERE id = ?');
        $stmt->execute([$id]);
    }

    // Cập nhật thông tin 2 văn bản + tiêu đề form của một đề.
    public function updateTest(
        int $id,
        string $title,
        string $text1Html,
        string $text1Date,
        string $text1Signature,
        string $text2Html,
        string $text2Signature,
        string $formTitle
    ): void {
        $stmt = $this->pdo->prepare(
            'UPDATE ket_form_tests
             SET title = ?, text1_html = ?, text1_date = ?, text1_signature = ?,
                 text2_html = ?, text2_signature = ?, form_title = ?
             WHERE id = ?'
        );
        $stmt->execute([$title, $text1Html, $text1Date, $text1Signature, $text2Html, $text2Signature, $formTitle, $id]);
    }
}
