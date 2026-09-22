<?php
// Model cho KET Reading/Writing Part 5 (Open Cloze - Letter Completion).
// Chỉ truy vấn MySQL (bảng ket_opencloze_tests, ket_opencloze_questions),
// không chứa HTML. Đây là 2 bảng RIÊNG cho Open Cloze, không đụng đến các
// bảng của Part 1 (ket_tests/ket_questions/ket_options) hay Part 4
// (ket_cloze_tests/ket_cloze_questions).

class OpenClozeQuestion
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Lấy thông tin một đề Open Cloze (2 lá thư + chữ ký) theo id.
    public function getTestById(int $id): ?array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ket_opencloze_tests WHERE id = ?'
        );
        $stmt->execute([$id]);

        $test = $stmt->fetch();

        return $test !== false ? $test : null;
    }

    // Lấy toàn bộ câu hỏi (gồm cả câu EXAMPLE số 0) của một đề,
    // sắp xếp theo question_number.
    public function getQuestionsByTestId(int $testId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ket_opencloze_questions WHERE test_id = ? ORDER BY question_number'
        );
        $stmt->execute([$testId]);

        return $stmt->fetchAll();
    }
}
