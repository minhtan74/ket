-- ============================================================
-- KET Practice Database
-- Chỉ chứa dữ liệu cho: KET -> Reading -> Part 1 (Matching)
-- Import trực tiếp bằng phpMyAdmin (tab Import) hoặc lệnh:
--   mysql -u root -p < ket_practice.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS ket_practice
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE ket_practice;

-- ------------------------------------------------------------
-- Bảng ket_tests: mỗi đề thi (hiện tại chỉ có 1 đề Part 1)
-- ------------------------------------------------------------
CREATE TABLE ket_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    part INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Bảng ket_questions: 5 câu hỏi thuộc một đề thi
-- ------------------------------------------------------------
CREATE TABLE ket_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    question_number INT NOT NULL,
    question_text VARCHAR(500) NOT NULL,
    correct_answer CHAR(1) NOT NULL,
    explanation VARCHAR(500) NULL,
    CONSTRAINT fk_questions_test
        FOREIGN KEY (test_id) REFERENCES ket_tests(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Bảng ket_options: 8 lựa chọn A-H thuộc một đề thi
-- option_image để trống (NULL) vì toàn bộ 8 notice nằm chung
-- trong một ảnh đề thi (ket_tests.image). Cột này dành cho
-- trường hợp sau này một lựa chọn cần hiển thị riêng bằng ảnh.
-- ------------------------------------------------------------
CREATE TABLE ket_options (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    option_letter CHAR(1) NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    option_image VARCHAR(255) NULL,
    CONSTRAINT fk_options_test
        FOREIGN KEY (test_id) REFERENCES ket_tests(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Dữ liệu mẫu
-- ------------------------------------------------------------

INSERT INTO ket_tests (id, title, part, image) VALUES
(1, 'KET Reading Part 1 - Test 1', 1, 'images/part1/test1.jpg');

INSERT INTO ket_questions (test_id, question_number, question_text, correct_answer, explanation) VALUES
(1, 1, 'Children pay less than adults here.', 'H', 'Notice H says "Under 12s HALF PRICE", which means children pay less than adults.'),
(1, 2, 'Be careful because this will burn.', 'F', 'Notice F warns to keep the nightdress away from fire because it can burn.'),
(1, 3, "We don't want any money yet.", 'E', 'Notice E says "BUY NOW, PAY NEXT YEAR!", meaning you do not have to pay immediately.'),
(1, 4, 'Things are cheaper here.', 'A', 'Notice A says "SUMMER SALE, LOW PRICES IN ALL DEPARTMENTS", meaning items are cheaper.'),
(1, 5, 'You must pay with cash.', 'G', 'Notice G says "We do not take cheques or credit cards", meaning only cash is accepted.');

INSERT INTO ket_options (test_id, option_letter, option_text, option_image) VALUES
(1, 'A', 'SUMMER SALE\nLOW PRICES IN ALL DEPARTMENTS', NULL),
(1, 'B', 'FIRE DOOR\nKEEP CLOSED', NULL),
(1, 'C', 'LIFT NOT WORKING', NULL),
(1, 'D', 'TOY SHOP NOW OPEN', NULL),
(1, 'E', 'BUY NOW\nPAY NEXT YEAR!', NULL),
(1, 'F', 'Keep this nightdress\naway from fire!', NULL),
(1, 'G', 'We do not take cheques\nor credit cards.', NULL),
(1, 'H', 'Under 12s\nHALF PRICE', NULL);
