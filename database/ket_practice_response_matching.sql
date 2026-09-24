-- ============================================================
-- KET Reading Part 3 (Matching Functional Language / Response Matching) -
-- bổ sung cho database ket_practice. Import file này SAU KHI đã có database
-- ket_practice. File này CHỈ thêm 2 bảng mới, KHÔNG đụng đến các bảng của
-- Part khác.
--
-- Mỗi câu là 1 câu nói/câu hỏi độc lập (không liên quan tới câu khác),
-- người học chọn phản hồi đúng nhất trong 3 lựa chọn A/B/C. Không có
-- passage/story chung như Part 2 - vì vậy 100 câu được chia đều thành 20
-- đề x 5 câu chỉ để tiện luyện tập theo từng đợt, không theo chủ đề.
-- ============================================================

USE ket_practice;

CREATE TABLE ket_response_matching_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    test_label VARCHAR(50) NOT NULL DEFAULT '',
    part INT NOT NULL DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- question_number đánh số cục bộ 1-5 trong từng đề (giống Part 1/Part 2).
CREATE TABLE ket_response_matching_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    question_number INT NOT NULL,
    question_text VARCHAR(500) NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    correct_answer CHAR(1) NOT NULL,
    explanation VARCHAR(500) NULL,
    CONSTRAINT fk_response_matching_questions_test
        FOREIGN KEY (test_id) REFERENCES ket_response_matching_tests(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Dữ liệu mẫu: 20 đề x 5 câu, lấy từ file "_part_3_24_09_2026.pdf" do admin
-- cung cấp (100 câu, đã có sẵn đáp án).
-- ------------------------------------------------------------

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 1', 'Test 1', 3);
SET @t1 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t1, 1, 'John''s broken this plate.', 'I''m 18.', 'I''m Peter.', 'It doesn''t matter.', 'C'),
(@t1, 2, 'Is this your watch?', 'It''s three o''clock.', 'I think it''s Dave''s.', 'I''m sorry I''m late.', 'B'),
(@t1, 3, 'Can I have a sandwich?', 'Yes, of course.', 'Yes, it is.', 'Yes, that''s right.', 'A'),
(@t1, 4, 'How many people were in the café?', 'Not much.', 'A few.', 'A little.', 'B'),
(@t1, 5, 'We''re from London.', 'Not at all.', 'Yes, please.', 'How interesting.', 'C');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 2', 'Test 2', 3);
SET @t2 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t2, 1, 'John''s going to London.', 'Often?', 'Yesterday?', 'By train?', 'C'),
(@t2, 2, 'When do you study?', 'At school.', 'In the evenings.', 'In the library.', 'B'),
(@t2, 3, 'Do you like my new shoes?', 'Where did you buy them?', 'How long are they?', 'Would you like them?', 'A'),
(@t2, 4, 'Be careful.', 'Thank you.', 'I will.', 'What a pity!', 'B'),
(@t2, 5, 'I hate basketball.', 'You are, too.', 'It can, too.', 'I do, too.', 'C');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 3', 'Test 3', 3);
SET @t3 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t3, 1, 'Let''s walk to the park.', 'All right.', 'I think so.', 'I''m sorry.', 'A'),
(@t3, 2, 'When did you arrive?', 'Tomorrow.', 'Yesterday.', 'For two days.', 'B'),
(@t3, 3, 'Shall I open the window?', 'Yes, I shall.', 'Yes, you will.', 'Yes, please.', 'C'),
(@t3, 4, 'I got a letter from Paul this morning.', 'I''m afraid not.', 'That''s nice.', 'He''s fine.', 'B'),
(@t3, 5, 'How''s your sister?', 'She''s Jane.', 'She''s at school.', 'She''s very well.', 'C');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 4', 'Test 4', 3);
SET @t4 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t4, 1, 'How far is it to Manchester?', 'About two months.', 'It''s quite long.', 'Almost 30 kilometres.', 'C'),
(@t4, 2, 'Could you give me the butter?', 'Here you are.', 'Thank you.', 'I don''t know.', 'A'),
(@t4, 3, 'John hates shopping.', 'I love it.', 'It''s six pounds.', 'The shop''s open.', 'A'),
(@t4, 4, 'I''ve already done my homework.', 'When did you do it?', 'Please do it.', 'Have you done it yet?', 'A'),
(@t4, 5, 'What''s the date today?', 'It''s Thursday.', 'The third, I think.', 'I''m 22 today.', 'B');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 5', 'Test 5', 3);
SET @t5 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t5, 1, 'Who''s that man with the green sweater?', 'He''s my brother.', 'It''s John''s.', 'I don''t know it.', 'A'),
(@t5, 2, 'Where''s Amanda gone?', 'She''s at the station.', 'She''ll arrive tomorrow.', 'She''s going to leave tonight.', 'A'),
(@t5, 3, 'I hate shopping.', 'So do I.', 'Certainly.', 'That''s all right.', 'A'),
(@t5, 4, 'How long did the journey take?', 'About 500 kilometres.', 'Almost 5 hours.', 'Last week.', 'B'),
(@t5, 5, 'The room costs £55 a night.', 'I don''t take it.', 'Give me two, please.', 'That''s a lot.', 'C');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 6', 'Test 6', 3);
SET @t6 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t6, 1, '£500 is too expensive.', 'Not many.', 'Why not?', 'I agree.', 'C'),
(@t6, 2, 'I''ve got an appointment with my doctor today.', 'How does he feel?', 'What''s the matter with you?', 'Who do you want?', 'B'),
(@t6, 3, 'Would you like anything else?', 'That''s all, thank you.', 'Yes, I like everything.', 'Two, please.', 'A'),
(@t6, 4, 'When is your mother''s birthday?', 'She''s thirty-nine.', 'It was last week.', 'It''s a long time.', 'B'),
(@t6, 5, 'Shall we go to the shops now?', 'I''m too tired.', 'They''re very good.', 'Not at all.', 'A');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 7', 'Test 7', 3);
SET @t7 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t7, 1, 'It''s my sister''s birthday tomorrow!', 'Happy New Year!', 'Is she going to have a party?', 'How old are they?', 'B'),
(@t7, 2, 'Mary will help the teacher.', 'Are you certain?', 'Do you understand?', 'Can you hear?', 'A'),
(@t7, 3, 'I would like to see the doctor.', 'I hope you''ll feel better soon.', 'It hurts a lot.', 'Have you got an appointment?', 'C'),
(@t7, 4, 'Shall we leave now?', 'Have you got time?', 'Near the station?', 'I''d like to stay.', 'C'),
(@t7, 5, 'Anything else?', 'No, it isn''t.', 'Not at all.', 'Not today, thanks.', 'C');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 8', 'Test 8', 3);
SET @t8 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t8, 1, 'When will lunch be ready?', 'Quite soon.', 'It''s soup and toast.', 'I hope you''re hungry.', 'A'),
(@t8, 2, 'It''s very hot in here.', 'Do you feel cold?', 'I''ll turn on the heating.', 'Let''s go outside then.', 'C'),
(@t8, 3, 'Have you met Henry before?', 'Yes, at first.', 'Yes, on holiday.', 'Yes, I do.', 'B'),
(@t8, 4, 'Do you like visiting museums?', 'I''d love to!', 'No, I haven''t.', 'Not really.', 'C'),
(@t8, 5, 'I''ve broken my glasses.', 'Here''s another one.', 'You can''t see.', 'That''s a pity!', 'C');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 9', 'Test 9', 3);
SET @t9 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t9, 1, 'Are you sure the match starts at two?', 'It started well.', 'It''s all right.', 'I think so.', 'C'),
(@t9, 2, 'I saw the new Spielberg film last night.', 'Did I go?', 'Has he come?', 'Was it good?', 'C'),
(@t9, 3, 'How did the accident happen?', 'I can''t go there.', 'I didn''t see it.', 'I don''t know how to.', 'B'),
(@t9, 4, 'Hello, I''d like to speak to Mr Green, please.', 'Sorry, can you say that again?', 'I''m sorry, I''ll call again later.', 'I''m afraid I don''t know.', 'A'),
(@t9, 5, 'May I leave now?', 'When we''ve finished.', 'Until tomorrow.', 'I don''t agree.', 'A');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 10', 'Test 10', 3);
SET @t10 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t10, 1, 'Let''s listen to this new CD.', 'Who''s the singer?', 'It''s in the record shop.', 'I can hear it.', 'A'),
(@t10, 2, 'I''d like two tickets for tonight.', 'I''ll just check for you.', 'Afternoon and evening.', 'How much did you pay?', 'A'),
(@t10, 3, 'What time did the meeting end?', 'In a minute.', 'For half an hour.', 'Just before lunch.', 'C'),
(@t10, 4, 'I can''t do this maths problem.', 'I suppose so.', 'Let me see.', 'Certainly not.', 'B'),
(@t10, 5, 'Do you like Jane''s new flat?', 'I don''t go there.', 'She likes the new house.', 'The rooms are rather small.', 'C');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 11', 'Test 11', 3);
SET @t11 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t11, 1, 'How did you go to Madrid?', 'On Wednesday.', 'By plane.', 'It''s expensive.', 'B'),
(@t11, 2, 'I really must go now!', 'How long is it?', 'Can''t you stay?', 'What time?', 'B'),
(@t11, 3, 'Is Mike still doing his homework?', 'Yes, he does.', 'It''s ready.', 'Let''s ask him.', 'C'),
(@t11, 4, 'I can''t understand this letter.', 'Would you like some help?', 'Don''t you know?', 'I suppose you can.', 'A'),
(@t11, 5, 'Are you sure the film starts at 10?', 'Yes, I am.', 'No, I didn''t.', 'Yes, I do.', 'A');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 12', 'Test 12', 3);
SET @t12 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t12, 1, 'I don''t think I can come to the concert.', 'What time will you arrive?', 'Are you sure you can''t?', 'Do you think you can?', 'B'),
(@t12, 2, 'Let''s have supper now.', 'You aren''t eating.', 'There aren''t any.', 'Bill isn''t here yet.', 'C'),
(@t12, 3, 'Have you shut the windows?', 'I''ll just check.', 'You don''t remember.', 'It isn''t open.', 'A'),
(@t12, 4, 'My street is too noisy.', 'That''s a pity!', 'Do you like it?', 'Be careful!', 'A'),
(@t12, 5, 'Can I speak to John, please?', 'Speaking.', 'It doesn''t matter.', 'How are you?', 'A');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 13', 'Test 13', 3);
SET @t13 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t13, 1, 'Have a good holiday.', 'Thanks, I will.', 'I think so.', 'Yes, very much.', 'A'),
(@t13, 2, 'What about going shopping this afternoon?', 'I''m too tired!', 'What a pity!', 'That''s not right!', 'A'),
(@t13, 3, 'I can''t do my homework.', 'Can you be careful?', 'You can''t have that.', 'Of course you can.', 'C'),
(@t13, 4, 'Which of the boys is your friend?', 'He says I''m right.', 'Yes he is, isn''t he?', 'That one over there.', 'C'),
(@t13, 5, 'I''ve waited here for two hours!', 'Yes you do.', 'I''m sorry about that.', 'It didn''t matter.', 'B');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 14', 'Test 14', 3);
SET @t14 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t14, 1, 'Shall we invite Mary to stay next weekend?', 'You decide.', 'It''s for you.', 'You make it.', 'A'),
(@t14, 2, 'When can we meet again?', 'When are you free?', 'It was two days ago.', 'Can you help me?', 'A'),
(@t14, 3, 'Why don''t we eat out in a restaurant tonight?', 'That''s a good idea.', 'I hope so.', 'What a pity.', 'A'),
(@t14, 4, 'We''ll have to meet outside the stadium.', 'Can you do it?', 'Have you?', 'At what time?', 'C'),
(@t14, 5, 'Can I try this shoe in a larger size, please?', 'That''ll be very nice.', 'Let me check for you.', 'I can''t understand it.', 'B');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 15', 'Test 15', 3);
SET @t15 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t15, 1, 'I loved the book!', 'Did you?', 'Was it?', 'Why not?', 'A'),
(@t15, 2, 'Would you like some water?', 'Yes, of course I do.', 'Yes, with ice, please.', 'Yes, I like it very much.', 'B'),
(@t15, 3, 'I watched a good film last night.', 'What time does it begin?', 'Has it finished yet?', 'What was it called?', 'C'),
(@t15, 4, 'Do you think Peter will like this sweater?', 'He isn''t like that.', 'You are right.', 'I''m sure he will.', 'C'),
(@t15, 5, 'Here, I''ve found your glasses.', 'Well done.', 'That''s all.', 'Never mind.', 'A');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 16', 'Test 16', 3);
SET @t16 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t16, 1, 'It''s too cold today.', 'It''s all day.', 'It will be warmer tomorrow.', 'No, I don''t like it.', 'B'),
(@t16, 2, 'Have you seen John?', 'He''s just gone out.', 'I don''t mind where.', 'He''s happy to do that.', 'A'),
(@t16, 3, 'Please tell Liz I''ll call her again this evening.', 'I haven''t called her.', 'I''ll leave a note.', 'I don''t know.', 'B'),
(@t16, 4, 'Can you all give me your homework now?', 'Not since Friday.', 'It''s easier than mine.', 'I''ve only done one page.', 'C'),
(@t16, 5, 'You''re looking really well.', 'Never mind.', 'Do you think so?', 'It doesn''t matter.', 'B');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 17', 'Test 17', 3);
SET @t17 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t17, 1, 'Hello. This is 245-6780.', 'I''ll call again later.', 'Thank you for your help.', 'I''d like to speak to John, please.', 'C'),
(@t17, 2, 'I''m going to have a party on Saturday.', 'Who will come?', 'Where to?', 'How often is it?', 'A'),
(@t17, 3, 'What do I do at the traffic lights?', 'That''s right.', 'Turn left.', 'You can''t.', 'B'),
(@t17, 4, 'I''ll take these grapes, please.', 'Can I help you?', 'They''re over there.', 'Would you like a bag?', 'C'),
(@t17, 5, 'What colour will you paint the room?', 'I hope it was right.', 'We can''t decide.', 'It wasn''t very difficult.', 'B');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 18', 'Test 18', 3);
SET @t18 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t18, 1, 'Please answer the phone.', 'How are you?', 'Why can''t you?', 'When did he call?', 'B'),
(@t18, 2, 'Would you prefer lemonade or orange juice?', 'Have you got anything else?', 'If you like.', 'Are you sure about that?', 'A'),
(@t18, 3, 'The 9.15 train''s late again.', 'It was never there.', 'It often is.', 'Will it ever be?', 'B'),
(@t18, 4, 'Can you help me with my homework?', 'I don''t understand it.', 'It''s not ready.', 'I can''t help it.', 'A'),
(@t18, 5, 'I thought the play was very boring.', 'Yes, I''d like to.', 'Which did you think?', 'I enjoyed it.', 'C');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 19', 'Test 19', 3);
SET @t19 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t19, 1, 'Which shirt do you prefer?', 'They''re both great.', 'Not so much.', 'It''s too big.', 'A'),
(@t19, 2, 'David isn''t very well.', 'What''s the matter with him?', 'How long does he take?', 'Why did he do it?', 'A'),
(@t19, 3, 'How do you know my sister?', 'We''ll meet outside the cinema.', 'We''re in the same class.', 'She''s got blue eyes.', 'B'),
(@t19, 4, 'I hope Andrew will get here soon.', 'I hope he hasn''t.', 'He usually gets it.', 'I''m sure he will.', 'C'),
(@t19, 5, 'Who phoned me?', 'It''s Anne speaking.', 'Sorry, I forgot to ask.', 'I don''t know your name.', 'B');

INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES ('KET Reading Part 3 - Test 20', 'Test 20', 3);
SET @t20 = LAST_INSERT_ID();
INSERT INTO ket_response_matching_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t20, 1, 'Are you going to get up soon?', 'In a minute.', 'Not long.', 'For ever.', 'A'),
(@t20, 2, 'My aunt is going to stay with me.', 'How do you do?', 'How long for?', 'How was it?', 'B'),
(@t20, 3, 'Did you understand what she was saying?', 'It''s not enough.', 'I''m sure she wasn''t.', 'Not really.', 'C'),
(@t20, 4, 'Nice to meet you, Suzanna.', 'Yes, and you.', 'Yes, I have.', 'I think so.', 'A'),
(@t20, 5, 'Are you free this Tuesday?', 'I can be, if it''s important.', 'Sorry I''m late.', 'Not very often.', 'A');
