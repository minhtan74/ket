'use server';

// Server Action: chấm điểm Part 1 (Matching). Tương đương ResultController.php.
// Đáp án đúng CHỈ được lấy ở đây (server), không bao giờ gửi ra client trước đó.

import { getTestById, getQuestionsByTestId } from '@/lib/models/part1';

const VALID_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export async function submitPart1(testId, submittedAnswers) {
  const test = testId > 0 ? await getTestById(testId) : null;

  if (!test || Number(test.part) !== 1) {
    return { error: 'Không tìm thấy đề thi.' };
  }

  const questions = await getQuestionsByTestId(testId);

  // ----- Bước 1: làm sạch dữ liệu, chỉ chấp nhận A-H -----
  const cleanAnswers = {};
  const usedLetters = {};

  for (const question of questions) {
    let raw = submittedAnswers?.[question.id] ?? '';
    raw = typeof raw === 'string' ? raw.trim().toUpperCase() : '';

    if (!VALID_LETTERS.includes(raw)) {
      raw = '';
    }

    cleanAnswers[question.id] = raw;

    if (raw !== '') {
      usedLetters[raw] = (usedLetters[raw] || 0) + 1;
    }
  }

  // ----- Bước 2: mỗi đáp án chỉ được dùng một lần -----
  for (const count of Object.values(usedLetters)) {
    if (count > 1) {
      return { error: 'Đáp án này đã được sử dụng cho câu khác.' };
    }
  }

  // ----- Bước 3: chấm điểm -----
  let correctCount = 0;
  const review = [];

  for (const question of questions) {
    const userAnswer = cleanAnswers[question.id];
    const correctAnswer = question.correct_answer;
    const isCorrect = userAnswer !== '' && userAnswer === correctAnswer;

    if (isCorrect) correctCount++;

    review.push({
      question_number: question.question_number,
      question_text: question.question_text,
      user_answer: userAnswer,
      correct_answer: correctAnswer,
      is_correct: isCorrect,
      explanation: question.explanation,
    });
  }

  const total = questions.length;
  const wrong = total - correctCount;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 1000) / 10 : 0;

  return { test, total, correct: correctCount, wrong, accuracy, review };
}
