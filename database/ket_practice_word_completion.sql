-- ============================================================
-- KET Reading Part 6 (Word Completion) - bổ sung cho database
-- ket_practice. Import file này SAU KHI đã có database ket_practice.
-- File này CHỈ thêm 2 bảng mới, KHÔNG đụng đến các bảng của Part khác.
--
-- Đây KHÔNG phải cùng dạng với Part 3 (Matching Functional Language - chọn
-- phản hồi đúng cho 1 câu nói/câu hỏi, dùng bảng
-- ket_response_matching_tests/questions riêng). Part 6
-- ở đây là dạng "đoán từ": cho 1 câu định nghĩa tiếng Anh, người học gõ
-- đúng 1 từ (gợi ý bằng chữ cái đầu + số chữ cái còn lại, hiển thị ở
-- client, không lưu riêng trong DB vì suy ra được từ correct_answer). Chấm
-- điểm so khớp không phân biệt hoa/thường, giống Part 5 (Open Cloze).
-- ============================================================

USE ket_practice;

CREATE TABLE ket_word_completion_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    test_label VARCHAR(50) NOT NULL DEFAULT '',
    part INT NOT NULL DEFAULT 6,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- question_number đánh số cục bộ 1-5 trong từng đề (giống Part 1/Part 2).
CREATE TABLE ket_word_completion_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    question_number INT NOT NULL,
    question_text VARCHAR(500) NOT NULL,
    correct_answer VARCHAR(50) NOT NULL,
    explanation VARCHAR(500) NULL,
    CONSTRAINT fk_word_completion_questions_test
        FOREIGN KEY (test_id) REFERENCES ket_word_completion_tests(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Dữ liệu mẫu: 20 đề x 5 câu, lấy từ file "part6_24_09_2026.pdf" do admin
-- cung cấp (100 câu Word Completion, đã có sẵn đáp án). Đã nhóm lại thành
-- 20 đề theo đúng chủ đề từ vựng liền mạch trong file gốc (gia đình, quần
-- áo, nghề nghiệp...).
-- ------------------------------------------------------------

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 1: Family', 'Test 1', 6);
SET @t1 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t1, 1, 'This is your mother''s brother.', 'uncle'),
(@t1, 2, 'She is your father''s mother.', 'grandmother'),
(@t1, 3, 'This is a person a man is married to.', 'wife'),
(@t1, 4, 'This is your father''s sister.', 'aunt'),
(@t1, 5, 'If your child is a girl, she is this.', 'daughter');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 2: Hotel and Holiday', 'Test 2', 6);
SET @t2 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t2, 1, 'If you want a room in a hotel, you can phone and do this first.', 'book'),
(@t2, 2, 'When you arrive at a hotel or a campsite, you go here first.', 'reception'),
(@t2, 3, 'You sleep inside this on a campsite.', 'tent'),
(@t2, 4, 'This kind of hotel room is for two people.', 'double'),
(@t2, 5, 'You go here to enjoy the sun and swim in the sea.', 'beach');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 3: In the House', 'Test 3', 6);
SET @t3 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t3, 1, 'People sit round this to eat their meals.', 'table'),
(@t3, 2, 'You can keep your clothes in this.', 'cupboard'),
(@t3, 3, 'You wash yourself with soap and water in this.', 'shower'),
(@t3, 4, 'You look through this to outside.', 'window'),
(@t3, 5, 'People put books or flowers on this.', 'shelf');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 4: Clothes', 'Test 4', 6);
SET @t4 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t4, 1, 'These are often made of leather, and you wear them on your feet.', 'shoes'),
(@t4, 2, 'This is a jacket and trousers in the same colour.', 'suit'),
(@t4, 3, 'This will keep you dry in wet weather.', 'raincoat'),
(@t4, 4, 'When the weather is hot, people often wear these with a T-shirt.', 'shorts'),
(@t4, 5, 'You can put this on over a T-shirt if you feel cold.', 'sweater');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 5: Everyday Items', 'Test 5', 6);
SET @t5 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t5, 1, 'If you lose this, you won''t be able to get into your house.', 'key'),
(@t5, 2, 'Many people put these on when they want to read.', 'glasses'),
(@t5, 3, 'People pay for things with this.', 'money'),
(@t5, 4, 'If it has been windy, you may need to do your hair with this.', 'comb'),
(@t5, 5, 'You write important dates in this so you don''t forget them.', 'diary');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 6: Roads and Traffic', 'Test 6', 6);
SET @t6 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t6, 1, 'Go here when you need petrol for your car.', 'garage'),
(@t6, 2, 'This will take you over a river or another road.', 'bridge'),
(@t6, 3, 'You must show this person your driving licence if he asks for it.', 'policeman'),
(@t6, 4, 'You can go left, right or straight on where two roads meet.', 'crossroads'),
(@t6, 5, 'If these are red, the traffic has to wait.', 'lights');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 7: Party Time', 'Test 7', 6);
SET @t7 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t7, 1, 'You need this if you want to dance.', 'music'),
(@t7, 2, 'If it''s your birthday, your guests may give you this.', 'present'),
(@t7, 3, 'You need this to put your drink in.', 'glass'),
(@t7, 4, 'You can buy this drink in a bottle or a can.', 'lemonade'),
(@t7, 5, 'You hope these people will come to your party.', 'friends');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 8: Geography', 'Test 8', 6);
SET @t8 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t8, 1, 'You may find snow on the top of this all year.', 'mountain'),
(@t8, 2, 'The farmer puts animals or plants here.', 'field'),
(@t8, 3, 'People must cross water to get to this.', 'island'),
(@t8, 4, 'The water in this starts in the hills and runs to the sea.', 'river'),
(@t8, 5, 'Engineers build this to take things in boats.', 'canal');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 9: Things to Read', 'Test 9', 6);
SET @t9 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t9, 1, 'If you don''t understand a word, you can look in this.', 'dictionary'),
(@t9, 2, 'You can buy this every week and read about many interesting subjects in it.', 'magazine'),
(@t9, 3, 'If you write about your daily life in this, you may not want anyone to read it.', 'diary'),
(@t9, 4, 'You write this for your mother when you answer the phone for her.', 'message'),
(@t9, 5, 'People buy this every morning to read about what has happened in the world.', 'newspaper');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 10: Feelings', 'Test 10', 6);
SET @t10 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t10, 1, 'People feel like this when they get good news.', 'happy'),
(@t10, 2, 'If you have worked hard all day, you feel like this.', 'tired'),
(@t10, 3, 'When you have finished playing football, you want to shower because you feel like this.', 'dirty'),
(@t10, 4, 'If people go without a meal all day, they begin to feel like this.', 'hungry'),
(@t10, 5, 'You feel like this if it is hot and there is nothing to drink.', 'thirsty');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 11: On Holiday', 'Test 11', 6);
SET @t11 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t11, 1, 'You may need to show this when you travel to a foreign country.', 'passport'),
(@t11, 2, 'The pictures you take with this will help you remember your holiday.', 'camera'),
(@t11, 3, 'You can sit on this on the beach or use it to dry yourself.', 'towel'),
(@t11, 4, 'Make sure this is big enough to hold all your clothes for your holiday.', 'suitcase'),
(@t11, 5, 'It''s good to read this on the beach or in an aeroplane.', 'magazine');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 12: Food and Cooking', 'Test 12', 6);
SET @t12 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t12, 1, 'Soup is usually put in this.', 'bowl'),
(@t12, 2, 'A carrot or an onion is an example of this.', 'vegetable'),
(@t12, 3, 'If you eat in a restaurant, this person brings your food to you.', 'waiter'),
(@t12, 4, 'You can drink juice from this yellow fruit, but it isn''t sweet.', 'lemon'),
(@t12, 5, 'To make chips, you cut up potatoes, put them in oil and do this.', 'fry');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 13: Hobbies and Leisure', 'Test 13', 6);
SET @t13 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t13, 1, 'If you enjoy camping, you''ll need this to sleep in.', 'tent'),
(@t13, 2, 'People learn to play music on this.', 'guitar'),
(@t13, 3, 'If you like reading stories about pop stars, you may buy this every week.', 'magazine'),
(@t13, 4, 'People who like walking in the forest need these to keep their feet dry.', 'boots'),
(@t13, 5, 'If you enjoy watching films at home, you may need to rent this.', 'video');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 14: Reading and Writing', 'Test 14', 6);
SET @t14 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t14, 1, 'This place has many books for you to read, but you cannot keep them.', 'library'),
(@t14, 2, 'You read this to find what is happening in the world.', 'newspaper'),
(@t14, 3, 'You may need to write this if you answer the phone for another person.', 'message'),
(@t14, 4, 'The teacher writes on this and everyone in the class can see it.', 'board'),
(@t14, 5, 'If you go on holiday, you may write this and send it to a friend.', 'postcard');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 15: Places in Town', 'Test 15', 6);
SET @t15 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t15, 1, 'People can study different things here.', 'college'),
(@t15, 2, 'You can look at very old things here.', 'museum'),
(@t15, 3, 'You may need to buy a ticket before you go onto the platform here.', 'station'),
(@t15, 4, 'In this place, a waiter will bring your meal.', 'restaurant'),
(@t15, 5, 'You can go here to watch a big match.', 'stadium');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 16: Jobs', 'Test 16', 6);
SET @t16 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t16, 1, 'This person lives in the countryside where he grows food and keeps animals.', 'farmer'),
(@t16, 2, 'If you have a problem with your car, this person can repair it.', 'mechanic'),
(@t16, 3, 'This person writes for newspapers.', 'journalist'),
(@t16, 4, 'You speak to this person when you ask for a meal in a restaurant.', 'waiter'),
(@t16, 5, 'This person uses a camera in his work.', 'photographer');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 17: Holiday Again', 'Test 17', 6);
SET @t17 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t17, 1, 'This is where you lie in the sun and go swimming.', 'beach'),
(@t17, 2, 'You can pack all your holiday clothes in this.', 'suitcase'),
(@t17, 3, 'Without this, you cannot go to some countries.', 'passport'),
(@t17, 4, 'This is what you use to dry yourself after you go swimming.', 'towel'),
(@t17, 5, 'You need to put a stamp on this to send it to a friend.', 'postcard');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 18: Places in Town 2', 'Test 18', 6);
SET @t18 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t18, 1, 'You can read books here and take them home too, if you have a special card.', 'library'),
(@t18, 2, 'In this building, you can look at interesting old things.', 'museum'),
(@t18, 3, 'If you don''t want to eat at home, you can buy a meal here.', 'restaurant'),
(@t18, 4, 'Students are taught in classrooms here.', 'college'),
(@t18, 5, 'You can buy a ticket to watch a play here.', 'theatre');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 19: Clothes 2', 'Test 19', 6);
SET @t19 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t19, 1, 'Some boys and girls have to wear this at school.', 'uniform'),
(@t19, 2, 'This is often on a shirt, and you put pens in it.', 'pocket'),
(@t19, 3, 'People wear this in winter when they go outside.', 'coat'),
(@t19, 4, 'This is the top part of a suit for men and women.', 'jacket'),
(@t19, 5, 'You wear these on your feet, inside your shoes.', 'socks');

INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES ('KET Reading Part 6 - Test 20: Countryside', 'Test 20', 6);
SET @t20 = LAST_INSERT_ID();
INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer) VALUES
(@t20, 1, 'People live in this place, but it is not as big as a town.', 'village'),
(@t20, 2, 'It may be quite dark here because there are so many trees.', 'forest'),
(@t20, 3, 'You can walk up and down these, and they are smaller than mountains.', 'hills'),
(@t20, 4, 'There are thousands of different kinds of these, and flies are one example.', 'insects'),
(@t20, 5, 'If there''s a river, you''ll need to walk over this to cross it.', 'bridge');
