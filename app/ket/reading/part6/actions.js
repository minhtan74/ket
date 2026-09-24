'use server';

// Server Action: chấm điểm Reading Part 6 (Word Completion). Chấm toàn bộ
// 100 câu (không còn tách theo từng đề). So khớp không phân biệt hoa/thường,
// giống Part 5 (Open Cloze). Đáp án đúng CHỈ được lấy ở đây (server), không
// bao giờ gửi ra client trước đó.

import { getAllQuestions } from '@/lib/models/wordCompletion';

const MAX_ANSWER_LENGTH = 30;

export async function submitPart6(submittedAnswers) {
  const questions = await getAllQuestions();

  let correctCount = 0;
  const review = [];

  questions.forEach((question, i) => {
    let raw = submittedAnswers?.[question.id] ?? '';
    raw = typeof raw === 'string' ? raw.trim() : '';
    raw = raw.slice(0, MAX_ANSWER_LENGTH);

    const isCorrect = raw !== '' && raw.toLowerCase() === question.correct_answer.toLowerCase();
    if (isCorrect) correctCount++;

    review.push({
      question_number: i + 1,
      question_text: question.question_text,
      user_answer: raw,
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
