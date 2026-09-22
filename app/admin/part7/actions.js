'use server';

// Server Actions cho Admin Part 7. Tương đương AdminPart7Controller.php.

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  createTest,
  updateTest,
  deleteTest,
  createLetter,
  updateLetter,
  deleteLetter,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '@/lib/models/part7';

// ----- Đề (test) -----

export async function saveTest(formData) {
  const id = Number(formData.get('id') || 0);
  const title = String(formData.get('title') || '').trim();
  const ketGroup = String(formData.get('ket_group') || '').trim();
  const testLabel = String(formData.get('test_label') || '').trim();
  const instructions = String(formData.get('instructions') || '').trim();

  if (title === '') {
    const qs = new URLSearchParams({ error: 'Tiêu đề không được để trống.' });
    redirect(`/admin/part7/test/${id > 0 ? id : 'new'}?${qs}`);
  }

  if (id > 0) {
    await updateTest(id, title, ketGroup, testLabel, instructions);
    revalidatePath('/admin/part7');
    redirect(`/admin/part7/manage/${id}?msg=saved`);
  } else {
    const newId = await createTest(title, ketGroup, testLabel, instructions);
    revalidatePath('/admin/part7');
    redirect(`/admin/part7/manage/${newId}?msg=created`);
  }
}

export async function deleteTestAction(id) {
  if (id > 0) await deleteTest(id); // FK ON DELETE CASCADE xoá luôn thư + câu hỏi
  revalidatePath('/admin/part7');
  redirect('/admin/part7?msg=deleted');
}

// ----- Thư (letter) -----

export async function saveLetter(testId, formData) {
  const id = Number(formData.get('id') || 0);
  const letterOrder = Number(formData.get('letter_order') || 0);
  const dateline = String(formData.get('dateline') || '').trim();
  const salutation = String(formData.get('salutation') || '').trim();
  const bodyHtml = String(formData.get('body_html') || '').trim();
  const closing = String(formData.get('closing') || '').trim();
  const signature = String(formData.get('signature') || '').trim();

  const errors = [];
  if (letterOrder <= 0) errors.push('Thứ tự thư phải là số dương (1, 2...).');
  if (salutation === '') errors.push('Lời chào đầu thư không được để trống.');
  if (bodyHtml === '') errors.push('Nội dung thư không được để trống.');
  if (closing === '') errors.push('Lời chào cuối thư không được để trống.');
  if (signature === '') errors.push('Chữ ký không được để trống.');

  if (errors.length > 0) {
    const qs = new URLSearchParams({ error: errors.join(' ') });
    redirect(`/admin/part7/manage/${testId}/letter/${id > 0 ? id : 'new'}?${qs}`);
  }

  const datelineOrNull = dateline !== '' ? dateline : null;

  if (id > 0) {
    await updateLetter(id, letterOrder, datelineOrNull, salutation, bodyHtml, closing, signature);
  } else {
    await createLetter(testId, letterOrder, datelineOrNull, salutation, bodyHtml, closing, signature);
  }

  revalidatePath(`/admin/part7/manage/${testId}`);
  redirect(`/admin/part7/manage/${testId}?msg=saved`);
}

export async function deleteLetterAction(testId, id) {
  if (id > 0) await deleteLetter(id);
  revalidatePath(`/admin/part7/manage/${testId}`);
  redirect(`/admin/part7/manage/${testId}?msg=deleted`);
}

// ----- Câu hỏi -----

export async function saveQuestion(testId, formData) {
  const id = Number(formData.get('id') || 0);
  const questionNumber = Number(formData.get('question_number'));
  const correctAnswer = String(formData.get('correct_answer') || '').trim();
  const note = String(formData.get('note') || '').trim();

  const errors = [];
  if (!(questionNumber >= 0)) errors.push('Số thứ tự câu hỏi không hợp lệ (0 = example, hoặc số dương).');
  if (correctAnswer === '') errors.push('Đáp án đúng không được để trống (nhiều đáp án cách nhau bởi "|").');

  if (errors.length > 0) {
    const qs = new URLSearchParams({ error: errors.join(' ') });
    redirect(`/admin/part7/manage/${testId}/question/${id > 0 ? id : 'new'}?${qs}`);
  }

  const isExample = questionNumber === 0 ? 1 : 0;
  const noteOrNull = note !== '' ? note : null;

  if (id > 0) {
    await updateQuestion(id, questionNumber, correctAnswer, isExample, noteOrNull);
  } else {
    await createQuestion(testId, questionNumber, correctAnswer, isExample, noteOrNull);
  }

  revalidatePath(`/admin/part7/manage/${testId}`);
  redirect(`/admin/part7/manage/${testId}?msg=saved`);
}

export async function deleteQuestionAction(testId, id) {
  if (id > 0) await deleteQuestion(id);
  revalidatePath(`/admin/part7/manage/${testId}`);
  redirect(`/admin/part7/manage/${testId}?msg=deleted`);
}
