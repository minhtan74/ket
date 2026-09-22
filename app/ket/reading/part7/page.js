// Trang Part 7 (Complete the Letter(s)). Không có ?id= -> trang chọn đề
// (tương đương Part7Controller::browse()). Có ?id= -> trang làm bài
// (tương đương Part7Controller::index()).

import NavTabs from '@/components/NavTabs';
import { getTestById, getLettersByTestId, getQuestionsByTestId, getAllTests } from '@/lib/models/part7';
import Part7Browse from './Part7Browse';
import Part7Client from './Part7Client';

export const metadata = { title: 'KET Reading - Part 7' };

export default async function Part7Page({ searchParams }) {
  const params = await searchParams;
  const testId = parseInt(params?.id ?? '0', 10) || 0;

  if (testId <= 0) {
    return await renderBrowse();
  }

  const test = await getTestById(testId);

  if (!test) {
    return (
      <main className="page">
        <p className="error-message">Không tìm thấy đề thi.</p>
        <p>
          <a href="/">Quay về trang chủ</a>
        </p>
      </main>
    );
  }

  const letterRows = await getLettersByTestId(testId);
  const questionRows = await getQuestionsByTestId(testId);

  const questionsByNumber = {};
  let blankCount = 0;

  for (const q of questionRows) {
    const isExample = Number(q.is_example) === 1;
    questionsByNumber[q.question_number] = {
      is_example: isExample,
      correct_answer: isExample ? q.correct_answer : undefined,
    };
    if (!isExample) blankCount++;
  }

  const letters = letterRows.map((letter) => ({
    dateline: letter.dateline,
    salutation: letter.salutation,
    body_html: letter.body_html,
    closing: letter.closing,
    signature: letter.signature,
  }));

  const realQuestions = questionRows
    .filter((q) => Number(q.is_example) !== 1)
    .sort((a, b) => a.question_number - b.question_number);

  const hints = realQuestions.map((q) => ({
    question_number: q.question_number,
    answer: String(q.correct_answer).split('|')[0],
  }));

  const instructionLines = String(test.instructions || '').split('\n').filter(Boolean);

  return (
    <>
      <header className="site-header">
        <h1>KET Reading - Part 7: {test.title}</h1>
      </header>

      <NavTabs active="part7" />

      <main className="page">
        <p>
          <a href="/ket/reading/part7" className="btn-link">
            &larr; Chọn đề khác
          </a>
        </p>

        <section className="part-info">
          <h2>PART 7</h2>
          <p className="part-info-range">QUESTIONS 41&ndash;50</p>
          <p className="cloze-instructions">
            {instructionLines.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </section>

        <Part7Client
          test={test}
          letters={letters}
          questionsByNumber={questionsByNumber}
          blankCount={blankCount}
          hints={hints}
        />
      </main>
    </>
  );
}

async function renderBrowse() {
  const tests = await getAllTests();

  const grouped = {};
  for (const test of tests) {
    const groupLabel = test.ket_group !== '' ? test.ket_group : 'Khác';
    if (!grouped[groupLabel]) grouped[groupLabel] = [];
    grouped[groupLabel].push(test);
  }

  return (
    <>
      <header className="site-header">
        <h1>KET Reading - Part 7 (Complete the Letter)</h1>
      </header>

      <NavTabs active="part7" />

      <main className="page">
        <section className="part-info">
          <h2>PART 7</h2>
          <p className="cloze-instructions">Chọn một quyển KET, sau đó chọn Test muốn làm.</p>
        </section>

        <Part7Browse grouped={grouped} />
      </main>
    </>
  );
}
