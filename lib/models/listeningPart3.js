// Model cho KET Listening Part 3 (Multiple choice - 1 hội thoại dùng chung).
// Bảng riêng: ket_listening_part3_tests, ket_listening_part3_questions -
// không đụng bảng Reading hay Listening Part 1.

import { query, queryOne, insert } from '@/lib/db';

export async function getAllTests() {
  return query(
    `SELECT t.*, (SELECT COUNT(*) FROM ket_listening_part3_questions q WHERE q.test_id = t.id AND q.is_example = 0) AS question_count
     FROM ket_listening_part3_tests t
     ORDER BY t.id`
  );
}

export async function getTestById(id) {
  return queryOne('SELECT * FROM ket_listening_part3_tests WHERE id = ?', [id]);
}

export async function createTest(title, ketGroup, testLabel) {
  return insert(
    'INSERT INTO ket_listening_part3_tests (title, ket_group, test_label, part) VALUES (?, ?, ?, 3)',
    [title, ketGroup, testLabel]
  );
}

export async function updateTest(id, title, ketGroup, testLabel) {
  await query(
    'UPDATE ket_listening_part3_tests SET title = ?, ket_group = ?, test_label = ? WHERE id = ?',
    [title, ketGroup, testLabel, id]
  );
}

export async function updateTestAudio(id, audioPath) {
  await query('UPDATE ket_listening_part3_tests SET audio_path = ? WHERE id = ?', [audioPath, id]);
}

export async function deleteTest(id) {
  await query('DELETE FROM ket_listening_part3_tests WHERE id = ?', [id]); // FK ON DELETE CASCADE xoá luôn câu hỏi
}

export async function getQuestionsByTestId(testId) {
  return query('SELECT * FROM ket_listening_part3_questions WHERE test_id = ? ORDER BY question_number', [testId]);
}

export async function getQuestionById(id) {
  return queryOne('SELECT * FROM ket_listening_part3_questions WHERE id = ?', [id]);
}

export async function createQuestion(data) {
  const { testId, questionNumber, questionText, optionA, optionB, optionC, correctAnswer, explanation, isExample } = data;

  return insert(
    `INSERT INTO ket_listening_part3_questions
      (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer, explanation, is_example)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [testId, questionNumber, questionText, optionA, optionB, optionC, correctAnswer, explanation, isExample]
  );
}

export async function updateQuestion(id, data) {
  const { questionNumber, questionText, optionA, optionB, optionC, correctAnswer, explanation, isExample } = data;

  await query(
    `UPDATE ket_listening_part3_questions
     SET question_number = ?, question_text = ?, option_a = ?, option_b = ?, option_c = ?, correct_answer = ?, explanation = ?, is_example = ?
     WHERE id = ?`,
    [questionNumber, questionText, optionA, optionB, optionC, correctAnswer, explanation, isExample, id]
  );
}

export async function deleteQuestion(id) {
  await query('DELETE FROM ket_listening_part3_questions WHERE id = ?', [id]);
}
