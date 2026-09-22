<?php
// Model cho KET Reading Part 4 (Multiple Choice Cloze).
// Chỉ truy vấn MySQL (bảng ket_cloze_tests, ket_cloze_questions), không chứa HTML.
// Đây là 2 bảng RIÊNG cho Part 4, không đụng đến ket_tests/ket_questions/ket_options của Part 1.

class ClozeQuestion
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Lấy thông tin một đề Cloze (tiêu đề + đoạn văn) theo id.
    public function getTestById(int $id): ?array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ket_cloze_tests WHERE id = ?'
        );
        $stmt->execute([$id]);

        $test = $stmt->fetch();

        return $test !== false ? $test : null;
    }

    // Lấy toàn bộ câu hỏi (gồm cả câu EXAMPLE số 0) của một đề, sắp xếp theo question_number.
    public function getQuestionsByTestId(int $testId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ket_cloze_questions WHERE test_id = ? ORDER BY question_number'
        );
        $stmt->execute([$testId]);

        return $stmt->fetchAll();
    }

    // Lấy một câu hỏi (chỗ trống) theo id. Trả về null nếu không tồn tại.
    public function getQuestionById(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ket_cloze_questions WHERE id = ?');
        $stmt->execute([$id]);

        $question = $stmt->fetch();

        return $question !== false ? $question : null;
    }

    // Thêm một chỗ trống mới, trả về id vừa tạo.
    public function createQuestion(
        int $testId,
        int $questionNumber,
        string $optionA,
        string $optionB,
        string $optionC,
        string $correctAnswer,
        int $isExample
    ): int {
        $stmt = $this->pdo->prepare(
            'INSERT INTO ket_cloze_questions
                (test_id, question_number, option_a, option_b, option_c, correct_answer, is_example)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$testId, $questionNumber, $optionA, $optionB, $optionC, $correctAnswer, $isExample]);

        return (int) $this->pdo->lastInsertId();
    }

    // Cập nhật một chỗ trống đã có.
    public function updateQuestion(
        int $id,
        int $questionNumber,
        string $optionA,
        string $optionB,
        string $optionC,
        string $correctAnswer,
        int $isExample
    ): void {
        $stmt = $this->pdo->prepare(
            'UPDATE ket_cloze_questions
             SET question_number = ?, option_a = ?, option_b = ?, option_c = ?, correct_answer = ?, is_example = ?
             WHERE id = ?'
        );
        $stmt->execute([$questionNumber, $optionA, $optionB, $optionC, $correctAnswer, $isExample, $id]);
    }

    // Xoá một chỗ trống theo id.
    public function deleteQuestion(int $id): void
    {
        $stmt = $this->pdo->prepare('DELETE FROM ket_cloze_questions WHERE id = ?');
        $stmt->execute([$id]);
    }

    // Cập nhật tiêu đề và đoạn văn (passage_html) của một đề Cloze.
    public function updateTest(int $id, string $title, string $passageHtml): void
    {
        $stmt = $this->pdo->prepare(
            'UPDATE ket_cloze_tests SET title = ?, passage_html = ? WHERE id = ?'
        );
        $stmt->execute([$title, $passageHtml, $id]);
    }
}
