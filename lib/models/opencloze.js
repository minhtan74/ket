// Model cho KET Reading/Writing Part 5 (Open Cloze - Letter Completion).
// Tương đương app/models/OpenClozeQuestion.php. Bảng riêng: ket_opencloze_tests,
// ket_opencloze_questions. KHÔNG có Admin CRUD (bản PHP gốc cũng không có).

import { query, queryOne } from '@/lib/db';

export async function getTestById(id) {
  return queryOne('SELECT * FROM ket_opencloze_tests WHERE id = ?', [id]);
}

export async function getQuestionsByTestId(testId) {
  return query('SELECT * FROM ket_opencloze_questions WHERE test_id = ? ORDER BY question_number', [testId]);
}
