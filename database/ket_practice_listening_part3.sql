-- ============================================================
-- KET Listening Part 3 (Multiple choice - one shared conversation) - bổ
-- sung cho database ket_practice. Import file này SAU KHI đã có database
-- ket_practice (và sau ket_practice_listening_part1.sql). File này CHỈ
-- thêm 2 bảng mới, KHÔNG đụng đến các bảng Reading hay Listening Part 1.
--
-- Khác với Part 1 (mỗi câu 1 audio riêng, đáp án có thể là ảnh/bản đồ),
-- Part 3 chỉ có DUY NHẤT 1 đoạn hội thoại (audio) cho cả 5 câu, nghe 2
-- lần, và đáp án A/B/C luôn là văn bản (giống hệt bản đề giấy: tick vào
-- ô vuông A/B/C). Vì vậy audio_path nằm ở bảng test (dùng chung), không
-- nằm ở bảng câu hỏi.
-- ============================================================

USE ket_practice;

-- ket_group/test_label dùng để gom nhóm ở trang chọn đề (accordion quyển
-- KET -> Test), giống hệt ket_listening_tests (Part 1) và ket_part7_tests.
CREATE TABLE ket_listening_part3_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    ket_group VARCHAR(50) NOT NULL DEFAULT '',
    test_label VARCHAR(50) NOT NULL DEFAULT '',
    audio_path VARCHAR(255) NULL,
    part INT NOT NULL DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- question_number lưu ĐÚNG số thứ tự in trên đề thật (11-15), Example
-- dùng question_number = 10 (số ngay trước câu đầu tiên) + is_example = 1,
-- để hiển thị "Question 10" không lẫn với câu 11 thật - xem thêm ghi chú
-- trong ListeningPart3Client.js. option_a/b/c luôn là văn bản (không có
-- option_type/image/map như Part 1, vì đề Part 3 gốc chỉ có chữ).
CREATE TABLE ket_listening_part3_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    question_number INT NOT NULL,
    question_text VARCHAR(500) NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    correct_answer CHAR(1) NOT NULL,
    explanation VARCHAR(500) NULL,
    is_example TINYINT(1) NOT NULL DEFAULT 0,
    CONSTRAINT fk_listening_part3_questions_test
        FOREIGN KEY (test_id) REFERENCES ket_listening_part3_tests(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Dữ liệu mẫu: Test 1 (Example + câu 11-15, theo đúng đề "Test 1" trong
-- ảnh gốc do admin cung cấp - "A woman talking to a policeman").
-- audio_path = NULL vì chưa có file ghi âm thật - vào Admin > Listening
-- Part 3 để tải mp3 hội thoại lên cho đề này.
-- LƯU Ý: đáp án đúng bên dưới đọc theo dấu tick tay trên ảnh đề gốc
-- (PLACEHOLDER) - cần admin nghe lại audio thật để xác nhận trước khi
-- dùng để chấm điểm.
-- ------------------------------------------------------------

INSERT INTO ket_listening_part3_tests (id, title, ket_group, test_label, audio_path, part) VALUES
(1, 'KET 2 - Listening Part 3 - Test 1', 'KET 2', 'Test 1', NULL, 3);

INSERT INTO ket_listening_part3_questions
    (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer, explanation, is_example)
VALUES
(1, 10, 'Where did the woman lose her bag?', 'in town', 'on the bus', 'at home', 'A', NULL, 1),
(1, 11, 'How much money was in the bag?', '£20', '£40', '£50', 'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(1, 12, 'What else was in the bag?', 'credit card', 'driving licence', 'gloves', 'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(1, 13, 'The bag was', 'old.', 'expensive.', 'big.', 'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(1, 14, 'What time did the woman lose her bag?', '9.30', '10.00', '10.30', 'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(1, 15, 'The policeman will telephone her in the', 'morning.', 'afternoon.', 'evening.', 'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0);
