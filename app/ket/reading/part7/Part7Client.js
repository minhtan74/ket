'use client';

// Client Component: form làm bài Part 7 (Complete the Letter(s)). Tương đương
// public/js/part7.js (phần form + hints toggle) + view part7/index.php + result.php.

import { useState } from 'react';
import ScoreSummary from '@/components/ScoreSummary';
import LetterBody from '@/components/LetterBody';
import { submitPart7 } from './actions';

export default function Part7Client({ test, letters, questionsByNumber, blankCount, hints }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [hintsOpen, setHintsOpen] = useState(false);

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
    const res = await submitPart7(test.id, answers);
    setSubmitting(false);

    if (res.error) {
      alert(res.error);
      return;
    }

    setResult(res);
  }

  function renderLetter(letter, index, mode) {
    return (
      <div className="oc-letter" key={index}>
        {letter.dateline && <p className="p7-dateline">{letter.dateline}</p>}
        {letter.salutation && <p className="p7-salutation">{letter.salutation}</p>}
        <LetterBody
          rawHtml={letter.body_html}
          questionsByNumber={questionsByNumber}
          mode={mode}
          answers={answers}
          onChange={handleChange}
          reviewByNumber={result?.reviewByNumber}
        />
        {letter.closing && <p className="p7-closing">{letter.closing}</p>}
        <p className="oc-signature">{letter.signature}</p>
      </div>
    );
  }

  if (result) {
    return (
      <>
        <ScoreSummary correct={result.correct} total={result.total} wrong={result.wrong} accuracy={result.accuracy} />

        {letters.map((letter, i) => renderLetter(letter, i, 'review'))}

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

        <a id="retry-btn" href={`/ket/reading/part7?id=${test.id}`}>
          Làm lại
        </a>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="p7-layout">
        <div className="p7-letters">
          {letters.map((letter, i) => renderLetter(letter, i, 'input'))}

          <button type="submit" id="submit-btn" disabled={submitting}>
            SUBMIT
          </button>
        </div>

        <aside className="p7-hints-column">
          <button type="button" className="p7-hints-btn" onClick={() => setHintsOpen((v) => !v)}>
            💡 Gợi ý / Hiện đáp án gợi ý
          </button>
          <div className={`p7-hints-panel${hintsOpen ? '' : ' hidden'}`}>
            <h3>Gợi ý (41&ndash;50)</h3>
            <ul className="p7-hints-list">
              {hints.map((hint) => (
                <li key={hint.question_number}>
                  <span className="p7-hint-num">{hint.question_number}.</span> <span>{hint.answer}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </form>
  );
}
