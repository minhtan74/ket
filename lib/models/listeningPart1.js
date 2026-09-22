// Model cho KET Listening Part 1 (Picture/Text Multiple Choice). Bảng riêng:
// ket_listening_tests, ket_listening_questions - không đụng bảng Reading.

import { query, queryOne, insert } from '@/lib/db';

export async function getAllTests() {
  return query(
    `SELECT t.*, (SELECT COUNT(*) FROM ket_listening_questions q WHERE q.test_id = t.id AND q.is_example = 0) AS question_count
     FROM ket_listening_tests t
     ORDER BY t.id`
  );
}

export async function getTestById(id) {
  return queryOne('SELECT * FROM ket_listening_tests WHERE id = ?', [id]);
}

export async function createTest(title, ketGroup, testLabel) {
  return insert(
    'INSERT INTO ket_listening_tests (title, ket_group, test_label, part) VALUES (?, ?, ?, 1)',
    [title, ketGroup, testLabel]
  );
}

export async function updateTest(id, title, ketGroup, testLabel) {
  await query(
    'UPDATE ket_listening_tests SET title = ?, ket_group = ?, test_label = ? WHERE id = ?',
    [title, ketGroup, testLabel, id]
  );
}

export async function deleteTest(id) {
  await query('DELETE FROM ket_listening_tests WHERE id = ?', [id]); // FK ON DELETE CASCADE xoá luôn câu hỏi
}

export async function getQuestionsByTestId(testId) {
  return query('SELECT * FROM ket_listening_questions WHERE test_id = ? ORDER BY question_number', [testId]);
}

export async function getQuestionById(id) {
  return queryOne('SELECT * FROM ket_listening_questions WHERE id = ?', [id]);
}

export async function createQuestion(data) {
  const {
    testId, questionNumber, questionText, audioPath, optionType,
    optionA, optionB, optionC, sharedImage, correctAnswer, explanation, isExample,
  } = data;

  return insert(
    `INSERT INTO ket_listening_questions
      (test_id, question_number, question_text, audio_path, option_type, option_a, option_b, option_c, shared_image, correct_answer, explanation, is_example)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [testId, questionNumber, questionText, audioPath, optionType, optionA, optionB, optionC, sharedImage ?? null, correctAnswer, explanation, isExample]
  );
}

export async function updateQuestion(id, data) {
  const {
    questionNumber, questionText, audioPath, optionType,
    optionA, optionB, optionC, sharedImage, correctAnswer, explanation, isExample,
  } = data;

  await query(
    `UPDATE ket_listening_questions
     SET question_number = ?, question_text = ?, audio_path = ?, option_type = ?,
         option_a = ?, option_b = ?, option_c = ?, shared_image = ?, correct_answer = ?, explanation = ?, is_example = ?
     WHERE id = ?`,
    [questionNumber, questionText, audioPath, optionType, optionA, optionB, optionC, sharedImage ?? null, correctAnswer, explanation, isExample, id]
  );
}

export async function deleteQuestion(id) {
  await query('DELETE FROM ket_listening_questions WHERE id = ?', [id]);
}
