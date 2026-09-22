'use server';

// Server Action: chấm điểm Part 6 (Form Completion). Tương đương
// FormCompletionController::result(). Đáp án đúng chỉ được đọc ở đây.

import { getTestById, getFieldsByTestId } from '@/lib/models/formcompletion';

const MAX_ANSWER_LENGTH = 40;

function normalize(text) {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

function matchesAnyAnswer(userAnswer, acceptedAnswers) {
  const normalizedUser = normalize(userAnswer);
  return acceptedAnswers.some((accepted) => normalize(accepted) === normalizedUser);
}

export async function submitPart6(testId, submittedAnswers) {
  const test = testId > 0 ? await getTestById(testId) : null;

  if (!test) {
    return { error: 'Không tìm thấy đề thi.' };
  }

  const fields = await getFieldsByTestId(testId);

  let correctCount = 0;
  const review = [];

  for (const field of fields) {
    const number = field.field_number;
    let raw = submittedAnswers?.[number] ?? '';
    raw = typeof raw === 'string' ? raw.trim() : '';
    raw = raw.slice(0, MAX_ANSWER_LENGTH);

    const acceptedAnswers = String(field.correct_answer).split('|');
    const isCorrect = raw !== '' && matchesAnyAnswer(raw, acceptedAnswers);
    if (isCorrect) correctCount++;

    review.push({
      field_number: number,
      field_label: field.field_label,
      field_prefix: field.field_prefix,
      user_answer: raw,
      correct_answer_display: String(field.correct_answer).replace(/\|/g, ' / '),
      is_correct: isCorrect,
      explanation: field.explanation,
    });
  }

  const total = review.length;
  const wrong = total - correctCount;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 1000) / 10 : 0;

  return { test, total, correct: correctCount, wrong, accuracy, review };
}
