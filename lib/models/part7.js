// Model cho KET Reading Part 7 (Complete the Letter(s)).
// Tương đương app/models/Part7Question.php. Bảng riêng: ket_part7_tests,
// ket_part7_letters, ket_part7_questions. Hỗ trợ nhiều đề (khác Part 5 chỉ 1 đề).

import { query, queryOne, insert } from '@/lib/db';

export async function getTestById(id) {
  return queryOne('SELECT * FROM ket_part7_tests WHERE id = ?', [id]);
}

export async function getLettersByTestId(testId) {
  return query('SELECT * FROM ket_part7_letters WHERE test_id = ? ORDER BY letter_order', [testId]);
}

export async function getQuestionsByTestId(testId) {
  return query('SELECT * FROM ket_part7_questions WHERE test_id = ? ORDER BY question_number', [testId]);
}

// ================= Dùng cho Admin (quản lý nhiều đề) =================

export async function getAllTests() {
  return query(
    `SELECT t.*,
        (SELECT COUNT(*) FROM ket_part7_letters l WHERE l.test_id = t.id) AS letter_count,
        (SELECT COUNT(*) FROM ket_part7_questions q WHERE q.test_id = t.id AND q.is_example = 0) AS question_count
     FROM ket_part7_tests t
     ORDER BY t.id`
  );
}

export async function createTest(title, ketGroup, testLabel, instructions) {
  return insert(
    'INSERT INTO ket_part7_tests (title, ket_group, test_label, instructions) VALUES (?, ?, ?, ?)',
    [title, ketGroup, testLabel, instructions]
  );
}

export async function updateTest(id, title, ketGroup, testLabel, instructions) {
  await query(
    'UPDATE ket_part7_tests SET title = ?, ket_group = ?, test_label = ?, instructions = ? WHERE id = ?',
    [title, ketGroup, testLabel, instructions, id]
  );
}

export async function deleteTest(id) {
  await query('DELETE FROM ket_part7_tests WHERE id = ?', [id]); // FK ON DELETE CASCADE xoá luôn thư + câu hỏi
}

export async function getLetterById(id) {
  return queryOne('SELECT * FROM ket_part7_letters WHERE id = ?', [id]);
}

export async function createLetter(testId, letterOrder, dateline, salutation, bodyHtml, closing, signature) {
  return insert(
    `INSERT INTO ket_part7_letters (test_id, letter_order, dateline, salutation, body_html, closing, signature)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [testId, letterOrder, dateline, salutation, bodyHtml, closing, signature]
  );
}

export async function updateLetter(id, letterOrder, dateline, salutation, bodyHtml, closing, signature) {
  await query(
    `UPDATE ket_part7_letters
     SET letter_order = ?, dateline = ?, salutation = ?, body_html = ?, closing = ?, signature = ?
     WHERE id = ?`,
    [letterOrder, dateline, salutation, bodyHtml, closing, signature, id]
  );
}

export async function deleteLetter(id) {
  await query('DELETE FROM ket_part7_letters WHERE id = ?', [id]);
}

export async function getQuestionById(id) {
  return queryOne('SELECT * FROM ket_part7_questions WHERE id = ?', [id]);
}

export async function createQuestion(testId, questionNumber, correctAnswer, isExample, note = null) {
  return insert(
    'INSERT INTO ket_part7_questions (test_id, question_number, correct_answer, is_example, note) VALUES (?, ?, ?, ?, ?)',
    [testId, questionNumber, correctAnswer, isExample, note]
  );
}

export async function updateQuestion(id, questionNumber, correctAnswer, isExample, note = null) {
  await query(
    'UPDATE ket_part7_questions SET question_number = ?, correct_answer = ?, is_example = ?, note = ? WHERE id = ?',
    [questionNumber, correctAnswer, isExample, note, id]
  );
}

export async function deleteQuestion(id) {
  await query('DELETE FROM ket_part7_questions WHERE id = ?', [id]);
}
