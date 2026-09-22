'use client';

// Client Component: form làm bài Part 5 (Open Cloze). Tương đương
// public/js/opencloze.js + view opencloze/index.php + opencloze/result.php.

import { useState } from 'react';
import ScoreSummary from '@/components/ScoreSummary';
import LetterBody from '@/components/LetterBody';
import { submitPart5 } from './actions';

export default function OpenClozeClient({ test, questionsByNumber, blankCount }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(number, value) {
    setAnswers((prev) => ({ ...prev, [number]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const filledCount = Object.values(answers).filter((v) => v && v.trim() !== '').length;

    if (filledCount < blankCount) {
      alert('Vui lòng điền đầy đủ ' + blankCount + ' câu.');
      return;
    }

    const confirmed = confirm(
      'Bạn đã điền ' + filledCount + '/' + blankCount + ' câu.\n\nBạn có chắc chắn muốn nộp bài?'
    );
    if (!confirmed) return;

    setSubmitting(true);
    const res = await submitPart5(test.id, answers);
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

        <p className="cloze-instructions">
          Di chuột vào từ được tô màu để xem đáp án đúng. Xanh = đúng, đỏ = sai.
        </p>

        <div className="oc-letter">
          <LetterBody
            rawHtml={test.letter1_html}
            questionsByNumber={questionsByNumber}
            mode="review"
            reviewByNumber={result.reviewByNumber}
          />
          <p className="oc-signature">{test.letter1_signature}</p>
        </div>

        <div className="oc-letter">
          <LetterBody
            rawHtml={test.letter2_html}
            questionsByNumber={questionsByNumber}
            mode="review"
            reviewByNumber={result.reviewByNumber}
          />
          <p className="oc-signature">{test.letter2_signature}</p>
        </div>

        <section className="review-list">
          {result.review.map((item) => (
            <div key={item.question_number} className={`review-item ${item.is_correct ? 'correct' : 'wrong'}`}>
              <p className="question-number">Question {item.question_number}</p>
              <p>Your answer: {item.user_answer !== '' ? item.user_answer : 'Not answered'}</p>
              <p>Correct answer: {item.correct_answer_display}</p>
              <p className="review-status">{item.is_correct ? '✓ Correct' : '✗ Wrong'}</p>
            </div>
          ))}
        </section>

        <a id="retry-btn" href={`/ket/reading/part5?id=${test.id}`}>
          Làm lại
        </a>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="oc-letter">
        <LetterBody
          rawHtml={test.letter1_html}
          questionsByNumber={questionsByNumber}
          mode="input"
          answers={answers}
          onChange={handleChange}
        />
        <p className="oc-signature">{test.letter1_signature}</p>
      </div>

      <div className="oc-letter">
        <LetterBody
          rawHtml={test.letter2_html}
          questionsByNumber={questionsByNumber}
          mode="input"
          answers={answers}
          onChange={handleChange}
        />
        <p className="oc-signature">{test.letter2_signature}</p>
      </div>

      <button type="submit" id="submit-btn" disabled={submitting}>
        SUBMIT
      </button>
    </form>
  );
}
