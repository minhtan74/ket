'use client';

// Client Component: form làm bài Listening Part 1. Mỗi câu có audio riêng
// (giới hạn 2 lượt nghe, không tua - xem components/ListeningAudioPlayer),
// 3 đáp án A/B/C dạng lưới (ảnh hoặc text). Cảnh báo trước khi rời trang
// nếu chưa nộp bài, để tránh mất tiến độ làm bài.

import { useEffect, useRef, useState } from 'react';
import ScoreSummary from '@/components/ScoreSummary';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import { submitListeningPart1 } from './actions';

const LETTERS = ['A', 'B', 'C'];

function OptionCard({ letter, value, optionType, selected, disabled, status, onSelect }) {
  const classNames = ['option-card', optionType === 'image' ? 'option-card-image' : 'option-card-text'];
  if (selected) classNames.push('selected');
  if (status === 'correct') classNames.push('option-correct');
  if (status === 'wrong') classNames.push('option-wrong');

  return (
    <label className={classNames.join(' ')}>
      <input type="radio" checked={selected} onChange={() => !disabled && onSelect(letter)} disabled={disabled} />
      <span className="option-letter-badge">{letter}</span>
      {optionType === 'image' ? (
        <img src={`/${value}`} alt={`Đáp án ${letter}`} className="option-image" />
      ) : (
        <span className="option-text-value">{value}</span>
      )}
      {status === 'correct' && <span className="option-status-icon correct">✓</span>}
      {status === 'wrong' && <span className="option-status-icon wrong">✗</span>}
    </label>
  );
}

export default function ListeningPart1Client({ test, example, questions }) {
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
    const res = await submitListeningPart1(test.id, answers);
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

        <section className="review-list">
          {result.review.map((item) => (
            <div key={item.question_number} className={`review-item ${item.is_correct ? 'correct' : 'wrong'}`}>
              <p className="question-number">Question {item.question_number}</p>
              <p className="question-text">{item.question_text}</p>

              <ListeningAudioPlayer src={item.audio_path} maxPlays={null} />

              {item.option_type === 'map' && item.shared_image && (
                <div className="map-image-wrap">
                  <img src={`/${item.shared_image}`} alt="Sơ đồ/bản đồ" className="map-image" />
                </div>
              )}

              <div className="option-grid">
                {LETTERS.map((letter) => {
                  const value = item[`option_${letter.toLowerCase()}`];
                  let status = null;
                  if (letter === item.correct_answer) status = 'correct';
                  else if (letter === item.user_answer) status = 'wrong';

                  return (
                    <OptionCard
                      key={letter}
                      letter={letter}
                      value={value}
                      optionType={item.option_type}
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

        <a id="retry-btn" href={`/ket/listening/part1?id=${test.id}`}>
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

      {example && (
        <div className="question-block example-block" ref={(el) => { questionRefs.current.example = el; }}>
          <p className="question-number">
            <span className="example-badge">EXAMPLE</span> Question {example.question_number}
          </p>
          <p className="question-text">{example.question_text}</p>
          {example.option_type === 'map' && example.shared_image && (
            <div className="map-image-wrap">
              <img src={`/${example.shared_image}`} alt="Sơ đồ/bản đồ" className="map-image" />
            </div>
          )}
          <div className="option-grid">
            {LETTERS.map((letter) => (
              <OptionCard
                key={letter}
                letter={letter}
                value={example[`option_${letter.toLowerCase()}`]}
                optionType={example.option_type}
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

          <ListeningAudioPlayer src={question.audio_path} maxPlays={2} />

          {question.option_type === 'map' && question.shared_image && (
            <div className="map-image-wrap">
              <img src={`/${question.shared_image}`} alt="Sơ đồ/bản đồ" className="map-image" />
            </div>
          )}

          <div className="option-grid">
            {LETTERS.map((letter) => (
              <OptionCard
                key={letter}
                letter={letter}
                value={question[`option_${letter.toLowerCase()}`]}
                optionType={question.option_type}
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
