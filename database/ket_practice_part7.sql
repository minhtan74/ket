-- ============================================================
-- KET Reading Part 7 (Complete the Letter(s)) - bo sung cho database
-- ket_practice. Import SAU KHI da co database ket_practice.
-- 20 de: KET 2 - KET 6, Test 1-4 moi bo. Du lieu trich xuat tu
-- anh scan de thi that; mot so dap an duoc suy luan lai tu ngu
-- canh (xem cot 'note' trong ket_part7_questions / 'data_note' trong
-- ket_part7_tests) vi ban scan bi mo/thieu/lech so.
-- ============================================================

USE ket_practice;

CREATE TABLE ket_part7_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    ket_group VARCHAR(20) NOT NULL DEFAULT '',
    test_label VARCHAR(20) NOT NULL DEFAULT '',
    instructions TEXT NULL,
    data_note TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ket_part7_letters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    letter_order INT NOT NULL,
    dateline VARCHAR(100) NULL,
    salutation VARCHAR(255) NOT NULL,
    body_html TEXT NOT NULL,
    closing VARCHAR(100) NOT NULL,
    signature VARCHAR(255) NOT NULL,
    CONSTRAINT fk_part7_letters_test FOREIGN KEY (test_id) REFERENCES ket_part7_tests(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ket_part7_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    question_number INT NOT NULL,
    correct_answer VARCHAR(100) NOT NULL,
    is_example TINYINT(1) NOT NULL DEFAULT 0,
    note VARCHAR(500) NULL,
    CONSTRAINT fk_part7_questions_test FOREIGN KEY (test_id) REFERENCES ket_part7_tests(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---- TEST 1 KET 2 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(1, 'TEST 1 KET 2', 'KET 2', 'Test 1', 'Complete these letters.\nWrite ONE word for each space (41–50).\nFor questions 41–50, write your words on the answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(1, 1, NULL, 'Dear Sir,', 'I {{0}} your advertisement for English courses {{41}} the newspaper. I would {{42}} to have some more information. How {{43}} does a course cost? Also, {{44}} long is each course and when does the next course start?', 'Yours,', 'Maria Gonzalez');
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(1, 2, NULL, 'Dear Ms. Gonzalez,', 'Thank {{45}} for your letter. Our next course starts in three weeks, {{46}} Monday, 9 May. This is a 6-week course and it {{47}} £150. If you prefer {{48}} begin in June, we have {{49}} 10-week course for £200. I hope {{50}} is the information you want.', 'Yours,', 'David May');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(1, 0, 'read', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(1, 41, 'in', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(1, 42, 'like', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(1, 43, 'much', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(1, 44, 'How', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(1, 45, 'you', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(1, 46, 'on', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(1, 47, 'costs', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(1, 48, 'to', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(1, 49, 'a', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(1, 50, 'It', 0, NULL);

-- ---- TEST 2 KET 2 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(2, 'TEST 2 KET 2', 'KET 2', 'Test 2', 'Complete these letters.\nWrite ONE word for each space (41–50).\nFor questions 41–50, write your words on the answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(2, 1, NULL, 'Dear Sir,', 'I lost {{0}} bag on a train {{41}} week. I was on the 8.30 a.m. train to Cambridge {{42}} 10th May. It is {{43}} large blue bag and my name {{44}} written on the outside. {{45}} you found this bag?', 'Yours faithfully,', 'Mary Johnson');
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(2, 2, NULL, 'Dear Ms Johnson,', 'I {{46}} pleased to tell {{47}} that we have your bag here. If you come {{48}} this office, {{49}} give it to you. The office {{50}} at 9 a.m. and closes at 6.30 p.m. every day.', 'Yours sincerely,', 'J Wilson');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(2, 0, 'my', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(2, 41, 'This', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(2, 42, 'on', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(2, 43, 'a', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(2, 44, 'was', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(2, 45, 'Have', 0, 'Bản scan gốc bị thiếu (chỉ có số \'45.\' không có chữ). Suy luận từ ngữ cảnh: \'Have you found this bag?\'.');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(2, 46, 'am', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(2, 47, 'you', 0, 'Bản scan gốc bị thiếu (chỉ có số \'47.\' không có chữ). Suy luận: \'tell you that\'.');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(2, 48, 'to', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(2, 49, 'they', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(2, 50, 'opens', 0, NULL);

-- ---- TEST 3 KET 2 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(3, 'TEST 3 KET 2', 'KET 2', 'Test 3', 'Complete these letters.\nWrite ONE word for each space (41–50).\nFor questions 41–50, write your words on the answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(3, 1, NULL, 'Dear Jacqueline,', 'Would you {{0}} to come {{41}} the cinema {{42}} me after school today? We can go to see Pocahontas at the ABC cinema. The film starts {{43}} 6 o\'clock. Shall {{44}} meet outside the cinema?', 'Love,', 'Isabella');
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(3, 2, NULL, 'Dear Isabella,', 'I am very sorry but I can\'t go to the cinema {{45}} evening. My mother has {{46}} work, and I {{47}} going to cook dinner.\n\nWhy don\'t you {{48}} Karen to go? I hope {{49}} like the film. You can tell me {{50}} it tomorrow.', 'Love,', 'Jacqueline');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(3, 0, 'like', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(3, 41, 'to', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(3, 42, 'with', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(3, 43, 'at', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(3, 44, 'we', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(3, 45, 'this', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(3, 46, 'to', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(3, 47, 'am', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(3, 48, 'invite', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(3, 49, 'you', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(3, 50, 'about', 0, NULL);

-- ---- TEST 4 KET 2 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(4, 'TEST 4 KET 2', 'KET 2', 'Test 4', 'Complete the letter.\nWrite ONE word for each space (41–50).\nFor questions 41–50, write your words on the answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(4, 1, NULL, 'Dear Mike,', 'I am sorry you {{0}} not come to my party yesterday. Jon {{41}} me you had a very bad cold and you {{42}} to stay in bed. {{43}} you feeling better now?\n\nIt was {{44}} very good party; {{45}} nicest I have ever had! Lots of my friends {{46}} there and they gave {{47}} some lovely presents. I will tell {{48}} more about the party when you come {{49}} school {{50}} Monday.', 'Love,', 'Lorenzo');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(4, 0, 'could', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(4, 41, 'told', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(4, 42, 'had', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(4, 43, 'Are', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(4, 44, 'a', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(4, 45, 'the', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(4, 46, 'were', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(4, 47, 'you', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(4, 48, 'you', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(4, 49, 'to', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(4, 50, 'on', 0, NULL);

-- ---- TEST 1 KET 3 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(5, 'TEST 1 KET 3', 'KET 3', 'Test 1', 'Complete this letter.\nWrite ONE word for each space (41–50).\nFor questions 41–50, write your words on the answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(5, 1, NULL, 'Dear Lynne and Tony,', 'I\'m writing {{0}} say thank you {{41}} the two nights I stayed in {{42}} lovely home. It {{43}} good to see you again.\n\nHere {{44}} the photographs {{45}} your children that you asked for. They\'re photos, aren\'t {{46}}? I hope you like {{47}}. I really love my new camera.\n\nI {{48}} going to visit my sister in New York next week. I {{49}} take a lot of photos there, too. I haven\'t seen my sister for a long {{50}}.\n\nThanks again.', 'Love,', 'Roy');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(5, 0, 'to', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(5, 41, 'for', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(5, 42, 'your', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(5, 43, 'was', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(5, 44, 'are', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(5, 45, 'of', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(5, 46, 'they', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(5, 47, 'them', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(5, 48, 'am', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(5, 49, 'will', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(5, 50, 'time', 0, NULL);

-- ---- TEST 2 KET 3 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(6, 'TEST 2 KET 3', 'KET 3', 'Test 2', 'Complete these notes.\nWrite ONE word for each space (41–50).\nFor questions 41–50, write your words on the answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(6, 1, NULL, 'TO ALL STUDENTS:', 'Would you {{0}} to come on a camping trip {{41}} weekend?\n\nWe are going to {{42}} to the forest in the school bus and we will stay at a camp-site {{43}} Friday to Sunday. {{44}} has hot showers and {{45}} small shop and you {{46}} rent bicycles there.\n\nThe trip {{47}} £25. It is very cold there {{48}} night, so you should take warm clothes and you will {{49}} to wear strong shoes.\n\n{{50}} you want to come, tell me today.', '', 'Ahmed\nStudent Secretary');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(6, 0, 'like', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(6, 41, 'this', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(6, 42, 'go', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(6, 43, 'from', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(6, 44, 'It', 0, 'Bản scan gốc in nhầm thành \'The camp - site\' (không hợp lệ vì chỉ được điền 1 từ). Đã sửa theo ngữ pháp thành \'It\' (thay cho \'the camp-site\').');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(6, 45, 'a', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(6, 46, 'can', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(6, 47, 'costs', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(6, 48, 'at', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(6, 49, 'have', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(6, 50, 'if', 0, NULL);

-- ---- TEST 3 KET 3 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(7, 'TEST 3 KET 3', 'KET 3', 'Test 3', 'Complete the letter.\nWrite ONE word for each space (41–50).\nFor questions 41–50, write your words on the answer sheet.', 'QUAN TRỌNG: Ở đề này, cột gợi ý (sidebar) in trong ảnh scan gốc bị LỆCH SỐ so với nội dung thư (không khớp ngữ pháp khi ghép theo đúng thứ tự in ra). Toàn bộ 10 đáp án ở đề này đã được suy luận lại hoàn toàn từ ngữ cảnh/ngữ pháp của bức thư, KHÔNG lấy trực tiếp từ sidebar. Khuyến nghị đối chiếu lại với đáp án gốc (nếu có) trước khi dùng làm đáp án chính thức.');
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(7, 1, NULL, 'Dear Lorna,', 'How {{0}} you? I\'m happy because {{41}} month I got a new job in the city centre. I {{42}} working in a Tourist Information Office and {{43}} is very interesting. I start work {{44}} morning at half past seven, so I {{45}} to get up very early! I love this job because I meet people from a {{46}} of different countries. I like telling them {{47}} our city. Here is {{48}} photo of me. I\'m {{49}} my new uniform. {{50}} you like it?', 'Love,', 'Gloria');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(7, 0, 'are', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(7, 41, 'this', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(7, 42, 'am', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(7, 43, 'it', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(7, 44, 'in', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(7, 45, 'have', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(7, 46, 'lot', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(7, 47, 'about', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(7, 48, 'a', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(7, 49, 'wearing', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(7, 50, 'Do', 0, NULL);

-- ---- TEST 4 KET 3 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(8, 'TEST 4 KET 3', 'KET 3', 'Test 4', 'Complete the letter.\nWrite ONE word for each space (41–50).\nFor questions 41–50, write your words on the answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(8, 1, NULL, 'Dear Mrs Brian,', 'I {{0}} sorry but I can\'t come to your class {{41}} more because I have {{42}} return to my country. My sister is going to get married {{43}} month. I want to go shopping {{44}} her to choose a dress. My parents {{45}} going to make a big meal for the guests and there will {{46}} a lot of work in the kitchen.\n\nI\'m sorry I {{47}} leave the English class. You are {{48}} very good teacher. Please {{49}} goodbye to the other students for {{50}}.\n\nThanks again.', 'Best wishes,', 'Soraya');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(8, 0, 'am', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(8, 41, 'any', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(8, 42, 'to', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(8, 43, 'next', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(8, 44, 'with', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(8, 45, 'are', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(8, 46, 'be', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(8, 47, 'will', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(8, 48, 'a', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(8, 49, 'say', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(8, 50, 'me', 0, NULL);

-- ---- TEST 1 KET 4 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(9, 'TEST 1 KET 4', 'KET 4', 'Test 1', 'Complete the letter.\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(9, 1, NULL, 'Dear Maria,', 'It\'s good to {{0}} back home in my country but I still think {{41}} all the friends I made in our English class, especially you. I cried {{42}} I left England because my visit {{43}} too short. I would {{44}} to return to England but {{45}} time I will stay in a different city.\n\nI have started English classes again here. I learnt a {{46}} of things in England but I know I {{47}} to study even harder.\n\n{{48}} about you? {{49}} you still looking for a job? I hope you find {{50}} soon.', 'Love,', 'Sophie');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(9, 0, 'be', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(9, 41, 'of', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(9, 42, 'when', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(9, 43, 'was', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(9, 44, 'like', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(9, 45, 'next', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(9, 46, 'lot', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(9, 47, 'have', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(9, 48, 'How', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(9, 49, 'Are', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(9, 50, 'it', 0, NULL);

-- ---- TEST 2 KET 4 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(10, 'TEST 2 KET 4', 'KET 4', 'Test 2', 'Complete these letters.\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(10, 1, NULL, 'Dear David,', 'I\'m going to visit your country {{0}} month. I\'m going to travel {{41}} two friends. We don\'t know {{42}} to stay. Are {{43}} any cheap hotels in your town? We {{44}} like to stay somewhere in the centre. Can {{45}} help us?', '', 'Carlos');
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(10, 2, NULL, 'Dear Carlos,', 'Hotels in the centre {{46}} expensive, but I have good news. I {{47}} spoken to my aunt Gloria about you and she says you can all stay at {{48}} house. It {{49}} more bedrooms than my house! That {{50}} be all right for you, won\'t it?', '', 'David');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(10, 0, 'next', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(10, 41, 'with', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(10, 42, 'where', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(10, 43, 'there', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(10, 44, 'would', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(10, 45, 'you', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(10, 46, 'are', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(10, 47, 'have', 0, 'Sidebar bản scan gốc ghi \'was\', nhưng câu \'I ___ spoken to my aunt Gloria\' cần thì hiện tại hoàn thành → đã sửa thành \'have\'.');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(10, 48, 'her', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(10, 49, 'many', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(10, 50, 'will', 0, 'Bản scan gốc bị thiếu (chỉ có số \'50.\' không có chữ). Suy luận từ câu hỏi đuôi \'won\'t it?\' → cần \'will\'.');

-- ---- TEST 3 KET 4 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(11, 'TEST 3 KET 4', 'KET 4', 'Test 3', 'Complete the letter.\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(11, 1, '23 Oak Avenue\nManchester', 'Dear Sir or Madam,', 'I {{0}} like a room at your hotel {{41}} three nights from September 15th {{42}} 17th.\n\nI\'d like a single room {{43}} a shower. I also need {{44}} telephone in my room. Please can I {{45}} a quiet room on {{46}} ground floor?\n\nI am going to drive to the hotel. Is {{47}} a hotel car park?\n\nI {{48}} arrive at about 10.30 p.m. What {{49}} does the restaurant close in the evening? If possible, I would like a meal {{50}} I arrive.\n\nThank you for your help.', 'Yours faithfully,', 'Mark Jones');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(11, 0, 'would', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(11, 41, 'for', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(11, 42, 'to', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(11, 43, 'and', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(11, 44, 'a', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(11, 45, 'book', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(11, 46, 'the', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(11, 47, 'there', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(11, 48, 'will', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(11, 49, 'time', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(11, 50, 'when', 0, NULL);

-- ---- TEST 4 KET 4 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(12, 'TEST 4 KET 4', 'KET 4', 'Test 4', 'Complete this letter.\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(12, 1, NULL, 'Dear Jeff,', 'I\'m having a good holiday {{0}} Australia. When we arrived two weeks {{41}} the weather was bad and {{42}} was cold. Now the weather is better and we go to the beach {{43}} day.\n\nThis week we {{44}} staying in Sydney but {{45}} week we went to the Great Barrier Reef. Because {{46}} water was so warm, I loved swimming there. The fish were all different {{47}}: red, yellow, purple! Australia {{48}} very beautiful. We don\'t want {{49}} come home!\n\nSee you at the end {{50}} September.', '', 'Sue');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(12, 0, 'in', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(12, 41, 'ago', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(12, 42, 'it', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(12, 43, 'every', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(12, 44, 'are', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(12, 45, 'last', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(12, 46, 'the', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(12, 47, 'colours', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(12, 48, 'is', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(12, 49, 'to', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(12, 50, 'of', 0, NULL);

-- ---- TEST 1 KET 5 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(13, 'TEST 1 KET 5', 'KET 5', 'Test 1', 'Complete the email from Greg to his friend, Anna.\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(13, 1, NULL, 'Hi Anna,', 'I\'m {{0}} having a very good week!\n\nYesterday my team had {{41}} volleyball match, but we lost. The other team played much better {{42}} we did! Then my friend Jeff, who lives in Australia, telephoned with bad news. He can\'t come to stay {{43}} us during the holidays because he\'s got a summer job. We can\'t {{44}} camping together now. And this morning, my sister got {{45}} late so she rode my bike {{46}} school! She didn\'t tell {{47}} she needed to use {{48}}. I\'m really angry with {{49}}.\n\nI hope you have some good news! Write back today {{50}} you can.', '', 'Greg');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(13, 0, 'not', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(13, 41, 'a', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(13, 42, 'than', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(13, 43, 'with', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(13, 44, 'go', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(13, 45, 'up', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(13, 46, 'to', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(13, 47, 'me', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(13, 48, 'it', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(13, 49, 'her', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(13, 50, 'if', 0, NULL);

-- ---- TEST 2 KET 5 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(14, 'TEST 2 KET 5', 'KET 5', 'Test 2', 'Complete the note.\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(14, 1, NULL, 'Indre,', 'I have {{0}} problem and I need your help. Can you come shopping {{41}} me tomorrow? My grandmother is going to {{42}} 80 next month and she is having a party {{43}} Saturday.\n\nThe problem is I don\'t have anything to wear. I {{44}} grown so much that all my trousers {{45}} too short for me now! I want {{46}} buy some new ones and maybe a pair {{47}} boots. I haven\'t got a {{48}} of money to spend but I think it will be enough.\n\n{{49}} you like to meet in the morning {{50}} the afternoon? Let me know.', '', 'Sarika');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(14, 0, 'a', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(14, 41, 'with', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(14, 42, 'be', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(14, 43, 'on', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(14, 44, 'have', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(14, 45, 'are', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(14, 46, 'to', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(14, 47, 'of', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(14, 48, 'lot', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(14, 49, 'Would', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(14, 50, 'or', 0, NULL);

-- ---- TEST 3 KET 5 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(15, 'TEST 3 KET 5', 'KET 5', 'Test 3', 'Complete the letter.\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(15, 1, NULL, 'Dear Deshini,', 'It\'s great that {{0}} are my new penfriend. My name is Tom and I {{41}} fifteen years old. I {{42}} born in Canada but I live in England now. Please write and tell me all {{43}} your life in India. I {{44}} love to go there one day.\n\nDo you live in a small village {{45}} in a big town? {{46}} is your school like? {{47}} you got any pictures of your school you could send me? I\'m sending you {{48}} few photos of my family. I\'ll send more {{49}} time I write.\n\nI hope you\'ll write {{50}} me soon.', '', 'Tom');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(15, 0, 'you', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(15, 41, 'am', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(15, 42, 'was', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(15, 43, 'about', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(15, 44, 'would', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(15, 45, 'or', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(15, 46, 'What', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(15, 47, 'Have', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(15, 48, 'a', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(15, 49, 'next', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(15, 50, 'to', 0, NULL);

-- ---- TEST 4 KET 5 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(16, 'TEST 4 KET 5', 'KET 5', 'Test 4', 'Complete the letter.\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(16, 1, NULL, 'Dear Keira,', 'Thank you {{0}} your letter. I had my first day {{41}} my new school today. A girl {{42}} Nicole looked after me and showed me {{43}} my classrooms were. She is very nice and I {{44}} going to visit her this weekend.\n\nMy favourite lesson today was Maths and I was happy because I knew more {{45}} the other girls. I also played hockey for {{46}} first time. I really enjoyed it.\n\nMost of the teachers seem friendly but I\'m afraid {{47}} the head teacher. No one likes {{48}} because he shouts {{49}} lot.\n\nI must go now because I have {{50}} do my homework.', '', 'Hester');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(16, 0, 'for', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(16, 41, 'in', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(16, 42, 'named', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(16, 43, 'where', 0, 'Sidebar bản scan gốc ghi \'in\', nhưng câu \'showed me ___ my classrooms were\' cần từ để hỏi chỉ nơi chốn → đã sửa thành \'where\'.');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(16, 44, 'am', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(16, 45, 'than', 0, 'Bản scan gốc bị thiếu (chỉ có số \'45.\' không có chữ). Suy luận: \'I knew more than the other girls\'.');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(16, 46, 'the', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(16, 47, 'of', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(16, 48, 'him', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(16, 49, 'a', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(16, 50, 'to', 0, NULL);

-- ---- TEST 1 KET 6 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(17, 'TEST 1 KET 6', 'KET 6', 'Test 1', 'Complete the email.\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(17, 1, NULL, 'Hi Gabriella,', 'You\'re {{0}} the island of Sicily, aren\'t you? I really need you {{41}} help me with my homework! I went to the library yesterday to {{42}} for a book because I need some information {{43}} Sicily. I couldn\'t find {{44}} good books there, just an old map!\n\nCan I ask you {{45}} few questions?\n\nFirst, {{46}} big is the island? When did it {{47}} become part of Italy? I {{48}} like to know one more thing. Farmers grow lemons there, but {{49}} they grow other fruit too?\n\nPlease email me your answers as {{50}} as possible!', 'Thanks,', 'Heidi');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(17, 0, 'from', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(17, 41, 'to', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(17, 42, 'look', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(17, 43, 'about', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(17, 44, 'any', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(17, 45, 'a', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(17, 46, 'how', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(17, 47, 'it', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(17, 48, 'would', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(17, 49, 'do', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(17, 50, 'soon', 0, NULL);

-- ---- TEST 2 KET 6 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(18, 'TEST 2 KET 6', 'KET 6', 'Test 2', 'Complete the letter.\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(18, 1, NULL, 'Dear Kate,', 'It will {{0}} my 14th birthday {{41}} March 8. Mum and Dad {{42}} going to take me to the beach. We\'ll go by car, so I can take four friends {{43}} me.\n\nWould you like to come? Hannah has said {{44}} will come. I am asking David, Maria {{45}} you. Mum will take all the food, so you don\'t {{46}} to bring anything to {{47}}.\n\n{{48}} the weather is good, we may swim {{49}} the sea so remember to bring your swimming things.\n\nI really {{50}} you can come.', 'Love,', 'Barbara');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(18, 0, 'be', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(18, 41, 'on', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(18, 42, 'are', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(18, 43, 'with', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(18, 44, 'she', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(18, 45, 'and', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(18, 46, 'have', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(18, 47, 'eat', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(18, 48, 'if', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(18, 49, 'in', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(18, 50, 'hope', 0, NULL);

-- ---- TEST 3 KET 6 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(19, 'TEST 3 KET 6', 'KET 6', 'Test 3', 'Complete the email from Kenny to his friend Paul.\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(19, 1, NULL, 'Hi Paul,', 'I\'m sending this email {{0}} you from France! I\'m having {{41}} excellent time here in Lyon and learning a {{42}} of new words on my language course.\n\nI\'m staying with a great family. {{43}} are two teenage boys and one of {{44}} has got a computer in his room. I {{45}} send you an email every day {{46}} you like. They\'ve also got a pool {{47}} the garden and after college I often {{48}} swimming.\n\nHow\'s everything {{49}} home? Write to {{50}} soon,', '', 'Kenny');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(19, 0, 'to', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(19, 41, 'an', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(19, 42, 'lot', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(19, 43, 'There', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(19, 44, 'them', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(19, 45, 'can', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(19, 46, 'if', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(19, 47, 'in', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(19, 48, 'go', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(19, 49, 'at', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(19, 50, 'me', 0, NULL);

-- ---- TEST 4 KET 6 ----
INSERT INTO ket_part7_tests (id, title, ket_group, test_label, instructions, data_note) VALUES
(20, 'TEST 4 KET 6', 'KET 6', 'Test 4', 'Complete this message left on the internet by Sara Lewis.\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.', NULL);
INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature) VALUES
(20, 1, NULL, '', 'My name is Sara Lewis and I am fourteen {{0}} old. I live in the centre {{41}} Toronto, Canada. When I grow up, I want to {{42}} an actress. My father {{43}} not think this is a good idea! He is a doctor and he wants {{44}} to study medicine at university. But I know I won\'t like medicine. I have science lessons at school and {{45}} are very boring.\n\nI {{46}} like to travel all around the world. I {{47}} only been to Europe once. We usually spend our holidays in Canada but {{48}} year we may visit Australia. Please {{49}} an email to tell me {{50}} your life.', '', 'Sara');
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(20, 0, 'years', 1, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(20, 41, 'of', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(20, 42, 'become', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(20, 43, 'does', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(20, 44, 'me', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(20, 45, 'they', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(20, 46, 'would', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(20, 47, 'have', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(20, 48, 'this', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(20, 49, 'send', 0, NULL);
INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES
(20, 50, 'about', 0, NULL);

