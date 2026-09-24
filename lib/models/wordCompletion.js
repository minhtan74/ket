// Model cho KET Reading Part 6 (Word Completion - đoán từ từ định nghĩa).
// Bảng riêng: ket_word_completion_tests, ket_word_completion_questions -
// không đụng bảng của Part khác (khác Part 3 - Matching Functional
// Language, dùng bảng ket_response_matching_tests/questions).

import { query, queryOne, insert } from '@/lib/db';

export async function getAllTests() {
  return query(
    `SELECT t.*, (SELECT COUNT(*) FROM ket_word_completion_questions q WHERE q.test_id = t.id) AS question_count
     FROM ket_word_completion_tests t
     ORDER BY t.id`
  );
}

export async function getTestById(id) {
  return queryOne('SELECT * FROM ket_word_completion_tests WHERE id = ?', [id]);
}

export async function createTest(title, testLabel) {
  return insert(
    'INSERT INTO ket_word_completion_tests (title, test_label, part) VALUES (?, ?, 6)',
    [title, testLabel]
  );
}

export async function updateTest(id, title, testLabel) {
  await query('UPDATE ket_word_completion_tests SET title = ?, test_label = ? WHERE id = ?', [title, testLabel, id]);
}

export async function deleteTest(id) {
  await query('DELETE FROM ket_word_completion_tests WHERE id = ?', [id]); // FK ON DELETE CASCADE xoá luôn câu hỏi
}

export async function getQuestionsByTestId(testId) {
  return query('SELECT * FROM ket_word_completion_questions WHERE test_id = ? ORDER BY question_number', [testId]);
}

// Gộp toàn bộ câu hỏi của mọi đề thành 1 danh sách liền mạch (100 câu),
// giữ đúng thứ tự gốc trong file nguồn (test_id tăng dần, rồi question_number).
export async function getAllQuestions() {
  return query(
    `SELECT q.* FROM ket_word_completion_questions q
     JOIN ket_word_completion_tests t ON t.id = q.test_id
     ORDER BY t.id, q.question_number`
  );
}

export async function getQuestionById(id) {
  return queryOne('SELECT * FROM ket_word_completion_questions WHERE id = ?', [id]);
}

export async function createQuestion(data) {
  const { testId, questionNumber, questionText, correctAnswer, explanation } = data;

  return insert(
    `INSERT INTO ket_word_completion_questions (test_id, question_number, question_text, correct_answer, explanation)
     VALUES (?, ?, ?, ?, ?)`,
    [testId, questionNumber, questionText, correctAnswer, explanation]
  );
}

export async function updateQuestion(id, data) {
  const { questionNumber, questionText, correctAnswer, explanation } = data;

  await query(
    `UPDATE ket_word_completion_questions
     SET question_number = ?, question_text = ?, correct_answer = ?, explanation = ?
     WHERE id = ?`,
    [questionNumber, questionText, correctAnswer, explanation, id]
  );
}

export async function deleteQuestion(id) {
  await query('DELETE FROM ket_word_completion_questions WHERE id = ?', [id]);
}
