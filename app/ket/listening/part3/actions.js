'use server';

// Server Action: chấm điểm Listening Part 3. Tương đương actions.js của
// Listening Part 1, chỉ khác là không có audio_path/option_type riêng cho
// từng câu (audio dùng chung nằm ở test).

import { getTestById, getQuestionsByTestId } from '@/lib/models/listeningPart3';

const VALID_LETTERS = ['A', 'B', 'C'];

export async function submitListeningPart3(testId, submittedAnswers) {
  const test = testId > 0 ? await getTestById(testId) : null;

  if (!test) {
    return { error: 'Không tìm thấy đề thi.' };
  }

  const rows = await getQuestionsByTestId(testId);
  const questions = rows.filter((q) => !q.is_example);

  let correctCount = 0;
  const review = [];

  for (const question of questions) {
    let userAnswer = submittedAnswers?.[question.id] ?? '';
    userAnswer = typeof userAnswer === 'string' ? userAnswer.trim().toUpperCase() : '';
    if (!VALID_LETTERS.includes(userAnswer)) userAnswer = '';

    const isCorrect = userAnswer !== '' && userAnswer === question.correct_answer;
    if (isCorrect) correctCount++;

    review.push({
      question_number: question.question_number,
      question_text: question.question_text,
      option_a: question.option_a,
      option_b: question.option_b,
      option_c: question.option_c,
      user_answer: userAnswer,
      correct_answer: question.correct_answer,
      is_correct: isCorrect,
      explanation: question.explanation,
    });
  }

  const total = questions.length;
  const wrong = total - correctCount;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 1000) / 10 : 0;

  return { test, total, correct: correctCount, wrong, accuracy, review };
}
