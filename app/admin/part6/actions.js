'use server';

// Server Actions cho Admin Part 6. Tương đương AdminFormCompletionController.php.

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createField, updateField, deleteField, updateTest } from '@/lib/models/formcompletion';

const DEFAULT_TEST_ID = 1;

export async function saveField(formData) {
  const id = Number(formData.get('id') || 0);
  const fieldNumber = Number(formData.get('field_number') || 0);
  const fieldLabel = String(formData.get('field_label') || '').trim();
  const fieldPrefix = String(formData.get('field_prefix') || '').trim();
  const correctAnswer = String(formData.get('correct_answer') || '').trim();
  const explanation = String(formData.get('explanation') || '').trim();

  const errors = [];
  if (fieldNumber <= 0) errors.push('Số thứ tự field không hợp lệ.');
  if (fieldLabel === '') errors.push('Label không được để trống.');
  if (correctAnswer === '') errors.push('Đáp án đúng không được để trống (nhiều đáp án cách nhau bởi "|").');

  if (errors.length > 0) {
    const qs = new URLSearchParams({ error: errors.join(' ') });
    redirect(`/admin/part6/field/${id > 0 ? id : 'new'}?${qs}`);
  }

  const prefixOrNull = fieldPrefix !== '' ? fieldPrefix : null;

  if (id > 0) {
    await updateField(id, fieldNumber, fieldLabel, prefixOrNull, correctAnswer, explanation || null);
  } else {
    await createField(DEFAULT_TEST_ID, fieldNumber, fieldLabel, prefixOrNull, correctAnswer, explanation || null);
  }

  revalidatePath('/admin/part6');
  redirect('/admin/part6?msg=saved');
}

export async function deleteFieldAction(id) {
  if (id > 0) await deleteField(id);
  revalidatePath('/admin/part6');
  redirect('/admin/part6?msg=deleted');
}

export async function saveTestInfo(formData) {
  const title = String(formData.get('title') || '').trim();
  const text1Html = String(formData.get('text1_html') || '').trim();
  const text1Date = String(formData.get('text1_date') || '').trim();
  const text1Signature = String(formData.get('text1_signature') || '').trim();
  const text2Html = String(formData.get('text2_html') || '').trim();
  const text2Signature = String(formData.get('text2_signature') || '').trim();
  const formTitle = String(formData.get('form_title') || '').trim();

  const errors = [];
  if (title === '') errors.push('Tiêu đề đề thi không được để trống.');
  if (text1Html === '') errors.push('Nội dung thư (văn bản 1) không được để trống.');
  if (text1Date === '') errors.push('Ngày của thư không được để trống.');
  if (text1Signature === '') errors.push('Chữ ký thư không được để trống.');
  if (text2Html === '') errors.push('Nội dung note (văn bản 2) không được để trống.');
  if (text2Signature === '') errors.push('Chữ ký note không được để trống.');
  if (formTitle === '') errors.push('Tiêu đề form không được để trống.');

  if (errors.length > 0) {
    const qs = new URLSearchParams({ error: errors.join(' ') });
    redirect(`/admin/part6/test-info?${qs}`);
  }

  await updateTest(DEFAULT_TEST_ID, title, text1Html, text1Date, text1Signature, text2Html, text2Signature, formTitle);
  revalidatePath('/admin/part6');
  redirect('/admin/part6?msg=saved');
}
