'use server';

// Server Action: chấm điểm Part 4 (Multiple Choice Cloze). Tương đương
// Part4Controller::result(). Đáp án đúng chỉ được đọc ở đây.

import { getTestById, getQuestionsByTestId } from '@/lib/models/part4';

const VALID_LETTERS = ['A', 'B', 'C'];

export async function submitPart4(testId, submittedAnswers) {
  const test = testId > 0 ? await getTestById(testId) : null;

  if (!test || Number(test.part) !== 4) {
    return { error: 'Không tìm thấy đề thi.' };
  }

  const questions = await getQuestionsByTestId(testId);

  let correctCount = 0;
  const review = [];

  for (const question of questions) {
    if (Number(question.is_example) === 1) continue; // câu EXAMPLE không tính điểm

    const number = question.question_number;
    let raw = submittedAnswers?.[number] ?? '';
    raw = typeof raw === 'string' ? raw.trim().toUpperCase() : '';

    if (!VALID_LETTERS.includes(raw)) raw = '';

    const correctAnswer = question.correct_answer;
    const isCorrect = raw !== '' && raw === correctAnswer;
    if (isCorrect) correctCount++;

    review.push({
      question_number: number,
      option_a: question.option_a,
      option_b: question.option_b,
      option_c: question.option_c,
      user_answer: raw,
      correct_answer: correctAnswer,
      is_correct: isCorrect,
    });
  }

  const total = review.length;
  const wrong = total - correctCount;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 1000) / 10 : 0;

  return { test, total, correct: correctCount, wrong, accuracy, review };
}
