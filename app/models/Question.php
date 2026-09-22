<?php
// Model: chỉ truy vấn MySQL cho bảng ket_questions, không chứa HTML.

class Question
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Lấy toàn bộ câu hỏi của một đề thi, sắp xếp theo question_number.
    public function getQuestionsByTestId(int $testId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ket_questions WHERE test_id = ? ORDER BY question_number'
        );
        $stmt->execute([$testId]);

        return $stmt->fetchAll();
    }

    // Lấy một câu hỏi theo id. Trả về null nếu không tồn tại.
    public function getQuestionById(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ket_questions WHERE id = ?');
        $stmt->execute([$id]);

        $question = $stmt->fetch();

        return $question !== false ? $question : null;
    }

    // Thêm câu hỏi mới, trả về id vừa tạo.
    public function createQuestion(
        int $testId,
        int $questionNumber,
        string $questionText,
        string $correctAnswer,
        ?string $explanation
    ): int {
        $stmt = $this->pdo->prepare(
            'INSERT INTO ket_questions (test_id, question_number, question_text, correct_answer, explanation)
             VALUES (?, ?, ?, ?, ?)'
        );
        $stmt->execute([$testId, $questionNumber, $questionText, $correctAnswer, $explanation]);

        return (int) $this->pdo->lastInsertId();
    }

    // Cập nhật một câu hỏi đã có.
    public function updateQuestion(
        int $id,
        int $questionNumber,
        string $questionText,
        string $correctAnswer,
        ?string $explanation
    ): void {
        $stmt = $this->pdo->prepare(
            'UPDATE ket_questions
             SET question_number = ?, question_text = ?, correct_answer = ?, explanation = ?
             WHERE id = ?'
        );
        $stmt->execute([$questionNumber, $questionText, $correctAnswer, $explanation, $id]);
    }

    // Xoá một câu hỏi theo id.
    public function deleteQuestion(int $id): void
    {
        $stmt = $this->pdo->prepare('DELETE FROM ket_questions WHERE id = ?');
        $stmt->execute([$id]);
    }
}
