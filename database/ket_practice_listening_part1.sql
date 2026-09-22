-- ============================================================
-- KET Listening Part 1 (Picture/Text Multiple Choice) - bổ sung cho database
-- ket_practice. Import file này SAU KHI đã có database ket_practice. File
-- này CHỈ thêm 2 bảng mới, KHÔNG đụng đến các bảng của Reading.
-- ============================================================

USE ket_practice;

-- ket_group/test_label dùng để gom nhóm ở trang chọn đề (accordion quyển KET
-- -> Test), giống hệt cơ chế của ket_part7_tests.
CREATE TABLE ket_listening_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    ket_group VARCHAR(50) NOT NULL DEFAULT '',
    test_label VARCHAR(50) NOT NULL DEFAULT '',
    part INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- option_type quyết định cách hiển thị 3 lựa chọn A/B/C:
--   'text'  - option_a/b/c là văn bản thuần (vd "2:20")
--   'image' - option_a/b/c là đường dẫn ảnh RIÊNG cho từng đáp án
--   'map'   - CHỈ 1 ảnh dùng chung (shared_image, vd sơ đồ/bản đồ có sẵn
--             nhãn A/B/C bên trong ảnh); option_a/b/c khi đó chỉ là
--             placeholder 'A'/'B'/'C' để hiển thị nút chọn, không mang nội dung.
-- audio_path cho phép NULL vì admin có thể tạo câu hỏi trước rồi tải audio
-- lên sau. Mỗi câu có audio RIÊNG (không dùng chung 1 file cho cả part) để
-- học sinh nghe lại độc lập từng câu.
CREATE TABLE ket_listening_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    question_number INT NOT NULL,
    question_text VARCHAR(500) NOT NULL,
    audio_path VARCHAR(255) NULL,
    option_type ENUM('text', 'image', 'map') NOT NULL DEFAULT 'text',
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    shared_image VARCHAR(255) NULL,
    correct_answer CHAR(1) NOT NULL,
    explanation VARCHAR(500) NULL,
    is_example TINYINT(1) NOT NULL DEFAULT 0,
    CONSTRAINT fk_listening_questions_test
        FOREIGN KEY (test_id) REFERENCES ket_listening_tests(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Dữ liệu mẫu: Test 1 (Example + 5 câu, theo đúng đề "Test 1" trong ảnh gốc
-- do admin cung cấp). Audio chưa có sẵn (audio_path = NULL) - vào
-- Admin > Listening Part 1 để tải file mp3 thật cho từng câu. Ảnh minh hoạ
-- đặt tại public/images/listening1/ (cắt trực tiếp từ đề gốc).
-- Lưu ý: đáp án đúng của câu 5 (map) là PLACEHOLDER vì không có audio gốc
-- để xác nhận - cần admin sửa lại khi có băng nghe thật.
-- ------------------------------------------------------------

INSERT INTO ket_listening_tests (id, title, ket_group, test_label, part) VALUES
(1, 'KET 2 - Listening Part 1 - Test 1', 'KET 2', 'Test 1', 1);

INSERT INTO ket_listening_questions
    (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
VALUES
(1, 0, 'How many people were at the meeting?', NULL, 'text', '3', '13', '30', NULL, 'C', NULL, 1),
(1, 1, 'What will they eat for dinner this evening?', NULL, 'image',
    'images/listening1/q1-dinner-a.png', 'images/listening1/q1-dinner-b.png', 'images/listening1/q1-dinner-c.png', NULL,
    'B', 'Người con trai đề nghị "Let''s have fish tonight" và mẹ đồng ý.', 0),
(1, 2, 'What time is it?', NULL, 'image',
    'images/listening1/q2-time-a.png', 'images/listening1/q2-time-b.png', 'images/listening1/q2-time-c.png', NULL,
    'A', 'Đồng hồ trong hội thoại chỉ 2:10.', 0),
(1, 3, 'What''s Michelle going to read?', NULL, 'image',
    'images/listening1/q3-read-a.png', 'images/listening1/q3-read-b.png', 'images/listening1/q3-read-c.png', NULL,
    'A', 'Michelle nói cô ấy đang đọc dở một cuốn tiểu thuyết (a novel/book).', 0),
(1, 4, 'How much did the tickets cost?', NULL, 'text', '$19', '$90', '$99', NULL,
    'C', 'Người bán vé nói giá vé là "ninety-nine dollars".', 0),
(1, 5, 'Where is the chemist''s?', NULL, 'map', 'A', 'B', 'C',
    'images/listening1/q5-map.png',
    'B', 'PLACEHOLDER - chưa có audio gốc để xác nhận, admin cần nghe lại và sửa đáp án đúng.', 0);

-- ------------------------------------------------------------
-- Test 2, Test 3 (đủ Example + 5 câu) và Test 4 (TẠM - mới có Example + Q1
-- + Q2, thiếu câu 3-5 vì trang đề gốc chưa được cung cấp). Toàn bộ đáp án
-- đúng bên dưới là PLACEHOLDER (không có audio gốc để xác nhận) - admin cần
-- nghe lại và sửa cho khớp thực tế.
-- ------------------------------------------------------------

INSERT INTO ket_listening_tests (title, ket_group, test_label, part) VALUES ('KET 2 - Listening Part 1 - Test 2', 'KET 2', 'Test 2', 1);
SET @t2 = LAST_INSERT_ID();

INSERT INTO ket_listening_questions
    (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
VALUES
(@t2, 0, 'How many people were at the meeting?', NULL, 'text', '3', '13', '30', NULL, 'C', NULL, 1),
(@t2, 1, 'How will Mary travel to Scotland?', NULL, 'image',
    'images/listening1/t2-q1-a.png', 'images/listening1/t2-q1-b.png', 'images/listening1/t2-q1-c.png', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@t2, 2, 'Where are the shoes?', NULL, 'image',
    'images/listening1/t2-q2-a.png', 'images/listening1/t2-q2-b.png', 'images/listening1/t2-q2-c.png', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@t2, 3, 'When will the football match start next week?', NULL, 'text', '11.45 a.m.', '12.15 p.m.', '2.00 p.m.', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@t2, 4, 'Which box of chocolates do they buy?', NULL, 'image',
    'images/listening1/t2-q4-a.png', 'images/listening1/t2-q4-b.png', 'images/listening1/t2-q4-c.png', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@t2, 5, 'When''s Wendy''s birthday?', NULL, 'text', '16 May', '18 May', '21 May', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0);

INSERT INTO ket_listening_tests (title, ket_group, test_label, part) VALUES ('KET 2 - Listening Part 1 - Test 3', 'KET 2', 'Test 3', 1);
SET @t3 = LAST_INSERT_ID();

INSERT INTO ket_listening_questions
    (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
VALUES
(@t3, 0, 'When''s the school trip?', NULL, 'text', 'Tuesday', 'Wednesday', 'Thursday', NULL, 'C', NULL, 1),
(@t3, 1, 'Where''s the sports centre?', NULL, 'map', 'A', 'B', 'C',
    'images/listening1/t3-q1-map.png',
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@t3, 2, 'How much petrol does the woman want?', NULL, 'text', '13 litres', '30 litres', '33 litres', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@t3, 3, 'Which table do they buy?', NULL, 'image',
    'images/listening1/t3-q3-a.png', 'images/listening1/t3-q3-b.png', 'images/listening1/t3-q3-c.png', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@t3, 4, 'What time does the class start?', NULL, 'image',
    'images/listening1/t3-q4-a.png', 'images/listening1/t3-q4-b.png', 'images/listening1/t3-q4-c.png', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@t3, 5, 'What was the weather like on Emma''s holiday?', NULL, 'image',
    'images/listening1/t3-q5-a.png', 'images/listening1/t3-q5-b.png', 'images/listening1/t3-q5-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0);

INSERT INTO ket_listening_tests (title, ket_group, test_label, part) VALUES ('KET 2 - Listening Part 1 - Test 4', 'KET 2', 'Test 4', 1);
SET @t4 = LAST_INSERT_ID();

INSERT INTO ket_listening_questions
    (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
VALUES
(@t4, 0, 'What time is it?', NULL, 'text', '06.00', '08.00', '09.00', NULL, 'C', NULL, 1),
(@t4, 1, 'What was the weather like on Wednesday?', NULL, 'image',
    'images/listening1/t4-q1-a.png', 'images/listening1/t4-q1-b.png', 'images/listening1/t4-q1-c.png', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@t4, 2, 'How much did Mark''s pullover cost?', NULL, 'text', '£14.99', '£40.99', '£44.99', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
-- Câu 3-5 lấy lại đúng nội dung từ trang đề người dùng cung cấp (trang đó in
-- nhãn "Test 2" nhưng người dùng xác nhận đây là câu 3-5 của Test 4).
(@t4, 3, 'When will the football match start next week?', NULL, 'text', '11.45 a.m.', '12.15 p.m.', '2.00 p.m.', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@t4, 4, 'Which box of chocolates do they buy?', NULL, 'image',
    'images/listening1/t2-q4-a.png', 'images/listening1/t2-q4-b.png', 'images/listening1/t2-q4-c.png', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@t4, 5, 'When''s Wendy''s birthday?', NULL, 'text', '16 May', '18 May', '21 May', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0);

-- ------------------------------------------------------------
-- KET 3 - Test 1 (sách khác với 4 test "KET Listening Part 1" ở trên, vẫn
-- là Part 1 - Picture/Text Multiple Choice, chỉ khác nguồn đề). Câu 5
-- (map) đặc biệt: 1 ảnh chung (ghế + sofa) đã có sẵn nhãn A/B/C ngay trên
-- từng quyển sách trong tranh.
-- ------------------------------------------------------------

INSERT INTO ket_listening_tests (title, ket_group, test_label, part) VALUES ('KET 3 - Listening Part 1 - Test 1', 'KET 3', 'Test 1', 1);
SET @k3t1 = LAST_INSERT_ID();

INSERT INTO ket_listening_questions
    (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
VALUES
(@k3t1, 0, 'How many people were at the meeting?', NULL, 'text', '3', '13', '30', NULL, 'C', NULL, 1),
(@k3t1, 1, 'When did Gary start his new job?', NULL, 'image',
    'images/listening1/k3t1-q1-a.png', 'images/listening1/k3t1-q1-b.png', 'images/listening1/k3t1-q1-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t1, 2, 'What time does the film start?', NULL, 'text', '4.30 and 7.00', '4.30 and 7.30', '4.00 and 7.30', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t1, 3, 'What was the weather like on Saturday?', NULL, 'image',
    'images/listening1/k3t1-q3-a.png', 'images/listening1/k3t1-q3-b.png', 'images/listening1/k3t1-q3-c.png', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t1, 4, 'Which motorway will they take?', NULL, 'text', 'M1', 'M6', 'M62', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t1, 5, 'Which book does Lorna want?', NULL, 'map', 'A', 'B', 'C',
    'images/listening1/k3t1-q5-map.png',
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0);

INSERT INTO ket_listening_tests (title, ket_group, test_label, part) VALUES ('KET 3 - Listening Part 1 - Test 2', 'KET 3', 'Test 2', 1);
SET @k3t2 = LAST_INSERT_ID();

INSERT INTO ket_listening_questions
    (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
VALUES
(@k3t2, 0, 'How many people were at the meeting?', NULL, 'text', '3', '13', '30', NULL, 'C', NULL, 1),
(@k3t2, 1, 'What colour is Kathy''s bedroom now?', NULL, 'text', 'PINK', 'GREEN', 'BLUE', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t2, 2, 'Which platform does the woman''s train leave from?', NULL, 'text', 'PLATFORM 2', 'PLATFORM 6', 'PLATFORM 10', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t2, 3, 'How is Susan going to get to the airport?', NULL, 'image',
    'images/listening1/k3t2-q3-a.png', 'images/listening1/k3t2-q3-b.png', 'images/listening1/k3t2-q3-c.png', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t2, 4, 'Which is Anna''s family?', NULL, 'image',
    'images/listening1/k3t2-q4-a.png', 'images/listening1/k3t2-q4-b.png', 'images/listening1/k3t2-q4-c.png', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t2, 5, 'When is Kim''s birthday party?', NULL, 'text', 'June 11', 'June 16', 'June 30', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0);

INSERT INTO ket_listening_tests (title, ket_group, test_label, part) VALUES ('KET 3 - Listening Part 1 - Test 3', 'KET 3', 'Test 3', 1);
SET @k3t3 = LAST_INSERT_ID();

INSERT INTO ket_listening_questions
    (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
VALUES
(@k3t3, 0, 'How many people were at the meeting?', NULL, 'text', '3', '13', '30', NULL, 'C', NULL, 1),
(@k3t3, 1, 'When will they go on holiday?', NULL, 'text', 'June', 'July', 'September', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t3, 2, 'How is Patti going to travel?', NULL, 'image',
    'images/listening1/k3t3-q2-a.png', 'images/listening1/k3t3-q2-b.png', 'images/listening1/k3t3-q2-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t3, 3, 'What will Sam do?', NULL, 'image',
    'images/listening1/k3t3-q3-a.png', 'images/listening1/k3t3-q3-b.png', 'images/listening1/k3t3-q3-c.png', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t3, 4, 'What was the weather like in Portugal?', NULL, 'image',
    'images/listening1/k3t3-q4-a.png', 'images/listening1/k3t3-q4-b.png', 'images/listening1/k3t3-q4-c.png', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t3, 5, 'What has the girl broken?', NULL, 'image',
    'images/listening1/k3t3-q5-a.png', 'images/listening1/k3t3-q5-b.png', 'images/listening1/k3t3-q5-c.png', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0);

INSERT INTO ket_listening_tests (title, ket_group, test_label, part) VALUES ('KET 3 - Listening Part 1 - Test 4', 'KET 3', 'Test 4', 1);
SET @k3t4 = LAST_INSERT_ID();

INSERT INTO ket_listening_questions
    (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
VALUES
(@k3t4, 0, 'How many people were at the meeting?', NULL, 'text', '3', '13', '30', NULL, 'C', NULL, 1),
(@k3t4, 1, 'Which is Tom''s mother?', NULL, 'image',
    'images/listening1/k3t4-q1-a.png', 'images/listening1/k3t4-q1-b.png', 'images/listening1/k3t4-q1-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t4, 2, 'Where will the beach party be?', NULL, 'map', 'A', 'B', 'C',
    'images/listening1/k3t4-q2-map.png',
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t4, 3, 'What will Fiona wear to the dance?', NULL, 'image',
    'images/listening1/k3t4-q3-a.png', 'images/listening1/k3t4-q3-b.png', 'images/listening1/k3t4-q3-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t4, 4, 'What homework is the girl doing now?', NULL, 'text', 'Science', 'Maths', 'English', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k3t4, 5, 'What''s David going to buy?', NULL, 'image',
    'images/listening1/k3t4-q5-a.png', 'images/listening1/k3t4-q5-b.png', 'images/listening1/k3t4-q5-c.png', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0);

INSERT INTO ket_listening_tests (title, ket_group, test_label, part) VALUES ('KET 4 - Listening Part 1 - Test 1', 'KET 4', 'Test 1', 1);
SET @k4t1 = LAST_INSERT_ID();

INSERT INTO ket_listening_questions
    (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
VALUES
(@k4t1, 0, 'How many people were at the meeting?', NULL, 'text', '3', '13', '30', NULL, 'C', NULL, 1),
(@k4t1, 1, 'What music will they have at the party?', NULL, 'image',
    'images/listening1/k4t1-q1-a.png', 'images/listening1/k4t1-q1-b.png', 'images/listening1/k4t1-q1-c.png', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t1, 2, 'When will the man go on holiday?', NULL, 'text', 'June', 'July', 'August', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t1, 3, 'What will the weather be like tomorrow?', NULL, 'image',
    'images/listening1/k4t1-q3-a.png', 'images/listening1/k4t1-q3-b.png', 'images/listening1/k4t1-q3-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t1, 4, 'What colour is Mary''s coat?', NULL, 'text', 'yellow', 'blue', 'brown', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t1, 5, 'What did the woman repair?', NULL, 'image',
    'images/listening1/k4t1-q5-a.png', 'images/listening1/k4t1-q5-b.png', 'images/listening1/k4t1-q5-c.png', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0);

INSERT INTO ket_listening_tests (title, ket_group, test_label, part) VALUES ('KET 4 - Listening Part 1 - Test 2', 'KET 4', 'Test 2', 1);
SET @k4t2 = LAST_INSERT_ID();

INSERT INTO ket_listening_questions
    (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
VALUES
(@k4t2, 0, 'How many people were at the meeting?', NULL, 'text', '3', '13', '30', NULL, 'C', NULL, 1),
(@k4t2, 1, 'What are they going to buy for Pam?', NULL, 'image',
    'images/listening1/k4t2-q1-a.png', 'images/listening1/k4t2-q1-b.png', 'images/listening1/k4t2-q1-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t2, 2, 'When is the man''s appointment?', NULL, 'text', 'Wednesday', 'Thursday', 'Friday', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t2, 3, 'Which is the aunt''s postcard?', NULL, 'image',
    'images/listening1/k4t2-q3-a.png', 'images/listening1/k4t2-q3-b.png', 'images/listening1/k4t2-q3-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t2, 4, 'What time will the plane to Milan leave?', NULL, 'image',
    'images/listening1/k4t2-q4-a.png', 'images/listening1/k4t2-q4-b.png', 'images/listening1/k4t2-q4-c.png', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t2, 5, 'What does Joe''s father do?', NULL, 'image',
    'images/listening1/k4t2-q5-a.png', 'images/listening1/k4t2-q5-b.png', 'images/listening1/k4t2-q5-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0);

INSERT INTO ket_listening_tests (title, ket_group, test_label, part) VALUES ('KET 4 - Listening Part 1 - Test 3', 'KET 4', 'Test 3', 1);
SET @k4t3 = LAST_INSERT_ID();

INSERT INTO ket_listening_questions
    (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
VALUES
(@k4t3, 0, 'How many people were at the meeting?', NULL, 'text', '3', '13', '30', NULL, 'C', NULL, 1),
(@k4t3, 1, 'What''s George doing now?', NULL, 'image',
    'images/listening1/k4t3-q1-a.png', 'images/listening1/k4t3-q1-b.png', 'images/listening1/k4t3-q1-c.png', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t3, 2, 'Which room will the woman stay in?', NULL, 'image',
    'images/listening1/k4t3-q2-a.png', 'images/listening1/k4t3-q2-b.png', 'images/listening1/k4t3-q2-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t3, 3, 'What will the boy wear in the race?', NULL, 'image',
    'images/listening1/k4t3-q3-a.png', 'images/listening1/k4t3-q3-b.png', 'images/listening1/k4t3-q3-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t3, 4, 'What colour will the room be?', NULL, 'image',
    'images/listening1/k4t3-q4-a.png', 'images/listening1/k4t3-q4-b.png', 'images/listening1/k4t3-q4-c.png', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t3, 5, 'Where did Minnie and Richard first meet?', NULL, 'image',
    'images/listening1/k4t3-q5-a.png', 'images/listening1/k4t3-q5-b.png', 'images/listening1/k4t3-q5-c.png', NULL,
    'C', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0);

INSERT INTO ket_listening_tests (title, ket_group, test_label, part) VALUES ('KET 4 - Listening Part 1 - Test 4', 'KET 4', 'Test 4', 1);
SET @k4t4 = LAST_INSERT_ID();

INSERT INTO ket_listening_questions
    (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
VALUES
(@k4t4, 0, 'How many people were at the meeting?', NULL, 'text', '3', '13', '30', NULL, 'C', NULL, 1),
(@k4t4, 1, 'How much is the car?', NULL, 'image',
    'images/listening1/k4t4-q1-a.png', 'images/listening1/k4t4-q1-b.png', 'images/listening1/k4t4-q1-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t4, 2, 'What''s Elena going to take to the party?', NULL, 'image',
    'images/listening1/k4t4-q2-a.png', 'images/listening1/k4t4-q2-b.png', 'images/listening1/k4t4-q2-c.png', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t4, 3, 'Where will Susan buy her eggs?', NULL, 'image',
    'images/listening1/k4t4-q3-a.png', 'images/listening1/k4t4-q3-b.png', 'images/listening1/k4t4-q3-c.png', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t4, 4, 'What time does the film begin?', NULL, 'image',
    'images/listening1/k4t4-q4-a.png', 'images/listening1/k4t4-q4-b.png', 'images/listening1/k4t4-q4-c.png', NULL,
    'B', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0),
(@k4t4, 5, 'How will the man travel to London?', NULL, 'image',
    'images/listening1/k4t4-q5-a.png', 'images/listening1/k4t4-q5-b.png', 'images/listening1/k4t4-q5-c.png', NULL,
    'A', 'PLACEHOLDER - chưa có audio gốc, cần nghe lại để xác nhận đáp án đúng.', 0);
