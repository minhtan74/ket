// Model cho KET Reading Part 1 (Matching). Tương đương app/models/Test.php,
// Question.php, Option.php của bản PHP - chỉ truy vấn MySQL, không chứa HTML.

import { query, queryOne, insert } from '@/lib/db';

export async function getTestById(id) {
  return queryOne('SELECT * FROM ket_tests WHERE id = ?', [id]);
}

export async function updateTest(id, title, image) {
  await query('UPDATE ket_tests SET title = ?, image = ? WHERE id = ?', [title, image, id]);
}

export async function getQuestionsByTestId(testId) {
  return query('SELECT * FROM ket_questions WHERE test_id = ? ORDER BY question_number', [testId]);
}

export async function getQuestionById(id) {
  return queryOne('SELECT * FROM ket_questions WHERE id = ?', [id]);
}

export async function createQuestion(testId, questionNumber, questionText, correctAnswer, explanation) {
  return insert(
    'INSERT INTO ket_questions (test_id, question_number, question_text, correct_answer, explanation) VALUES (?, ?, ?, ?, ?)',
    [testId, questionNumber, questionText, correctAnswer, explanation]
  );
}

export async function updateQuestion(id, questionNumber, questionText, correctAnswer, explanation) {
  await query(
    'UPDATE ket_questions SET question_number = ?, question_text = ?, correct_answer = ?, explanation = ? WHERE id = ?',
    [questionNumber, questionText, correctAnswer, explanation, id]
  );
}

export async function deleteQuestion(id) {
  await query('DELETE FROM ket_questions WHERE id = ?', [id]);
}

export async function getOptionsByTestId(testId) {
  return query('SELECT * FROM ket_options WHERE test_id = ? ORDER BY option_letter', [testId]);
}

export async function getOptionById(id) {
  return queryOne('SELECT * FROM ket_options WHERE id = ?', [id]);
}

export async function updateOptionText(id, text) {
  await query('UPDATE ket_options SET option_text = ? WHERE id = ?', [text, id]);
}
