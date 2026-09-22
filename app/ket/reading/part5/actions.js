'use server';

// Server Action: chấm điểm Part 5 / Open Cloze (Letter Completion). Tương
// đương OpenClozeController::result(). Đáp án đúng chỉ được đọc ở đây.

import { getTestById, getQuestionsByTestId } from '@/lib/models/opencloze';

const MAX_ANSWER_LENGTH = 30;

export async function submitPart5(testId, submittedAnswers) {
  const test = testId > 0 ? await getTestById(testId) : null;

  if (!test) {
    return { error: 'Không tìm thấy đề thi.' };
  }

  const questionRows = await getQuestionsByTestId(testId);

  let correctCount = 0;
  const review = [];

  for (const question of questionRows) {
    if (Number(question.is_example) === 1) continue; // câu EXAMPLE không tính điểm

    const number = question.question_number;
    let raw = submittedAnswers?.[number] ?? '';
    raw = typeof raw === 'string' ? raw.trim() : '';
    raw = raw.slice(0, MAX_ANSWER_LENGTH); // chặn spam dữ liệu bất thường

    const userAnswerLower = raw.toLowerCase();
    const acceptedAnswers = String(question.correct_answer).split('|').map((a) => a.toLowerCase());
    const isCorrect = raw !== '' && acceptedAnswers.includes(userAnswerLower);

    if (isCorrect) correctCount++;

    review.push({
      question_number: number,
      user_answer: raw,
      correct_answer_display: String(question.correct_answer).replace(/\|/g, ' / '),
      is_correct: isCorrect,
    });
  }

  const total = review.length;
  const wrong = total - correctCount;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 1000) / 10 : 0;

  const reviewByNumber = {};
  for (const item of review) {
    reviewByNumber[item.question_number] = item;
  }

  return { test, total, correct: correctCount, wrong, accuracy, review, reviewByNumber };
}
