'use server';

// Server Action: chấm điểm Reading Part 2. Chấm toàn bộ 100 câu (không còn
// tách theo từng đề). Đáp án đúng CHỈ được lấy ở đây (server), không bao
// giờ gửi ra client trước đó.

import { getAllQuestions } from '@/lib/models/readingPart2';

const VALID_LETTERS = ['A', 'B', 'C'];

export async function submitPart2(submittedAnswers) {
  const questions = await getAllQuestions();

  let correctCount = 0;
  const review = [];

  questions.forEach((question, i) => {
    let userAnswer = submittedAnswers?.[question.id] ?? '';
    userAnswer = typeof userAnswer === 'string' ? userAnswer.trim().toUpperCase() : '';
    if (!VALID_LETTERS.includes(userAnswer)) userAnswer = '';

    const isCorrect = userAnswer !== '' && userAnswer === question.correct_answer;
    if (isCorrect) correctCount++;

    review.push({
      question_number: i + 1,
      question_text: question.question_text,
      option_a: question.option_a,
      option_b: question.option_b,
      option_c: question.option_c,
      user_answer: userAnswer,
      correct_answer: question.correct_answer,
      is_correct: isCorrect,
      explanation: question.explanation,
    });
  });

  const total = questions.length;
  const wrong = total - correctCount;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 1000) / 10 : 0;

  return { total, correct: correctCount, wrong, accuracy, review };
}
