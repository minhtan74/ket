<?php
// Kết nối MySQL bằng PDO. File này trả về một đối tượng PDO ($pdo)
// để các Model dùng chung khi truy vấn dữ liệu.

$dbHost = 'localhost';
$dbPort = '3307'; // Cổng MySQL đi kèm XAMPP trên máy này (mặc định 3306 đã bị chiếm)
$dbName = 'ket_practice';
$dbUser = 'root';
$dbPass = '';
$dbCharset = 'utf8mb4';

$dsn = "mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset={$dbCharset}";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $dbUser, $dbPass, $options);
} catch (PDOException $e) {
    die('Database connection failed: ' . $e->getMessage());
}
