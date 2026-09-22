'use client';

// Client Component: form làm bài Part 6 (Form Completion). Tương đương
// public/js/formcompletion.js + view formcompletion/index.php + result.php.

import { useState } from 'react';
import ScoreSummary from '@/components/ScoreSummary';
import { submitPart6 } from './actions';

export default function Part6Client({ test, fields }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(number, value) {
    setAnswers((prev) => ({ ...prev, [number]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const filledCount = Object.values(answers).filter((v) => v && v.trim() !== '').length;

    if (filledCount < fields.length) {
      alert('Vui lòng điền đầy đủ ' + fields.length + ' câu.');
      return;
    }

    const confirmed = confirm(
      'Bạn đã điền ' + filledCount + '/' + fields.length + ' câu.\n\nBạn có chắc chắn muốn nộp bài?'
    );
    if (!confirmed) return;

    setSubmitting(true);
    const res = await submitPart6(test.id, answers);
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
            <div key={item.field_number} className={`review-item ${item.is_correct ? 'correct' : 'wrong'}`}>
              <p className="question-number">
                {item.field_number}. {item.field_label}
              </p>
              <p>
                Your answer:{' '}
                {item.user_answer === ''
                  ? 'Not answered'
                  : `${item.field_prefix || ''}${item.user_answer}`}
              </p>
              <p>
                Correct answer: {item.field_prefix || ''}
                {item.correct_answer_display}
              </p>
              <p className="review-status">{item.is_correct ? '✓ Correct' : '✗ Wrong'}</p>
              {item.explanation && <p className="review-explanation">Explanation: {item.explanation}</p>}
            </div>
          ))}
        </section>

        <a id="retry-btn" href={`/ket/reading/part6?id=${test.id}`}>
          Làm lại
        </a>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="fc-texts">
        <div className="fc-letter">
          <p className="fc-letter-date">{test.text1_date}</p>
          <div className="fc-letter-body">
            {test.text1_html.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </div>
          <p className="oc-signature">{test.text1_signature}</p>
        </div>

        <div className="fc-note">
          <div className="fc-note-body">
            {test.text2_html.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </div>
          <p className="oc-signature">{test.text2_signature}</p>
        </div>
      </div>

      <div className="fc-form-box">
        <h2 className="fc-form-title">{test.form_title}</h2>

        <div className="fc-form-row fc-form-row-static">
          <span className="fc-form-label">Student&apos;s name:</span>
          <span className="fc-form-static-value">Suzanna Taylor</span>
        </div>

        {fields.map((field) => (
          <div className="fc-form-row" key={field.field_number}>
            <span className="fc-form-number">{field.field_number}</span>
            <span className="fc-form-label">{field.field_label}</span>
            <span className="fc-form-input-wrap">
              {field.field_prefix && <span className="fc-form-prefix">{field.field_prefix}</span>}
              <input
                type="text"
                className="fc-input"
                maxLength={40}
                autoComplete="off"
                value={answers[field.field_number] || ''}
                onChange={(e) => handleChange(field.field_number, e.target.value)}
              />
            </span>
          </div>
        ))}
      </div>

      <button type="submit" id="submit-btn" disabled={submitting}>
        SUBMIT
      </button>
    </form>
  );
}
