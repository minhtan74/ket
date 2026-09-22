<?php
// Model: chỉ truy vấn MySQL cho bảng ket_options, không chứa HTML.

class Option
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Lấy toàn bộ lựa chọn (A-H) của một đề thi, sắp xếp theo option_letter.
    public function getOptionsByTestId(int $testId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ket_options WHERE test_id = ? ORDER BY option_letter'
        );
        $stmt->execute([$testId]);

        return $stmt->fetchAll();
    }

    // Lấy một đáp án theo id. Trả về null nếu không tồn tại.
    public function getOptionById(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM ket_options WHERE id = ?');
        $stmt->execute([$id]);

        $option = $stmt->fetch();

        return $option !== false ? $option : null;
    }

    // Cập nhật nội dung của một đáp án (A-H).
    public function updateOptionText(int $id, string $text): void
    {
        $stmt = $this->pdo->prepare('UPDATE ket_options SET option_text = ? WHERE id = ?');
        $stmt->execute([$text, $id]);
    }
}
