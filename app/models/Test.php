<?php
// Model: chỉ truy vấn MySQL cho bảng ket_tests, không chứa HTML.

class Test
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Lấy thông tin một đề thi theo id. Trả về null nếu không tồn tại.
    public function getTestById(int $id): ?array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM ket_tests WHERE id = ?'
        );
        $stmt->execute([$id]);

        $test = $stmt->fetch();

        return $test !== false ? $test : null;
    }

    // Cập nhật tiêu đề và đường dẫn ảnh của một đề thi (dùng cho trang Admin).
    public function updateTest(int $id, string $title, string $image): void
    {
        $stmt = $this->pdo->prepare(
            'UPDATE ket_tests SET title = ?, image = ? WHERE id = ?'
        );
        $stmt->execute([$title, $image, $id]);
    }
}
