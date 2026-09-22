-- ============================================================
-- KET Reading/Writing Part 5 (Open Cloze - Letter Completion)
-- bổ sung cho database ket_practice. Import file này SAU KHI đã có
-- database ket_practice. CHỈ thêm 2 bảng mới, KHÔNG đụng đến các bảng
-- của Part 1 (ket_tests/ket_questions/ket_options) hay Part 4
-- (ket_cloze_tests/ket_cloze_questions).
-- ============================================================

USE ket_practice;

-- ------------------------------------------------------------
-- Bảng ket_opencloze_tests: mỗi đề Open Cloze gồm 2 lá thư trao đổi qua lại.
-- letter1_html / letter2_html chứa placeholder {{0}} (example), {{41}}..{{50}}
-- để PHP thay bằng <input type="text"> khi hiển thị.
-- ------------------------------------------------------------
CREATE TABLE ket_opencloze_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    part_label VARCHAR(100) NOT NULL,
    letter1_html TEXT NOT NULL,
    letter1_signature VARCHAR(255) NOT NULL,
    letter2_html TEXT NOT NULL,
    letter2_signature VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Bảng ket_opencloze_questions: từng chỗ trống của một đề.
-- question_number = 0 là câu EXAMPLE (không chấm điểm), 41-50 là câu thật.
-- correct_answer có thể chứa nhiều đáp án đúng cách nhau bởi "|" (ví dụ "this|it").
-- ------------------------------------------------------------
CREATE TABLE ket_opencloze_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    question_number INT NOT NULL,
    correct_answer VARCHAR(100) NOT NULL,
    is_example TINYINT(1) NOT NULL DEFAULT 0,
    CONSTRAINT fk_opencloze_questions_test
        FOREIGN KEY (test_id) REFERENCES ket_opencloze_tests(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Dữ liệu mẫu: thư của Maria Gonzalez và thư trả lời của David May
-- ------------------------------------------------------------

INSERT INTO ket_opencloze_tests
    (id, title, part_label, letter1_html, letter1_signature, letter2_html, letter2_signature)
VALUES (
    1,
    'KET Open Cloze - Test 1 (English Course Letters)',
    'Reading Part 5',
    'Dear Sir,\n\nI {{0}} your advertisement for English courses {{41}} the newspaper. I would {{42}} to have some more information. How {{43}} does a course cost? Also, {{44}} long is each course and when does the next course start?\n\nYours,',
    'Maria Gonzalez',
    'Dear Ms. Gonzalez,\n\nThank {{45}} for your letter. Our next course starts in three weeks, {{46}} Monday, 9 May. This is a 6-week course and it {{47}} £150. If you prefer {{48}} begin in June, we have {{49}} 10-week course for £200. I hope {{50}} is the information you want.\n\nYours,',
    'David May'
);

INSERT INTO ket_opencloze_questions (test_id, question_number, correct_answer, is_example) VALUES
(1, 0,  'read',   1),
(1, 41, 'in',     0),
(1, 42, 'like',   0),
(1, 43, 'much',   0),
(1, 44, 'how',    0),
(1, 45, 'you',    0),
(1, 46, 'on',     0),
(1, 47, 'costs',  0),
(1, 48, 'to',     0),
(1, 49, 'a',      0),
(1, 50, 'this|it', 0);
