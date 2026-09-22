-- ============================================================
-- KET Reading Part 4 (Multiple Choice Cloze) - bổ sung cho database ket_practice
-- Import file này SAU KHI đã có database ket_practice (từ database/ket_practice.sql
-- của Part 1). File này CHỈ thêm 2 bảng mới, KHÔNG đụng đến ket_tests,
-- ket_questions, ket_options của Part 1.
-- ============================================================

USE ket_practice;

-- ------------------------------------------------------------
-- Bảng ket_cloze_tests: mỗi đề Part 4 (đoạn văn + chỗ trống)
-- passage_html chứa các placeholder dạng {{0}}, {{28}}...{{35}}
-- để PHP thay bằng <select> khi hiển thị.
-- ------------------------------------------------------------
CREATE TABLE ket_cloze_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    part INT NOT NULL,
    passage_html TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Bảng ket_cloze_questions: từng chỗ trống của một đề Part 4.
-- question_number = 0 là câu EXAMPLE (không chấm điểm),
-- 28-35 là các câu thật. is_example = 1 đánh dấu câu mẫu.
-- ------------------------------------------------------------
CREATE TABLE ket_cloze_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    question_number INT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    correct_answer CHAR(1) NOT NULL,
    is_example TINYINT(1) NOT NULL DEFAULT 0,
    CONSTRAINT fk_cloze_questions_test
        FOREIGN KEY (test_id) REFERENCES ket_cloze_tests(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Dữ liệu mẫu: bài "BICYCLES"
-- ------------------------------------------------------------

INSERT INTO ket_cloze_tests (id, title, part, passage_html) VALUES
(1, 'KET Reading Part 4 - Test 1 (Bicycles)', 4,
'The bicycle is {{0}} cheap and clean way to travel. The first bicycle {{28}} made about one hundred and fifty years ago. At first, bicycles were expensive. Only rich people {{29}} buy one. These early bicycles looked very different from the ones we have today. Later, {{30}} bicycles became cheaper, many people {{31}} one. People started riding bicycles to work and in {{32}} free time. Today, people use cars more than bicycles; cars are much {{33}} and you don''t get wet when it rains! But some people {{34}} prefer to cycle to work. They say that {{35}} are too many cars in town centres and you can''t find anywhere to park!');

INSERT INTO ket_cloze_questions (test_id, question_number, option_a, option_b, option_c, correct_answer, is_example) VALUES
(1, 0,  'some',  'any',    'a',       'C', 1),
(1, 28, 'was',   'is',     'were',    'A', 0),
(1, 29, 'must',  'could',  'may',     'A', 0),
(1, 30, 'when',  'if',     'that',    'A', 0),
(1, 31, 'buy',   'buys',   'bought',  'A', 0),
(1, 32, 'their', 'his',    'its',     'A', 0),
(1, 33, 'fast',  'faster', 'fastest', 'B', 0),
(1, 34, 'yet',   'still',  'already', 'B', 0),
(1, 35, 'they',  'there',  'here',    'B', 0);
