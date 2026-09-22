'use server';

// Server Actions cho Admin Listening Part 3. Tương đương actions.js của
// Admin Listening Part 1, khác ở chỗ: audio là CỦA ĐỀ (dùng chung cho 5
// câu, upload trong saveTest), còn saveQuestion chỉ xử lý đáp án dạng văn
// bản (không có option_type/image/map). Không có xác thực (giống bản gốc)
// - chỉ dùng khi chạy local.

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { writeFile } from 'fs/promises';
import path from 'path';
import {
  createTest,
  deleteTest,
  updateTest,
  updateTestAudio,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '@/lib/models/listeningPart3';

const VALID_LETTERS = ['A', 'B', 'C'];

const AUDIO_EXTENSIONS = ['mp3', 'wav', 'm4a', 'ogg'];
const AUDIO_MAX_SIZE = 10 * 1024 * 1024;

// Lưu 1 file upload vào public/<folderSegments>/, trả về đường dẫn tương
// đối (không có dấu / đầu) để lưu vào DB, hoặc null nếu không có file mới.
async function saveUploadedFile(file, folderSegments, prefix, allowedExtensions, maxSize, errors, errorLabel) {
  if (!file || typeof file !== 'object' || file.size === 0) return null;

  const extension = (file.name.split('.').pop() || '').toLowerCase();

  if (file.size > maxSize) {
    errors.push(`${errorLabel} quá lớn (tối đa ${Math.round(maxSize / (1024 * 1024))}MB).`);
    return null;
  }
  if (!allowedExtensions.includes(extension)) {
    errors.push(`${errorLabel} không đúng định dạng (${allowedExtensions.join(', ')}).`);
    return null;
  }

  const fileName = `${prefix}_${Date.now()}.${extension}`;
  const destination = path.join(process.cwd(), 'public', ...folderSegments, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(destination, buffer);

  return `${folderSegments.join('/')}/${fileName}`;
}

// ----- Đề (test) -----

export async function saveTest(formData) {
  const id = Number(formData.get('id') || 0);
  const title = String(formData.get('title') || '').trim();
  const ketGroup = String(formData.get('ket_group') || '').trim();
  const testLabel = String(formData.get('test_label') || '').trim();

  if (title === '') {
    const qs = new URLSearchParams({ error: 'Tiêu đề không được để trống.' });
    redirect(`/admin/listening/part3/test/${id > 0 ? id : 'new'}?${qs}`);
  }

  const errors = [];
  const newAudioPath = await saveUploadedFile(
    formData.get('audio'), ['audio', 'listening3'], `t${id || Date.now()}_audio`,
    AUDIO_EXTENSIONS, AUDIO_MAX_SIZE, errors, 'File audio hội thoại'
  );

  if (errors.length > 0) {
    const qs = new URLSearchParams({ error: errors.join(' ') });
    redirect(`/admin/listening/part3/test/${id > 0 ? id : 'new'}?${qs}`);
  }

  if (id > 0) {
    await updateTest(id, title, ketGroup, testLabel);
    if (newAudioPath) await updateTestAudio(id, newAudioPath);
    revalidatePath('/admin/listening/part3');
    redirect(`/admin/listening/part3/manage/${id}?msg=saved`);
  } else {
    const newId = await createTest(title, ketGroup, testLabel);
    if (newAudioPath) await updateTestAudio(newId, newAudioPath);
    revalidatePath('/admin/listening/part3');
    redirect(`/admin/listening/part3/manage/${newId}?msg=created`);
  }
}

export async function deleteTestAction(id) {
  if (id > 0) await deleteTest(id); // FK ON DELETE CASCADE xoá luôn câu hỏi
  revalidatePath('/admin/listening/part3');
  redirect('/admin/listening/part3?msg=deleted');
}

// ----- Câu hỏi -----

export async function saveQuestion(testId, formData) {
  const id = Number(formData.get('id') || 0);
  const questionNumber = Number(formData.get('question_number'));
  const questionText = String(formData.get('question_text') || '').trim();
  const optionA = String(formData.get('option_a') || '').trim();
  const optionB = String(formData.get('option_b') || '').trim();
  const optionC = String(formData.get('option_c') || '').trim();
  const correctAnswer = String(formData.get('correct_answer') || '').trim().toUpperCase();
  const explanation = String(formData.get('explanation') || '').trim();
  const isExample = formData.get('is_example') ? 1 : 0;

  const errors = [];
  if (!Number.isFinite(questionNumber) || questionNumber < 0) errors.push('Số thứ tự câu hỏi không hợp lệ.');
  if (questionText === '') errors.push('Nội dung câu hỏi không được để trống.');
  if (!optionA || !optionB || !optionC) errors.push('Cần nhập đủ nội dung cho cả 3 đáp án A, B, C.');
  if (!VALID_LETTERS.includes(correctAnswer)) errors.push('Đáp án đúng phải là A, B hoặc C.');

  if (errors.length > 0) {
    const qs = new URLSearchParams({ error: errors.join(' ') });
    redirect(`/admin/listening/part3/manage/${testId}/question/${id > 0 ? id : 'new'}?${qs}`);
  }

  const payload = {
    testId,
    questionNumber,
    questionText,
    optionA,
    optionB,
    optionC,
    correctAnswer,
    explanation: explanation || null,
    isExample,
  };

  if (id > 0) {
    await updateQuestion(id, payload);
  } else {
    await createQuestion(payload);
  }

  revalidatePath(`/admin/listening/part3/manage/${testId}`);
  redirect(`/admin/listening/part3/manage/${testId}?msg=saved`);
}

export async function deleteQuestionAction(testId, id) {
  if (id > 0) {
    await deleteQuestion(id);
  }
  revalidatePath(`/admin/listening/part3/manage/${testId}`);
  redirect(`/admin/listening/part3/manage/${testId}?msg=deleted`);
}
