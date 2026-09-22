'use server';

// Server Actions cho Admin Part 1. Tương đương AdminController.php.
// Không có xác thực (giống bản gốc) - chỉ dùng khi chạy local.

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { writeFile } from 'fs/promises';
import path from 'path';
import {
  getTestById,
  updateTest,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  updateOptionText,
} from '@/lib/models/part1';

const VALID_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const DEFAULT_TEST_ID = 1;

export async function saveQuestion(formData) {
  const id = Number(formData.get('id') || 0);
  const questionNumber = Number(formData.get('question_number') || 0);
  const questionText = String(formData.get('question_text') || '').trim();
  const correctAnswer = String(formData.get('correct_answer') || '').trim().toUpperCase();
  const explanation = String(formData.get('explanation') || '').trim();

  const errors = [];
  if (questionNumber <= 0) errors.push('Số thứ tự câu hỏi không hợp lệ.');
  if (questionText === '') errors.push('Nội dung câu hỏi không được để trống.');
  if (!VALID_LETTERS.includes(correctAnswer)) errors.push('Đáp án đúng phải là một chữ cái từ A đến H.');

  if (errors.length > 0) {
    const qs = new URLSearchParams({ error: errors.join(' ') });
    redirect(`/admin/part1/question/${id > 0 ? id : 'new'}?${qs}`);
  }

  if (id > 0) {
    await updateQuestion(id, questionNumber, questionText, correctAnswer, explanation || null);
  } else {
    await createQuestion(DEFAULT_TEST_ID, questionNumber, questionText, correctAnswer, explanation || null);
  }

  revalidatePath('/admin/part1');
  redirect('/admin/part1?msg=saved');
}

export async function deleteQuestionAction(id) {
  if (id > 0) {
    await deleteQuestion(id);
  }
  revalidatePath('/admin/part1');
  redirect('/admin/part1?msg=deleted');
}

export async function saveOption(id, formData) {
  const text = String(formData.get('option_text') || '').trim();

  if (text === '') {
    const qs = new URLSearchParams({ error: 'Nội dung đáp án không được để trống.' });
    redirect(`/admin/part1/option/${id}?${qs}`);
  }

  await updateOptionText(id, text);
  revalidatePath('/admin/part1');
  redirect('/admin/part1?msg=saved');
}

export async function saveTestInfo(formData) {
  const title = String(formData.get('title') || '').trim();
  const test = await getTestById(DEFAULT_TEST_ID);
  let image = test.image;

  const errors = [];
  if (title === '') errors.push('Tiêu đề không được để trống.');

  const file = formData.get('image');
  if (file && typeof file === 'object' && file.size > 0) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const maxSize = 5 * 1024 * 1024;
    const extension = (file.name.split('.').pop() || '').toLowerCase();

    if (file.size > maxSize) {
      errors.push('Ảnh quá lớn (tối đa 5MB).');
    } else if (!allowedExtensions.includes(extension)) {
      errors.push('Chỉ chấp nhận ảnh JPG, PNG hoặc GIF.');
    } else {
      const fileName = `test1_${Date.now()}.${extension}`;
      const destination = path.join(process.cwd(), 'public', 'images', 'part1', fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(destination, buffer);
      image = `images/part1/${fileName}`;
    }
  }

  if (errors.length > 0) {
    const qs = new URLSearchParams({ error: errors.join(' ') });
    redirect(`/admin/part1/test-info?${qs}`);
  }

  await updateTest(DEFAULT_TEST_ID, title, image);
  revalidatePath('/admin/part1');
  redirect('/admin/part1?msg=saved');
}
