'use server';

// Server Actions cho Admin Listening Part 1. Tương đương AdminController.php.
// Không có xác thực (giống bản gốc) - chỉ dùng khi chạy local.

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { writeFile } from 'fs/promises';
import path from 'path';
import {
  createTest,
  deleteTest,
  updateTest,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '@/lib/models/listeningPart1';

const VALID_LETTERS = ['A', 'B', 'C'];

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
const IMAGE_MAX_SIZE = 5 * 1024 * 1024;
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
    redirect(`/admin/listening/part1/test/${id > 0 ? id : 'new'}?${qs}`);
  }

  if (id > 0) {
    await updateTest(id, title, ketGroup, testLabel);
    revalidatePath('/admin/listening/part1');
    redirect(`/admin/listening/part1/manage/${id}?msg=saved`);
  } else {
    const newId = await createTest(title, ketGroup, testLabel);
    revalidatePath('/admin/listening/part1');
    redirect(`/admin/listening/part1/manage/${newId}?msg=created`);
  }
}

export async function deleteTestAction(id) {
  if (id > 0) await deleteTest(id); // FK ON DELETE CASCADE xoá luôn câu hỏi
  revalidatePath('/admin/listening/part1');
  redirect('/admin/listening/part1?msg=deleted');
}

// ----- Câu hỏi -----

export async function saveQuestion(testId, formData) {
  const id = Number(formData.get('id') || 0);
  const questionNumber = Number(formData.get('question_number'));
  const questionText = String(formData.get('question_text') || '').trim();
  const rawOptionType = formData.get('option_type');
  const optionType = ['image', 'map'].includes(rawOptionType) ? rawOptionType : 'text';
  const correctAnswer = String(formData.get('correct_answer') || '').trim().toUpperCase();
  const explanation = String(formData.get('explanation') || '').trim();
  const isExample = formData.get('is_example') ? 1 : 0;

  const errors = [];
  if (!Number.isFinite(questionNumber) || questionNumber < 0) errors.push('Số thứ tự câu hỏi không hợp lệ.');
  if (questionText === '') errors.push('Nội dung câu hỏi không được để trống.');
  if (!VALID_LETTERS.includes(correctAnswer)) errors.push('Đáp án đúng phải là A, B hoặc C.');

  const existing = id > 0 ? await getQuestionById(id) : null;

  let optionA = existing?.option_a ?? '';
  let optionB = existing?.option_b ?? '';
  let optionC = existing?.option_c ?? '';
  let sharedImage = existing?.shared_image ?? null;
  let audioPath = existing?.audio_path ?? null;

  const newAudioPath = await saveUploadedFile(
    formData.get('audio'), ['audio', 'listening1'], `t${testId}_q${questionNumber || id || Date.now()}_audio`,
    AUDIO_EXTENSIONS, AUDIO_MAX_SIZE, errors, 'File audio'
  );
  if (newAudioPath) audioPath = newAudioPath;

  if (optionType === 'image') {
    const letterFields = [
      ['A', 'option_a_image'],
      ['B', 'option_b_image'],
      ['C', 'option_c_image'],
    ];
    for (const [letter, formKey] of letterFields) {
      const newPath = await saveUploadedFile(
        formData.get(formKey), ['images', 'listening1'], `t${testId}_q${questionNumber || id || Date.now()}_${letter}`,
        IMAGE_EXTENSIONS, IMAGE_MAX_SIZE, errors, `Ảnh đáp án ${letter}`
      );
      if (newPath) {
        if (letter === 'A') optionA = newPath;
        if (letter === 'B') optionB = newPath;
        if (letter === 'C') optionC = newPath;
      }
    }
    if (!optionA || !optionB || !optionC) errors.push('Cần có đủ ảnh cho cả 3 đáp án A, B, C.');
  } else if (optionType === 'map') {
    // Chỉ 1 ảnh dùng chung (sơ đồ/bản đồ đã có sẵn nhãn A/B/C bên trong).
    // option_a/b/c chỉ là placeholder để hiển thị nút chọn A/B/C.
    optionA = 'A';
    optionB = 'B';
    optionC = 'C';

    const newSharedImage = await saveUploadedFile(
      formData.get('shared_image'), ['images', 'listening1'], `t${testId}_q${questionNumber || id || Date.now()}_map`,
      IMAGE_EXTENSIONS, IMAGE_MAX_SIZE, errors, 'Ảnh sơ đồ/bản đồ'
    );
    if (newSharedImage) sharedImage = newSharedImage;
    if (!sharedImage) errors.push('Cần tải lên 1 ảnh sơ đồ/bản đồ dùng chung.');
  } else {
    optionA = String(formData.get('option_a_text') || '').trim();
    optionB = String(formData.get('option_b_text') || '').trim();
    optionC = String(formData.get('option_c_text') || '').trim();
    if (!optionA || !optionB || !optionC) errors.push('Cần nhập đủ nội dung cho cả 3 đáp án A, B, C.');
  }

  if (optionType !== 'map') sharedImage = null;

  if (errors.length > 0) {
    const qs = new URLSearchParams({ error: errors.join(' ') });
    redirect(`/admin/listening/part1/manage/${testId}/question/${id > 0 ? id : 'new'}?${qs}`);
  }

  const payload = {
    testId,
    questionNumber,
    questionText,
    audioPath,
    optionType,
    optionA,
    optionB,
    optionC,
    sharedImage,
    correctAnswer,
    explanation: explanation || null,
    isExample,
  };

  if (id > 0) {
    await updateQuestion(id, payload);
  } else {
    await createQuestion(payload);
  }

  revalidatePath(`/admin/listening/part1/manage/${testId}`);
  redirect(`/admin/listening/part1/manage/${testId}?msg=saved`);
}

export async function deleteQuestionAction(testId, id) {
  if (id > 0) {
    await deleteQuestion(id);
  }
  revalidatePath(`/admin/listening/part1/manage/${testId}`);
  redirect(`/admin/listening/part1/manage/${testId}?msg=deleted`);
}
