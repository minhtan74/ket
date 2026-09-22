'use client';

// Client Component: form làm bài Listening Part 3. Khác Part 1 ở 2 điểm
// chính: (1) CHỈ 1 audio hội thoại dùng chung cho cả 5 câu (giới hạn 2
// lượt nghe - xem components/ListeningAudioPlayer), hiển thị 1 lần duy
// nhất ở đầu bài thay vì lặp lại trong từng câu; (2) đáp án A/B/C hiển thị
// dạng bảng tick ô vuông (giống hệt mẫu phiếu trả lời giấy thật) thay vì
// lưới thẻ ảnh/chữ như Part 1. Cảnh báo trước khi rời trang nếu chưa nộp
// bài, để tránh mất tiến độ làm bài.

import { useEffect, useRef, useState } from 'react';
import ScoreSummary from '@/components/ScoreSummary';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import { submitListeningPart3 } from './actions';

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

export default function ListeningPart3Client({ test, example, questions }) {
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
    const res = await submitListeningPart3(test.id, answers);
    setSubmitting(false);

    if (res.error) {
      alert(res.error);
      return;
    }

    setResult(res);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (result) {
    return (
      <>
        <ScoreSummary correct={result.correct} total={result.total} wrong={result.wrong} accuracy={result.accuracy} />

        <div className="listen-shared-audio">
          <p className="listen-shared-audio-label">Nghe lại đoạn hội thoại</p>
          <ListeningAudioPlayer src={test.audio_path} maxPlays={null} />
        </div>

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

        <a id="retry-btn" href={`/ket/listening/part3?id=${test.id}`}>
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
          {example && (
            <button type="button" className="listen-nav-pill listen-nav-pill-example" onClick={() => scrollToQuestion('example')}>
              E
            </button>
          )}
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

      <div className="listen-shared-audio">
        <p className="listen-shared-audio-label">Bạn sẽ nghe một cuộc hội thoại. Nghe cả bài (tối đa 2 lần) rồi trả lời các câu bên dưới.</p>
        <ListeningAudioPlayer src={test.audio_path} maxPlays={2} />
      </div>

      {example && (
        <div className="question-block example-block" ref={(el) => { questionRefs.current.example = el; }}>
          <p className="question-number">
            <span className="example-badge">EXAMPLE</span> Question {example.question_number}
          </p>
          <p className="question-text">{example.question_text}</p>
          <div className="tickbox-table">
            {LETTERS.map((letter) => (
              <TickRow
                key={letter}
                letter={letter}
                value={example[`option_${letter.toLowerCase()}`]}
                selected={letter === example.correct_answer}
                disabled
                status={letter === example.correct_answer ? 'correct' : null}
                onSelect={() => {}}
              />
            ))}
          </div>
        </div>
      )}

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
