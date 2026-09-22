'use client';

// Client Component: form làm bài Part 1 (Matching). Tương đương phần JS của
// public/js/exam.js + view exam/index.php, cộng thêm hiển thị kết quả tại
// chỗ (không chuyển trang) sau khi Server Action chấm điểm xong.

import { useState } from 'react';
import ScoreSummary from '@/components/ScoreSummary';
import { submitPart1 } from './actions';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export default function Part1Client({ test, questions }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedValues = Object.values(answers).filter((v) => v !== '');

  function handleChange(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const answeredCount = Object.values(answers).filter((v) => v && v !== '').length;
    const used = {};
    let duplicateFound = false;

    for (const value of Object.values(answers)) {
      if (value) {
        if (used[value]) duplicateFound = true;
        used[value] = true;
      }
    }

    if (duplicateFound) {
      alert('Đáp án này đã được sử dụng cho câu khác.');
      return;
    }

    if (answeredCount < questions.length) {
      alert('Vui lòng trả lời đầy đủ ' + questions.length + ' câu.');
      return;
    }

    const confirmed = confirm(
      'Bạn đã trả lời ' + answeredCount + '/' + questions.length + ' câu.\n\nBạn có chắc chắn muốn nộp bài?'
    );
    if (!confirmed) return;

    setSubmitting(true);
    const res = await submitPart1(test.id, answers);
    setSubmitting(false);

    if (res.error) {
      alert(res.error);
      return;
    }

    setResult(res);
  }

  if (result) {
    return (
      <>
        <ScoreSummary correct={result.correct} total={result.total} wrong={result.wrong} accuracy={result.accuracy} />

        <section className="review-list">
          {result.review.map((item) => (
            <div key={item.question_number} className={`review-item ${item.is_correct ? 'correct' : 'wrong'}`}>
              <p className="question-number">Question {item.question_number}</p>
              <p className="question-text">{item.question_text}</p>
              <p>Your answer: {item.user_answer !== '' ? item.user_answer : 'Not answered'}</p>
              <p>Correct answer: {item.correct_answer}</p>
              <p className="review-status">{item.is_correct ? '✓ Correct' : '✗ Wrong'}</p>
              {!item.is_correct && item.explanation && (
                <p className="review-explanation">Explanation: {item.explanation}</p>
              )}
            </div>
          ))}
        </section>

        <a id="retry-btn" href={`/ket/reading/part1?id=${test.id}`}>
          Làm lại
        </a>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="exam-layout">
        <div className="exam-image">
          <img src={`/${test.image}`} alt={test.title} />
        </div>

        <div className="exam-questions">
          {questions.map((question) => {
            const currentValue = answers[question.id] || '';

            return (
              <div className="question-block" key={question.id}>
                <p className="question-number">Question {question.question_number}</p>
                <p className="question-text">{question.question_text}</p>

                <label className="answer-label">
                  Answer:
                  <select
                    className="answer-select"
                    value={currentValue}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  >
                    <option value="">Select answer</option>
                    {LETTERS.map((letter) => (
                      <option
                        key={letter}
                        value={letter}
                        disabled={letter !== currentValue && selectedValues.includes(letter)}
                      >
                        {letter}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            );
          })}

          <button type="submit" id="submit-btn" disabled={submitting}>
            SUBMIT
          </button>
        </div>
      </div>
    </form>
  );
}
