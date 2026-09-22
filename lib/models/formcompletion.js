// Model cho KET Reading Part 6 (Form Completion).
// Tương đương app/models/FormQuestion.php. Bảng riêng: ket_form_tests,
// ket_form_fields.

import { query, queryOne, insert } from '@/lib/db';

export async function getTestById(id) {
  return queryOne('SELECT * FROM ket_form_tests WHERE id = ?', [id]);
}

export async function getFieldsByTestId(testId) {
  return query('SELECT * FROM ket_form_fields WHERE test_id = ? ORDER BY field_number', [testId]);
}

export async function getFieldById(id) {
  return queryOne('SELECT * FROM ket_form_fields WHERE id = ?', [id]);
}

export async function createField(testId, fieldNumber, fieldLabel, fieldPrefix, correctAnswer, explanation) {
  return insert(
    `INSERT INTO ket_form_fields (test_id, field_number, field_label, field_prefix, correct_answer, explanation)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [testId, fieldNumber, fieldLabel, fieldPrefix, correctAnswer, explanation]
  );
}

export async function updateField(id, fieldNumber, fieldLabel, fieldPrefix, correctAnswer, explanation) {
  await query(
    `UPDATE ket_form_fields
     SET field_number = ?, field_label = ?, field_prefix = ?, correct_answer = ?, explanation = ?
     WHERE id = ?`,
    [fieldNumber, fieldLabel, fieldPrefix, correctAnswer, explanation, id]
  );
}

export async function deleteField(id) {
  await query('DELETE FROM ket_form_fields WHERE id = ?', [id]);
}

export async function updateTest(
  id,
  title,
  text1Html,
  text1Date,
  text1Signature,
  text2Html,
  text2Signature,
  formTitle
) {
  await query(
    `UPDATE ket_form_tests
     SET title = ?, text1_html = ?, text1_date = ?, text1_signature = ?,
         text2_html = ?, text2_signature = ?, form_title = ?
     WHERE id = ?`,
    [title, text1Html, text1Date, text1Signature, text2Html, text2Signature, formTitle, id]
  );
}
