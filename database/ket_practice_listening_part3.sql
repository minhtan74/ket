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

-- ------------------------------------------------------------
-- KET 2 - Test 2, 3, 4 và KET 3 - Test 1-4 (đủ Example + câu 11-15 mỗi
-- đề). Đáp án đúng lấy trực tiếp từ đề đã có sẵn đáp án tick tay (ảnh đề
-- gốc do admin cung cấp) - KHÔNG phải placeholder, không cần nghe lại để
-- xác nhận. audio_path = NULL vì chưa có file ghi âm thật - vào Admin >
-- Listening Part 3 để tải mp3 hội thoại lên cho từng đề.
-- ------------------------------------------------------------

INSERT INTO ket_listening_part3_tests (title, ket_group, test_label, audio_path, part) VALUES ('KET 2 - Listening Part 3 - Test 2', 'KET 2', 'Test 2', NULL, 3);
SET @k2t2 = LAST_INSERT_ID();

INSERT INTO ket_listening_part3_questions
    (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer, explanation, is_example)
VALUES
(@k2t2, 10, 'Where is the new sports centre?', 'Long Road', 'Bridge Street', 'Station Road', 'A', NULL, 1),
(@k2t2, 11, 'What sport can''t you do at the sports centre?', 'tennis', 'table-tennis', 'volleyball', 'A', NULL, 0),
(@k2t2, 12, 'How much must Marina pay?', '£14 a year', '£30 a year', '£50 a year', 'B', NULL, 0),
(@k2t2, 13, 'How many days a week is the sports centre open late?', '2', '3', '4', 'B', NULL, 0),
(@k2t2, 14, 'Which bus goes to the sports centre?', 'number 10', 'number 16', 'number 60', 'B', NULL, 0),
(@k2t2, 15, 'When will Michael and Marina go to the sports centre?', 'Tuesday', 'Thursday', 'Friday', 'C', NULL, 0);

INSERT INTO ket_listening_part3_tests (title, ket_group, test_label, audio_path, part) VALUES ('KET 2 - Listening Part 3 - Test 3', 'KET 2', 'Test 3', NULL, 3);
SET @k2t3 = LAST_INSERT_ID();

INSERT INTO ket_listening_part3_questions
    (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer, explanation, is_example)
VALUES
(@k2t3, 10, 'Mrs Lee will leave on', 'Friday', 'Saturday', 'Sunday', 'B', NULL, 1),
(@k2t3, 11, 'Mrs Lee''s plane goes at', '8 a.m.', '10 a.m.', '11 a.m.', 'B', NULL, 0),
(@k2t3, 12, 'She is going to', 'Amsterdam', 'Frankfurt', 'London', 'C', NULL, 0),
(@k2t3, 13, 'First she will go to', 'a factory', 'an office', 'a hotel', 'A', NULL, 0),
(@k2t3, 14, 'She will have dinner in', 'a restaurant', 'her hotel', 'someone''s house', 'A', NULL, 0),
(@k2t3, 15, 'The next morning she will travel by', 'plane', 'train', 'car', 'B', NULL, 0);

INSERT INTO ket_listening_part3_tests (title, ket_group, test_label, audio_path, part) VALUES ('KET 2 - Listening Part 3 - Test 4', 'KET 2', 'Test 4', NULL, 3);
SET @k2t4 = LAST_INSERT_ID();

INSERT INTO ket_listening_part3_questions
    (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer, explanation, is_example)
VALUES
(@k2t4, 10, 'Chloe wants to go to', 'Italy', 'Sweden', 'Switzerland', 'A', NULL, 1),
(@k2t4, 11, 'How many times has Chloe been sailing before?', 'never', 'once', 'twice', 'A', NULL, 0),
(@k2t4, 12, 'How much can Chloe spend?', '£300', '£380', '£450', 'B', NULL, 0),
(@k2t4, 13, 'Chloe will go in', 'August', 'September', 'October', 'B', NULL, 0),
(@k2t4, 14, 'Chloe would like to sail on', 'a lake', 'the sea', 'a river', 'A', NULL, 0),
(@k2t4, 15, 'How does Chloe want to pay?', 'by cheque', 'with cash', 'by credit card', 'C', NULL, 0);

INSERT INTO ket_listening_part3_tests (title, ket_group, test_label, audio_path, part) VALUES ('KET 3 - Listening Part 3 - Test 1', 'KET 3', 'Test 1', NULL, 3);
SET @k3t1 = LAST_INSERT_ID();

INSERT INTO ket_listening_part3_questions
    (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer, explanation, is_example)
VALUES
(@k3t1, 10, 'How is Steve going to go to London?', 'by bus', 'by car', 'by train', 'C', NULL, 1),
(@k3t1, 11, 'How much is a travel card?', '£6', '£16', '£60', 'B', NULL, 0),
(@k3t1, 12, 'Jan will need', 'one photo', 'two photos', 'four photos', 'B', NULL, 0),
(@k3t1, 13, 'Photos are less expensive', 'in the photographer''s shop', 'in the library', 'in the post office', 'A', NULL, 0),
(@k3t1, 14, 'For the travel card, Jan must take', 'a letter', 'her passport', 'her driving licence', 'A', NULL, 0),
(@k3t1, 15, 'Jan can get a travel card from', 'her college', 'the travel agent''s', 'the tourist office', 'B', NULL, 0);

INSERT INTO ket_listening_part3_tests (title, ket_group, test_label, audio_path, part) VALUES ('KET 3 - Listening Part 3 - Test 2', 'KET 3', 'Test 2', NULL, 3);
SET @k3t2 = LAST_INSERT_ID();

INSERT INTO ket_listening_part3_questions
    (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer, explanation, is_example)
VALUES
(@k3t2, 10, 'The name of Peter''s driving school is', 'AA', 'AC', 'ABC', 'C', NULL, 1),
(@k3t2, 11, 'Each driving lesson costs', '£14', '£40', '£60', 'A', NULL, 0),
(@k3t2, 12, 'A lesson is', '30 minutes', '45 minutes', '60 minutes', 'B', NULL, 0),
(@k3t2, 13, 'The teacher''s car is', 'slow', 'old', 'big', 'A', NULL, 0),
(@k3t2, 14, 'Peter failed the test because he', 'drove too fast', 'didn''t see a crossing', 'didn''t stop at the traffic lights', 'C', NULL, 0),
(@k3t2, 15, 'Peter thinks the teacher is too', 'expensive', 'unfriendly', 'young', 'A', NULL, 0);

INSERT INTO ket_listening_part3_tests (title, ket_group, test_label, audio_path, part) VALUES ('KET 3 - Listening Part 3 - Test 3', 'KET 3', 'Test 3', NULL, 3);
SET @k3t3 = LAST_INSERT_ID();

INSERT INTO ket_listening_part3_questions
    (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer, explanation, is_example)
VALUES
(@k3t3, 10, 'The children''s show is at', 'the theatre', 'the shopping centre', 'the library', 'C', NULL, 1),
(@k3t3, 11, 'The show begins at', '1.15', '2.00', '3.30', 'B', NULL, 0),
(@k3t3, 12, 'A child''s ticket costs', '25p', '75p', '£1.50', 'B', NULL, 0),
(@k3t3, 13, 'The holiday reading course is for', '4 weeks', '6 weeks', '10 weeks', 'B', NULL, 0),
(@k3t3, 14, 'This year from the library, children can win', 'a pen', 'a school bag', 'a book', 'A', NULL, 0),
(@k3t3, 15, 'Jenny should meet Mark again', 'next week', 'tomorrow', 'today', 'C', NULL, 0);

INSERT INTO ket_listening_part3_tests (title, ket_group, test_label, audio_path, part) VALUES ('KET 3 - Listening Part 3 - Test 4', 'KET 3', 'Test 4', NULL, 3);
SET @k3t4 = LAST_INSERT_ID();

INSERT INTO ket_listening_part3_questions
    (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer, explanation, is_example)
VALUES
(@k3t4, 10, 'The woman will visit the park for', 'one week', 'two weeks', 'four weeks', 'A', NULL, 1),
(@k3t4, 11, 'In the park, there is', 'a café', 'a hotel', 'a guest-house', 'A', NULL, 0),
(@k3t4, 12, 'The village has a', 'swimming pool', 'cinema', 'food shop', 'C', NULL, 0),
(@k3t4, 13, 'You can only go through the park', 'by car', 'by bus', 'on foot', 'C', NULL, 0),
(@k3t4, 14, 'On weekdays, a visit to the park costs', '$12', '$13', '$16', 'A', NULL, 0),
(@k3t4, 15, 'In the park, the woman will see', 'animals', 'flowers', 'snow', 'A', NULL, 0);

-- ------------------------------------------------------------
-- KET 4 - Test 1 (Sue talking to her friend, Jim, about the new sports
-- centre). Đáp án đúng lấy trực tiếp từ đề đã có sẵn đáp án tick tay (ảnh
-- đề gốc do admin cung cấp).
-- ------------------------------------------------------------

INSERT INTO ket_listening_part3_tests (title, ket_group, test_label, audio_path, part) VALUES ('KET 4 - Listening Part 3 - Test 1', 'KET 4', 'Test 1', NULL, 3);
SET @k4t1 = LAST_INSERT_ID();

INSERT INTO ket_listening_part3_questions
    (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer, explanation, is_example)
VALUES
(@k4t1, 10, 'The new sports centre is', 'cheap.', 'big.', 'dark.', 'B', NULL, 1),
(@k4t1, 11, 'Which bus goes to the sports centre?', '15', '18', '25', 'B', NULL, 0),
(@k4t1, 12, 'From Monday to Saturday, the sports centre is open from', '6 a.m.', '7 a.m.', '9 a.m.', 'A', NULL, 0),
(@k4t1, 13, 'If Sue goes swimming, she must take', 'soap.', 'a swimming hat.', 'a towel.', 'B', NULL, 0),
(@k4t1, 14, 'At the sports centre, you can buy', 'sandwiches.', 'fruit.', 'drinks.', 'A', NULL, 0),
(@k4t1, 15, 'Jim and Sue are going to go to the sports centre next', 'Wednesday.', 'Thursday.', 'Saturday.', 'B', NULL, 0);

-- ------------------------------------------------------------
-- KET 4 - Test 2 (Anne asking her friend about going to a shopping
-- centre). Đáp án đúng lấy trực tiếp từ đề đã có sẵn đáp án tick tay (ảnh
-- đề gốc do admin cung cấp).
-- ------------------------------------------------------------

INSERT INTO ket_listening_part3_tests (title, ket_group, test_label, audio_path, part) VALUES ('KET 4 - Listening Part 3 - Test 2', 'KET 4', 'Test 2', NULL, 3);
SET @k4t2 = LAST_INSERT_ID();

INSERT INTO ket_listening_part3_questions
    (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer, explanation, is_example)
VALUES
(@k4t2, 10, 'The name of the new shopping centre is', 'The Rivers.', 'The Forest Centre.', 'Queen''s.', 'C', NULL, 1),
(@k4t2, 11, 'At the moment, the shopping centre sells', 'clothes.', 'books.', 'food.', 'A', NULL, 0),
(@k4t2, 12, 'You can take a coach to the shopping centre on', 'Mondays.', 'Tuesdays.', 'Saturdays.', 'B', NULL, 0),
(@k4t2, 13, 'Anne''s coach ticket will cost', '£2.50.', '£5.60.', '£10.80.', 'B', NULL, 0),
(@k4t2, 14, 'The nearest coach stop to Anne''s house is', 'in the bus station.', 'in the market square.', 'outside the museum.', 'C', NULL, 0),
(@k4t2, 15, 'The coach journey takes', '10 minutes.', '20 minutes.', '40 minutes.', 'C', NULL, 0);
