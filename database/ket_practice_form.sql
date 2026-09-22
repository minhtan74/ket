-- ============================================================
-- KET Reading Part 6 (Form Completion) - bổ sung cho database ket_practice.
-- Import file này SAU KHI đã có database ket_practice. CHỈ thêm 2 bảng
-- mới, KHÔNG đụng đến các bảng của Part 1, Part 4 hay Open Cloze.
-- ============================================================

USE ket_practice;

-- ------------------------------------------------------------
-- Bảng ket_form_tests: mỗi đề Form Completion gồm 2 văn bản (thư + note)
-- và 1 form cần điền. 2 văn bản này KHÔNG chứa placeholder {{n}} như các
-- Part trước, vì chúng chỉ để đọc hiểu, chỗ trống nằm ở form riêng.
-- ------------------------------------------------------------
CREATE TABLE ket_form_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    text1_html TEXT NOT NULL,
    text1_date VARCHAR(50) NOT NULL,
    text1_signature VARCHAR(255) NOT NULL,
    text2_html TEXT NOT NULL,
    text2_signature VARCHAR(255) NOT NULL,
    form_title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Bảng ket_form_fields: từng ô cần điền trong form (51-55).
-- correct_answer có thể chứa nhiều đáp án đúng cách nhau bởi "|"
-- (ví dụ "Walton Zoo|Zoo"). explanation giải thích dựa vào câu nào
-- trong 2 văn bản để suy ra đáp án.
-- ------------------------------------------------------------
CREATE TABLE ket_form_fields (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    field_number INT NOT NULL,
    field_label VARCHAR(100) NOT NULL,
    field_prefix VARCHAR(10) NULL,
    correct_answer VARCHAR(255) NOT NULL,
    explanation VARCHAR(500) NULL,
    CONSTRAINT fk_form_fields_test
        FOREIGN KEY (test_id) REFERENCES ket_form_tests(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Dữ liệu mẫu: thư của Lois Jones + note của Suzanna + form đặt chỗ
-- chuyến đi trường học
-- ------------------------------------------------------------

INSERT INTO ket_form_tests
    (id, title, text1_html, text1_date, text1_signature, text2_html, text2_signature, form_title)
VALUES (
    1,
    'KET Reading Part 6 - Test 1 (School Trip)',
    'Dear Mr Taylor,\n\nOn 6th January there is a trip for classes 3A and 4A to Blackfort Castle or Walton Zoo. The cost is only £10 - last year it was £15!\nWe could go by train or by bus. Please tell us which you prefer by 15th December.\n\nYours,',
    '8 December',
    'Lois Jones',
    'Dad,\n\nPlease fill in my form. I don''t want to visit a castle, but the zoo sounds great.\nRemember, I''m not in 3A now!\nI don''t want to travel by bus - it takes too long!',
    'Suzanna',
    'School Trip Booking Form'
);

INSERT INTO ket_form_fields (test_id, field_number, field_label, field_prefix, correct_answer, explanation) VALUES
(1, 51, 'Class:',        NULL, '4A',
    'Note nói "I''m not in 3A now" -> lớp còn lại nêu trong thư là 4A.'),
(1, 52, 'Trip to:',       NULL, 'Walton Zoo|Zoo',
    'Note nói "the zoo sounds great" và không muốn thăm castle -> chọn Walton Zoo.'),
(1, 53, 'Travel by:',     NULL, 'train|By train',
    'Note nói không muốn đi bus vì "it takes too long" -> chọn train.'),
(1, 54, 'Date of trip:',  NULL, '6th January|6 January|on 6th January',
    'Thư nêu rõ "On 6th January there is a trip...".'),
(1, 55, 'Cost:',          '£',  '10',
    'Thư nêu rõ "The cost is only £10".');
