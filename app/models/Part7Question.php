<?php
// Model cho KET Reading Part 7 (Complete the Letter(s)).
// Chỉ truy vấn MySQL (ket_part7_tests, ket_part7_letters, ket_part7_questions),
// không chứa HTML. Khác Part 5 (luôn đúng 2 thư): Part 7 cho phép 1 hoặc nhiều
// thư mỗi đề, nên thư được tách thành bảng riêng thay vì cột cố định.

class Part7Question
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Lấy thông tin một đề Part 7 theo id.
    public function getTestById(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ket_part7_tests WHERE id = ?');
        $stmt->execute([$id]);

        $test = $stmt->fetch();

        return $test !== false ? $test : null;
    }

    // Lấy toàn bộ thư của một đề, theo đúng thứ tự hiển thị.
    public function getLettersByTestId(int $testId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ket_part7_letters WHERE test_id = ? ORDER BY letter_order'
        );
        $stmt->execute([$testId]);

        return $stmt->fetchAll();
    }

    // Lấy toàn bộ câu hỏi (gồm cả câu EXAMPLE số 0) của một đề.
    public function getQuestionsByTestId(int $testId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ket_part7_questions WHERE test_id = ? ORDER BY question_number'
        );
        $stmt->execute([$testId]);

        return $stmt->fetchAll();
    }

    // ================= Dùng cho Admin (quản lý nhiều đề) =================

    // Lấy toàn bộ đề Part 7, kèm số thư và số câu hỏi để hiển thị danh sách.
    public function getAllTests(): array
    {
        $stmt = $this->pdo->query(
            'SELECT t.*,
                (SELECT COUNT(*) FROM ket_part7_letters l WHERE l.test_id = t.id) AS letter_count,
                (SELECT COUNT(*) FROM ket_part7_questions q WHERE q.test_id = t.id AND q.is_example = 0) AS question_count
             FROM ket_part7_tests t
             ORDER BY t.id'
        );

        return $stmt->fetchAll();
    }

    public function createTest(string $title, string $ketGroup, string $testLabel, string $instructions): int
    {
        $stmt = $this->pdo->prepare(
            'INSERT INTO ket_part7_tests (title, ket_group, test_label, instructions) VALUES (?, ?, ?, ?)'
        );
        $stmt->execute([$title, $ketGroup, $testLabel, $instructions]);

        return (int) $this->pdo->lastInsertId();
    }

    public function updateTest(int $id, string $title, string $ketGroup, string $testLabel, string $instructions): void
    {
        $stmt = $this->pdo->prepare(
            'UPDATE ket_part7_tests SET title = ?, ket_group = ?, test_label = ?, instructions = ? WHERE id = ?'
        );
        $stmt->execute([$title, $ketGroup, $testLabel, $instructions, $id]);
    }

    public function deleteTest(int $id): void
    {
        $stmt = $this->pdo->prepare('DELETE FROM ket_part7_tests WHERE id = ?');
        $stmt->execute([$id]);
    }

    public function getLetterById(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ket_part7_letters WHERE id = ?');
        $stmt->execute([$id]);

        $letter = $stmt->fetch();

        return $letter !== false ? $letter : null;
    }

    public function createLetter(
        int $testId,
        int $letterOrder,
        ?string $dateline,
        string $salutation,
        string $bodyHtml,
        string $closing,
        string $signature
    ): int {
        $stmt = $this->pdo->prepare(
            'INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$testId, $letterOrder, $dateline, $salutation, $bodyHtml, $closing, $signature]);

        return (int) $this->pdo->lastInsertId();
    }

    public function updateLetter(
        int $id,
        int $letterOrder,
        ?string $dateline,
        string $salutation,
        string $bodyHtml,
        string $closing,
        string $signature
    ): void {
        $stmt = $this->pdo->prepare(
            'UPDATE ket_part7_letters
             SET letter_order = ?, dateline = ?, salutation = ?, body_html = ?, closing = ?, signature = ?
             WHERE id = ?'
        );
        $stmt->execute([$letterOrder, $dateline, $salutation, $bodyHtml, $closing, $signature, $id]);
    }

    public function deleteLetter(int $id): void
    {
        $stmt = $this->pdo->prepare('DELETE FROM ket_part7_letters WHERE id = ?');
        $stmt->execute([$id]);
    }

    public function getQuestionById(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ket_part7_questions WHERE id = ?');
        $stmt->execute([$id]);

        $question = $stmt->fetch();

        return $question !== false ? $question : null;
    }

    public function createQuestion(int $testId, int $questionNumber, string $correctAnswer, int $isExample, ?string $note = null): int
    {
        $stmt = $this->pdo->prepare(
            'INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note)
             VALUES (?, ?, ?, ?, ?)'
        );
        $stmt->execute([$testId, $questionNumber, $correctAnswer, $isExample, $note]);

        return (int) $this->pdo->lastInsertId();
    }

    public function updateQuestion(int $id, int $questionNumber, string $correctAnswer, int $isExample, ?string $note = null): void
    {
        $stmt = $this->pdo->prepare(
            'UPDATE ket_part7_questions SET question_number = ?, correct_answer = ?, is_example = ?, note = ? WHERE id = ?'
        );
        $stmt->execute([$questionNumber, $correctAnswer, $isExample, $note, $id]);
    }

    public function deleteQuestion(int $id): void
    {
        $stmt = $this->pdo->prepare('DELETE FROM ket_part7_questions WHERE id = ?');
        $stmt->execute([$id]);
    }
}
