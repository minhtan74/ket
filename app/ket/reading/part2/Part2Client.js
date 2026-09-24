'use client';

// Client Component: form làm bài Reading Part 2. Giống Listening Part 3 ở
// phần đáp án A/B/C dạng bảng tick ô vuông, nhưng KHÔNG có audio dùng chung
// và không có câu Example. Cảnh báo trước khi rời trang nếu chưa nộp bài.

import { useEffect, useRef, useState } from 'react';
import ScoreSummary from '@/components/ScoreSummary';
import { submitPart2 } from './actions';

const LETTERS = ['A', 'B', 'C'];

function TickRow({ letter, value, selected, disabled, status, onSelect }) {
  const classNames = ['tickbox-row'];
  if (selected) classNames.push('selected');
  if (status === 'correct') classNames.push('tickbox-correct');
  if (status === 'wrong') classNames.push('tickbox-wrong');

  return (
    <label className={classNames.join(' ')}>
      <input type="radio" checked={selected} onChange={() => !disabled && onSelect(letter)} disabled={disabled} />
      <span className="tickbox-letter">{letter}</span>
      <span className="tickbox-text">{value}</span>
      <span className="tickbox-box" aria-hidden="true">
        {selected && <span className="tickbox-check">✓</span>}
      </span>
      {status === 'correct' && <span className="tickbox-status-icon correct">✓</span>}
      {status === 'wrong' && <span className="tickbox-status-icon wrong">✗</span>}
    </label>
  );
}

export default function Part2Client({ questions }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const questionRefs = useRef({});

  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const totalCount = questions.length;

  useEffect(() => {
    if (result) return undefined;

    function handleBeforeUnload(e) {
      e.preventDefault();
      e.returnValue = '';
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [result]);

  function handleSelect(questionId, letter) {
    setAnswers((prev) => ({ ...prev, [questionId]: letter }));
  }

  function scrollToQuestion(key) {
    questionRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  async function handleSubmit() {
    const confirmMessage =
      answeredCount < totalCount
        ? `Bạn mới trả lời ${answeredCount}/${totalCount} câu.\n\nBạn có chắc chắn muốn nộp bài?`
        : `Bạn đã trả lời ${answeredCount}/${totalCount} câu.\n\nBạn có chắc chắn muốn nộp bài?`;

    if (!confirm(confirmMessage)) return;

    setSubmitting(true);
    const res = await submitPart2(answers);
    setSubmitting(false);

    setResult(res);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

              <div className="tickbox-table">
                {LETTERS.map((letter) => {
                  const value = item[`option_${letter.toLowerCase()}`];
                  let status = null;
                  if (letter === item.correct_answer) status = 'correct';
                  else if (letter === item.user_answer) status = 'wrong';

                  return (
                    <TickRow
                      key={letter}
                      letter={letter}
                      value={value}
                      selected={letter === item.user_answer}
                      disabled
                      status={status}
                      onSelect={() => {}}
                    />
                  );
                })}
              </div>

              <p className="review-status">{item.is_correct ? '✓ Correct' : '✗ Wrong'}</p>
              {!item.is_correct && item.explanation && <p className="review-explanation">Explanation: {item.explanation}</p>}
            </div>
          ))}
        </section>

        <a id="retry-btn" href="/ket/reading/part2">
          Làm lại
        </a>
      </>
    );
  }

  return (
    <div className="listen-exam">
      <div className="listen-progress-bar">
        <div className="listen-progress-text">
          Đã trả lời: <strong>{answeredCount}/{totalCount}</strong> câu
        </div>
        <div className="listen-progress-track">
          <div className="listen-progress-fill" style={{ width: totalCount > 0 ? `${(answeredCount / totalCount) * 100}%` : '0%' }} />
        </div>
        <div className="listen-nav-pills">
          {questions.map((q) => (
            <button
              key={q.id}
              type="button"
              className={`listen-nav-pill${answers[q.id] ? ' answered' : ''}`}
              onClick={() => scrollToQuestion(q.id)}
            >
              {q.question_number}
            </button>
          ))}
        </div>
      </div>

      {questions.map((question) => (
        <div className="question-block" key={question.id} ref={(el) => { questionRefs.current[question.id] = el; }}>
          <p className="question-number">Question {question.question_number}</p>
          <p className="question-text">{question.question_text}</p>

          <div className="tickbox-table">
            {LETTERS.map((letter) => (
              <TickRow
                key={letter}
                letter={letter}
                value={question[`option_${letter.toLowerCase()}`]}
                selected={answers[question.id] === letter}
                disabled={false}
                status={null}
                onSelect={(l) => handleSelect(question.id, l)}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="listen-submit-bar">
        <span className="listen-submit-progress">{answeredCount}/{totalCount} câu đã trả lời</span>
        <button type="button" id="submit-btn" onClick={handleSubmit} disabled={submitting}>
          NỘP BÀI
        </button>
      </div>
    </div>
  );
}
