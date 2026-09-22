'use client';

// Component dùng chung cho Part 5 (Open Cloze) và Part 7 (Complete the
// Letter): render một đoạn thư có marker {{n}} thành text thường xen kẽ
// input tự do (lúc làm bài) hoặc span tô màu đúng/sai (lúc xem kết quả).
// Tương đương buildLetterHtml()/buildReviewLetterHtml() của bản PHP, nhưng
// trả về React node thuần thay vì chuỗi HTML ghép tay.

import { splitByBlanks } from '@/lib/parseBlanks';

const MAX_ANSWER_LENGTH = 30;

function renderTextWithBreaks(text, keyPrefix) {
  const lines = text.split('\n');
  return lines.map((line, i) => (
    <span key={`${keyPrefix}-${i}`}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

export default function LetterBody({ rawHtml, questionsByNumber, mode, answers, onChange, reviewByNumber }) {
  const segments = splitByBlanks(rawHtml || '');

  return (
    <div className="oc-letter-body">
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <span key={index}>{renderTextWithBreaks(segment.value, index)}</span>;
        }

        const question = questionsByNumber[segment.number];
        if (!question) return null;

        if (question.is_example) {
          const answerText = String(question.correct_answer).split('|')[0];
          return (
            <span key={index}>
              (<span className="oc-example-label">Example:</span>{' '}
              <span className="oc-example-answer">{answerText}</span>)
            </span>
          );
        }

        if (mode === 'review') {
          const review = reviewByNumber?.[segment.number];
          if (!review) return null;

          const displayText = review.user_answer !== '' ? review.user_answer : '—';
          const statusClass = review.is_correct ? 'oc-review-correct' : 'oc-review-wrong';
          const title = 'Correct answer: ' + review.correct_answer_display;

          return (
            <span key={index} className={`oc-review-blank ${statusClass}`} title={title}>
              {displayText}
            </span>
          );
        }

        // mode === 'input'
        return (
          <span className="oc-blank" key={index}>
            <span className="oc-number">{segment.number}</span>
            <input
              type="text"
              className="oc-input"
              size={8}
              maxLength={MAX_ANSWER_LENGTH}
              autoComplete="off"
              value={answers?.[segment.number] || ''}
              onChange={(e) => onChange(segment.number, e.target.value)}
            />
          </span>
        );
      })}
    </div>
  );
}
