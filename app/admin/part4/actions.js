'use server';

// Server Actions cho Admin Part 4. Tương đương AdminPart4Controller.php.

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  getTestById,
  getQuestionsByTestId,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  updateTest,
} from '@/lib/models/part4';

const VALID_LETTERS = ['A', 'B', 'C'];
const DEFAULT_TEST_ID = 1;

export async function saveQuestion(formData) {
  const id = Number(formData.get('id') || 0);
  const questionNumber = Number(formData.get('question_number'));
  const optionA = String(formData.get('option_a') || '').trim();
  const optionB = String(formData.get('option_b') || '').trim();
  const optionC = String(formData.get('option_c') || '').trim();
  const correctAnswer = String(formData.get('correct_answer') || '').trim().toUpperCase();

  const errors = [];
  if (!(questionNumber >= 0)) errors.push('Số thứ tự câu hỏi không hợp lệ (0 = example, hoặc số dương).');
  if (optionA === '' || optionB === '' || optionC === '') errors.push('Cả 3 lựa chọn A, B, C đều không được để trống.');
  if (!VALID_LETTERS.includes(correctAnswer)) errors.push('Đáp án đúng phải là A, B hoặc C.');

  if (errors.length > 0) {
    const qs = new URLSearchParams({ error: errors.join(' ') });
    redirect(`/admin/part4/question/${id > 0 ? id : 'new'}?${qs}`);
  }

  const isExample = questionNumber === 0 ? 1 : 0;

  if (id > 0) {
    await updateQuestion(id, questionNumber, optionA, optionB, optionC, correctAnswer, isExample);
  } else {
    await createQuestion(DEFAULT_TEST_ID, questionNumber, optionA, optionB, optionC, correctAnswer, isExample);
  }

  revalidatePath('/admin/part4');
  redirect('/admin/part4?msg=saved');
}

export async function deleteQuestionAction(id) {
  if (id > 0) await deleteQuestion(id);
  revalidatePath('/admin/part4');
  redirect('/admin/part4?msg=deleted');
}

export async function saveTestInfo(formData) {
  const title = String(formData.get('title') || '').trim();
  const passageHtml = String(formData.get('passage_html') || '').trim();

  const errors = [];
  if (title === '') errors.push('Tiêu đề không được để trống.');
  if (passageHtml === '') errors.push('Đoạn văn không được để trống.');

  if (errors.length === 0) {
    const questions = await getQuestionsByTestId(DEFAULT_TEST_ID);
    const missing = [];
    for (const question of questions) {
      const placeholder = `{{${question.question_number}}}`;
      if (!passageHtml.includes(placeholder)) missing.push(placeholder);
    }
    if (missing.length > 0) {
      errors.push(
        'Đoạn văn đang thiếu placeholder: ' +
          missing.join(', ') +
          '. Mỗi câu hỏi hiện có phải có đúng 1 placeholder {{n}} tương ứng trong đoạn văn.'
      );
    }
  }

  if (errors.length > 0) {
    const qs = new URLSearchParams({ error: errors.join(' ') });
    redirect(`/admin/part4/test-info?${qs}`);
  }

  await updateTest(DEFAULT_TEST_ID, title, passageHtml);
  revalidatePath('/admin/part4');
  redirect('/admin/part4?msg=saved');
}
