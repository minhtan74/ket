'use client';

// Client Component: form làm bài Part 4 (Multiple Choice Cloze). Tương đương
// public/js/part4.js + view part4/index.php (đoạn văn với <select> nội dòng).

import { useState } from 'react';
import ScoreSummary from '@/components/ScoreSummary';
import { splitByBlanks } from '@/lib/parseBlanks';
import { submitPart4 } from './actions';

export default function Part4Client({ test, questionsByNumber, blankCount }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const segments = splitByBlanks(test.passage_html);

  function handleChange(number, value) {
    setAnswers((prev) => ({ ...prev, [number]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const answeredCount = Object.values(answers).filter((v) => v && v !== '').length;

    if (answeredCount < blankCount) {
      alert('Vui lòng trả lời đầy đủ ' + blankCount + ' câu.');
      return;
    }

    const confirmed = confirm(
      'Bạn đã trả lời ' + answeredCount + '/' + blankCount + ' câu.\n\nBạn có chắc chắn muốn nộp bài?'
    );
    if (!confirmed) return;

    setSubmitting(true);
    const res = await submitPart4(test.id, answers);
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
              <p className="question-text">
                A. {item.option_a} &nbsp;&nbsp; B. {item.option_b} &nbsp;&nbsp; C. {item.option_c}
              </p>
              <p>Your answer: {item.user_answer !== '' ? item.user_answer : 'Not answered'}</p>
              <p>Correct answer: {item.correct_answer}</p>
              <p className="review-status">{item.is_correct ? '✓ Correct' : '✗ Wrong'}</p>
            </div>
          ))}
        </section>

        <a id="retry-btn" href={`/ket/reading/part4?id=${test.id}`}>
          Làm lại
        </a>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="cloze-passage">
        {segments.map((segment, index) => {
          if (segment.type === 'text') {
            return <span key={index}>{segment.value}</span>;
          }

          const question = questionsByNumber[segment.number];
          if (!question) return null;

          if (question.is_example) {
            return (
              <span key={index}>
                <span className="cloze-example-badge">EXAMPLE</span>
                <select className="cloze-select cloze-example" disabled value={question.correct_answer}>
                  <option value="A">{question.option_a}</option>
                  <option value="B">{question.option_b}</option>
                  <option value="C">{question.option_c}</option>
                </select>
              </span>
            );
          }

          const currentValue = answers[segment.number] || '';

          return (
            <select
              key={index}
              className="cloze-select"
              value={currentValue}
              onChange={(e) => handleChange(segment.number, e.target.value)}
            >
              <option value="">{segment.number}</option>
              <option value="A">{question.option_a}</option>
              <option value="B">{question.option_b}</option>
              <option value="C">{question.option_c}</option>
            </select>
          );
        })}
      </div>

      <button type="submit" id="submit-btn" disabled={submitting}>
        SUBMIT
      </button>
    </form>
  );
}
