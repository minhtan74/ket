// Model cho KET Reading Part 3 (Matching Functional Language - chọn phản
// hồi đúng cho 1 câu nói/câu hỏi). Bảng riêng: ket_response_matching_tests,
// ket_response_matching_questions - không đụng bảng của Part khác.

import { query, queryOne, insert } from '@/lib/db';

export async function getAllTests() {
  return query(
    `SELECT t.*, (SELECT COUNT(*) FROM ket_response_matching_questions q WHERE q.test_id = t.id) AS question_count
     FROM ket_response_matching_tests t
     ORDER BY t.id`
  );
}

export async function getTestById(id) {
  return queryOne('SELECT * FROM ket_response_matching_tests WHERE id = ?', [id]);
}

export async function createTest(title, testLabel) {
  return insert(
    'INSERT INTO ket_response_matching_tests (title, test_label, part) VALUES (?, ?, 3)',
    [title, testLabel]
  );
}

export async function updateTest(id, title, testLabel) {
  await query('UPDATE ket_response_matching_tests SET title = ?, test_label = ? WHERE id = ?', [title, testLabel, id]);
}

export async function deleteTest(id) {
  await query('DELETE FROM ket_response_matching_tests WHERE id = ?', [id]); // FK ON DELETE CASCADE xoá luôn câu hỏi
}

export async function getQuestionsByTestId(testId) {
  return query('SELECT * FROM ket_response_matching_questions WHERE test_id = ? ORDER BY question_number', [testId]);
}

// Gộp toàn bộ câu hỏi của mọi đề thành 1 danh sách liền mạch (100 câu),
// giữ đúng thứ tự gốc trong file nguồn (test_id tăng dần, rồi question_number).
export async function getAllQuestions() {
  return query(
    `SELECT q.* FROM ket_response_matching_questions q
     JOIN ket_response_matching_tests t ON t.id = q.test_id
     ORDER BY t.id, q.question_number`
  );
}

export async function getQuestionById(id) {
  return queryOne('SELECT * FROM ket_response_matching_questions WHERE id = ?', [id]);
}

export async function createQuestion(data) {
  const { testId, questionNumber, questionText, optionA, optionB, optionC, correctAnswer, explanation } = data;

  return insert(
    `INSERT INTO ket_response_matching_questions
      (test_id, question_number, question_text, option_a, option_b, option_c, correct_answer, explanation)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [testId, questionNumber, questionText, optionA, optionB, optionC, correctAnswer, explanation]
  );
}

export async function updateQuestion(id, data) {
  const { questionNumber, questionText, optionA, optionB, optionC, correctAnswer, explanation } = data;

  await query(
    `UPDATE ket_response_matching_questions
     SET question_number = ?, question_text = ?, option_a = ?, option_b = ?, option_c = ?, correct_answer = ?, explanation = ?
     WHERE id = ?`,
    [questionNumber, questionText, optionA, optionB, optionC, correctAnswer, explanation, id]
  );
}

export async function deleteQuestion(id) {
  await query('DELETE FROM ket_response_matching_questions WHERE id = ?', [id]);
}
