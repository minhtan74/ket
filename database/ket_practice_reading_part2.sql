-- ============================================================
-- KET Reading Part 2 (Vocabulary - 3-option gap-fill trong 1 đoạn
-- chuyện ngắn 5 câu) - bổ sung cho database ket_practice. Import file
-- này SAU KHI đã có database ket_practice. File này CHỈ thêm 2 bảng mới,
-- KHÔNG đụng đến các bảng của Part khác.
--
-- Khác Part 1 (matching 5 câu với 8 biển báo) và Part 4 (1 đoạn văn dài
-- 8 chỗ trống dùng chung 1 passage), Part 2 là NHIỀU đề, mỗi đề gồm
-- ĐÚNG 5 câu độc lập (mỗi câu 1 câu văn riêng, không dùng chung passage)
-- kể liền mạch một câu chuyện ngắn, mỗi câu có 3 lựa chọn A/B/C - giống
-- hệt cấu trúc ket_questions (Part 1) nhưng thêm option_a/b/c như Part 4.
-- ============================================================

USE ket_practice;

CREATE TABLE ket_reading_part2_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    test_label VARCHAR(50) NOT NULL DEFAULT '',
    part INT NOT NULL DEFAULT 2,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- question_number đánh số cục bộ 1-5 trong từng đề (giống Part 1),
-- không phải số thứ tự toàn cục trong file nguồn.
CREATE TABLE ket_reading_part2_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    question_number INT NOT NULL,
    question_text VARCHAR(500) NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    correct_answer CHAR(1) NOT NULL,
    explanation VARCHAR(500) NULL,
    CONSTRAINT fk_reading_part2_questions_test
        FOREIGN KEY (test_id) REFERENCES ket_reading_part2_tests(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Dữ liệu mẫu: 20 đề x 5 câu, lấy từ file "part_2_24_09_2026.pdf" do admin
-- cung cấp (100 câu hỏi liên tục đã được tách lại thành 20 đề 5 câu, theo
-- đúng mạch chuyện của từng nhóm câu). Đáp án đúng lấy trực tiếp từ PDF
-- gốc (đã có sẵn "Đáp án"), không phải placeholder.
-- ------------------------------------------------------------

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 1: The Zoo', 'Test 1', 2);
SET @t1 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t1, 1, 'He put some biscuits and an apple in a bag for his ______.', 'meat', 'lunch', 'dish', 'B'),
(@t1, 2, 'He took a bus to the zoo and got off outside the ______ entrance.', 'high', 'important', 'main', 'C'),
(@t1, 3, 'He ______ at the monkeys eating some bananas.', 'enjoyed', 'watched', 'laughed', 'C'),
(@t1, 4, 'The lions were sleeping under a tree because it was very ______.', 'hot', 'tired', 'full', 'A'),
(@t1, 5, 'Tim ______ some photos of the elephants.', 'put', 'took', 'made', 'B');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 2: The Swimming Pool', 'Test 2', 2);
SET @t2 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t2, 1, 'Everyone must ______ a shower before they go in the water.', 'do', 'make', 'take', 'C'),
(@t2, 2, 'There are special changing rooms for ______ with young children.', 'brothers', 'parents', 'cousins', 'B'),
(@t2, 3, 'Please ______ to take a towel with you to the pool.', 'know', 'understand', 'remember', 'C'),
(@t2, 4, 'If you are ______, you can get a drink in the snack bar upstairs.', 'dirty', 'thirsty', 'wet', 'B'),
(@t2, 5, 'In the afternoons, there are swimming classes for children of all ______.', 'ages', 'lessons', 'pupils', 'A');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 3: Video Night', 'Test 3', 2);
SET @t3 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t3, 1, '"Let''s get a video and ______ it at my house this evening," she said.', 'look', 'watch', 'listen', 'B'),
(@t3, 2, '"That''s a great ______!" said Jane. "I''ve got nothing else to do."', 'idea', 'thing', 'pity', 'A'),
(@t3, 3, 'They went to the video shop and ______ a film with their favourite actor in it.', 'chose', 'decided', 'thought', 'A'),
(@t3, 4, 'Then they bought some ______ of cola to drink and a big bag of sweets.', 'plates', 'cups', 'cans', 'C'),
(@t3, 5, 'They took everything back to Lisa''s house and ______ the film together.', 'enjoyed', 'laughed', 'liked', 'A');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 4: Cooking with Mum', 'Test 4', 2);
SET @t4 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t4, 1, 'She ______ some fruit and vegetables from the market.', 'bought', 'kept', 'grew', 'A'),
(@t4, 2, 'She cut up some meat and onions and fried them in a pan on the ______.', 'cooker', 'cupboard', 'fridge', 'A'),
(@t4, 3, 'There was a big ______ of salad to eat afterwards.', 'bottle', 'bowl', 'spoon', 'B'),
(@t4, 4, 'When everything was ______, they all sat down at the table.', 'real', 'round', 'ready', 'C'),
(@t4, 5, 'After dinner, Claudia''s parents ______ her to wash up.', 'practised', 'agreed', 'helped', 'C');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 5: Computer Homework', 'Test 5', 2);
SET @t5 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t5, 1, 'He ______ Sam how to use it.', 'learnt', 'showed', 'studied', 'B'),
(@t5, 2, 'Sam sent an e-mail ______ to his friend Billy to tell him about his nice present.', 'message', 'programme', 'form', 'A'),
(@t5, 3, 'Billy came to Sam''s house and they did their geography ______ together.', 'subject', 'homework', 'class', 'B'),
(@t5, 4, 'They were ______ because they found some information about rivers on the internet.', 'happy', 'interesting', 'pleasant', 'A'),
(@t5, 5, 'Afterwards, they ______ playing a new computer game together.', 'wanted', 'thanked', 'enjoyed', 'C');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 6: A New School', 'Test 6', 2);
SET @t6 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t6, 1, 'Sally felt rather ______ because she didn''t know anybody.', 'unhappy', 'poor', 'single', 'A'),
(@t6, 2, 'The teacher ______ Sally to the classroom.', 'put', 'went', 'took', 'C'),
(@t6, 3, 'Sally sat next to a girl with blonde ______ called Amy.', 'eyes', 'teeth', 'hair', 'C'),
(@t6, 4, 'At lunchtime, Amy gave Sally an apple and ______ her all about the school.', 'told', 'learned', 'spoke', 'A'),
(@t6, 5, 'By the end of the afternoon, Amy was Sally''s ______ friend.', 'lovely', 'best', 'excellent', 'B');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 7: Football Boots', 'Test 7', 2);
SET @t7 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t7, 1, 'He ______ a bus to the big department store in the centre of town.', 'travelled', 'went', 'took', 'C'),
(@t7, 2, 'The shoes were on the top ______ near the café.', 'stairs', 'floor', 'room', 'B'),
(@t7, 3, 'The assistant showed Jack several pairs but they were all the ______ size.', 'wrong', 'different', 'big', 'A'),
(@t7, 4, 'Then he ______ on some red and black leather football boots.', 'tried', 'wore', 'chose', 'A'),
(@t7, 5, '"They''re not too ______ so I''ll have them," Jack said.', 'high', 'great', 'expensive', 'C');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 8: Photography Club', 'Test 8', 2);
SET @t8 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t8, 1, 'She hopes to ______ a photographer for a newspaper one day.', 'work', 'become', 'do', 'B'),
(@t8, 2, 'She ______ a photography club to learn more about using a camera.', 'made', 'went', 'joined', 'C'),
(@t8, 3, 'Jane says it''s ______ to take pictures of children or animals because they are always moving.', 'careful', 'hard', 'fast', 'B'),
(@t8, 4, 'There was a ______ about a competition in a photography magazine.', 'notice', 'bill', 'ticket', 'A'),
(@t8, 5, 'Jane ______ the first prize for one of her pictures.', 'won', 'carried', 'caught', 'A');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 9: Dinner Party', 'Test 9', 2);
SET @t9 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t9, 1, 'She ______ all of them to dinner at her house on Saturday evening.', 'phoned', 'invited', 'said', 'B'),
(@t9, 2, 'Louise wrote the things she needed to buy for the meal on a ______ of paper.', 'piece', 'slice', 'part', 'A'),
(@t9, 3, 'She was ______ on Saturday morning, so she went shopping in the afternoon.', 'full', 'busy', 'difficult', 'B'),
(@t9, 4, 'Louise ______ two hours cooking the meal.', 'waited', 'spent', 'passed', 'B'),
(@t9, 5, 'When the meal was ______, everyone sat down to eat.', 'right', 'sure', 'ready', 'C');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 10: In the Kitchen', 'Test 10', 2);
SET @t10 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t10, 1, 'My mother often asks me to ______ up the vegetables for her.', 'put', 'make', 'cut', 'C'),
(@t10, 2, 'Everybody in our family ______ fish to meat.', 'enjoys', 'likes', 'prefers', 'C'),
(@t10, 3, 'Once, I forgot the cooker was hot and ______ my hand.', 'boiled', 'burnt', 'fried', 'B'),
(@t10, 4, 'Cooking a good meal can ______ a long time.', 'spend', 'use', 'take', 'C'),
(@t10, 5, 'At the supermarket, some food like pizza is ______ to cook.', 'right', 'ready', 'free', 'B');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 11: Shopping with Carol', 'Test 11', 2);
SET @t11 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t11, 1, 'Her friend Carol ______ she''d like to go too.', 'said', 'told', 'asked', 'A'),
(@t11, 2, 'At the shopping centre they went up in the ______ to the shops on the second floor.', 'street', 'stairs', 'lift', 'C'),
(@t11, 3, 'Susan tried on some shoes but they were the wrong ______.', 'bad', 'colour', 'dark', 'B'),
(@t11, 4, 'They stopped in a café for a drink and a ______ of cake.', 'part', 'little', 'piece', 'C'),
(@t11, 5, 'The café was ______ but they didn''t have to wait a long time.', 'fast', 'busy', 'late', 'B');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 12: The Concert', 'Test 12', 2);
SET @t12 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t12, 1, 'I finished my classes at 5 and went home to ______ ready for the concert.', 'get', 'come', 'put', 'A'),
(@t12, 2, 'I spent half an hour ______ for the tickets.', 'finding', 'keeping', 'looking', 'C'),
(@t12, 3, 'The concert started at 8 and I didn''t want to arrive ______ for the first band.', 'slowly', 'late', 'soon', 'B'),
(@t12, 4, 'The music was very ______, so I had to shout to my friends.', 'loud', 'bright', 'strong', 'A'),
(@t12, 5, 'I ______ an excellent time at the concert.', 'had', 'made', 'did', 'A');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 13: The Library', 'Test 13', 2);
SET @t13 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t13, 1, 'On Saturdays, a lot of people visit the library where Elena works and it is always ______.', 'busy', 'heavy', 'strong', 'A'),
(@t13, 2, 'The job is ______ because I meet a lot of different people.', 'friendly', 'interesting', 'favourite', 'B'),
(@t13, 3, 'Her job is to ______ all the books when people bring them back.', 'look', 'watch', 'check', 'C'),
(@t13, 4, 'Elena has to put all the books back on the ______ shelf.', 'good', 'possible', 'right', 'C'),
(@t13, 5, 'Sometimes people ______ to return their books on time.', 'think', 'forget', 'mind', 'B');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 14: The Lake', 'Test 14', 2);
SET @t14 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t14, 1, 'Maria likes to ______ a lot of time at the lake.', 'spend', 'keep', 'stay', 'A'),
(@t14, 2, 'The water there is warm and beautifully ______.', 'light', 'clear', 'nice', 'B'),
(@t14, 3, 'In the summer, Maria sometimes ______ swimming in the lake.', 'goes', 'plays', 'wants', 'A'),
(@t14, 4, 'Some beautiful flowers ______ near the lake.', 'stand', 'live', 'grow', 'C'),
(@t14, 5, 'When she goes to the lake, Maria usually takes some ______ with her.', 'food', 'meal', 'dish', 'A');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 15: Teens Plus Club', 'Test 15', 2);
SET @t15 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t15, 1, 'Teens Plus is a club for young adults who want to ______ new friends.', 'do', 'begin', 'make', 'C'),
(@t15, 2, 'Harry joined the club when he ______ to the town.', 'moved', 'changed', 'became', 'A'),
(@t15, 3, 'There is a ______ number of activities to choose from.', 'tall', 'large', 'full', 'B'),
(@t15, 4, 'Last week, everyone went to a restaurant and had a nice ______ together.', 'meal', 'food', 'plate', 'A'),
(@t15, 5, 'Harry has ______ lots of interesting people at the club.', 'learnt', 'met', 'got', 'B');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 16: Horse Riding', 'Test 16', 2);
SET @t16 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t16, 1, 'Sam ______ to ride when he was seven years old.', 'knew', 'practised', 'learnt', 'C'),
(@t16, 2, 'He has to wear a special riding hat to keep himself ______.', 'safe', 'careful', 'sure', 'A'),
(@t16, 3, 'Sam got first ______ at a riding competition last week.', 'time', 'race', 'prize', 'C'),
(@t16, 4, 'He ______ that one day he will have his own horse.', 'wants', 'hopes', 'likes', 'B'),
(@t16, 5, 'Sam is doing a Saturday job to try to ______ enough money to buy his own horse.', 'earn', 'pay', 'spend', 'A');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 17: Football', 'Test 17', 2);
SET @t17 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t17, 1, 'Gloria thinks football is the most ______ sport she plays.', 'favourite', 'interesting', 'nice', 'B'),
(@t17, 2, 'When Gloria plays, she ______ about everything else and just thinks about football.', 'leaves', 'forgets', 'loses', 'B'),
(@t17, 3, 'After school, Gloria ______ on her football boots and plays with her friends.', 'runs', 'changes', 'puts', 'C'),
(@t17, 4, 'When Gloria is older, she hopes that she can ______ some money from playing football.', 'earn', 'bring', 'take', 'A'),
(@t17, 5, 'One day Gloria wants to play football for her ______ in the World Cup.', 'country', 'nationality', 'group', 'A');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 18: University', 'Test 18', 2);
SET @t18 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t18, 1, 'Sarah is doing a four-year ______ in Business Studies.', 'class', 'lesson', 'course', 'C'),
(@t18, 2, 'The university secretary was there to ______ all the new students.', 'invite', 'speak', 'welcome', 'C'),
(@t18, 3, 'On the first day, Sarah ______ some of her new teachers.', 'met', 'knew', 'remembered', 'A'),
(@t18, 4, 'Today, Sarah is ______ reading her business books.', 'correct', 'useful', 'busy', 'C'),
(@t18, 5, 'Next month, Sarah is hoping to ______ the university swimming club.', 'play', 'join', 'become', 'B');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 19: A Restaurant Job', 'Test 19', 2);
SET @t19 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t19, 1, 'Indira has to ______ the customers and take them to a table.', 'welcome', 'arrive', 'invite', 'A'),
(@t19, 2, 'The customers ______ what they want to eat and Indira writes it down in a notebook.', 'speak', 'ask', 'choose', 'C'),
(@t19, 3, 'Indira can ______ any extra money which customers leave for her on the table.', 'change', 'keep', 'check', 'B'),
(@t19, 4, 'If Indira has lunch at the restaurant, she doesn''t have to ______ for her food.', 'buy', 'spend', 'pay', 'C'),
(@t19, 5, 'In a few years, Indira ______ to study Food Science at university.', 'hopes', 'likes', 'decides', 'A');

INSERT INTO ket_reading_part2_tests (title, test_label, part) VALUES ('KET Reading Part 2 - Test 20: A Birthday Present', 'Test 20', 2);
SET @t20 = LAST_INSERT_ID();
INSERT INTO ket_reading_part2_questions (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer) VALUES
(@t20, 1, 'Michael didn''t ______ what kind of present to get his sister.', 'think', 'know', 'understand', 'B'),
(@t20, 2, 'His sister liked ______ photographs but she already had a camera.', 'making', 'putting', 'taking', 'C'),
(@t20, 3, 'He wanted to get her a TV but that meant spending too much ______.', 'money', 'price', 'cost', 'A'),
(@t20, 4, 'He asked a friend to help because the problem was making him ______.', 'afraid', 'unhappy', 'difficult', 'B'),
(@t20, 5, 'Michael''s sister told him it didn''t ______ what present he gave her.', 'prefer', 'mind', 'matter', 'C');
