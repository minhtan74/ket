// Model cho KET Reading Part 4 (Multiple Choice Cloze).
// Tương đương app/models/ClozeQuestion.php. Bảng riêng: ket_cloze_tests,
// ket_cloze_questions - không đụng bảng của Part 1.

import { query, queryOne, insert } from '@/lib/db';

export async function getTestById(id) {
  return queryOne('SELECT * FROM ket_cloze_tests WHERE id = ?', [id]);
}

export async function updateTest(id, title, passageHtml) {
  await query('UPDATE ket_cloze_tests SET title = ?, passage_html = ? WHERE id = ?', [title, passageHtml, id]);
}

export async function getQuestionsByTestId(testId) {
  return query('SELECT * FROM ket_cloze_questions WHERE test_id = ? ORDER BY question_number', [testId]);
}

export async function getQuestionById(id) {
  return queryOne('SELECT * FROM ket_cloze_questions WHERE id = ?', [id]);
}

export async function createQuestion(testId, questionNumber, optionA, optionB, optionC, correctAnswer, isExample) {
  return insert(
    `INSERT INTO ket_cloze_questions (test_id, question_number, option_a, option_b, option_c, correct_answer, is_example)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [testId, questionNumber, optionA, optionB, optionC, correctAnswer, isExample]
  );
}

export async function updateQuestion(id, questionNumber, optionA, optionB, optionC, correctAnswer, isExample) {
  await query(
    `UPDATE ket_cloze_questions
     SET question_number = ?, option_a = ?, option_b = ?, option_c = ?, correct_answer = ?, is_example = ?
     WHERE id = ?`,
    [questionNumber, optionA, optionB, optionC, correctAnswer, isExample, id]
  );
}

export async function deleteQuestion(id) {
  await query('DELETE FROM ket_cloze_questions WHERE id = ?', [id]);
}
