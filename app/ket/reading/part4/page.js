// Trang làm bài Part 4 (Multiple Choice Cloze). Tương đương
// Part4Controller::index() + app/views/part4/index.php.

import NavTabs from '@/components/NavTabs';
import { getTestById, getQuestionsByTestId } from '@/lib/models/part4';
import Part4Client from './Part4Client';

export const metadata = { title: 'KET Reading - Part 4' };

export default async function Part4Page({ searchParams }) {
  const params = await searchParams;
  const testId = parseInt(params?.id ?? '0', 10) || 0;
  const test = testId > 0 ? await getTestById(testId) : null;

  if (!test || Number(test.part) !== 4) {
    return (
      <main className="page">
        <p className="error-message">Không tìm thấy đề thi.</p>
        <p>
          <a href="/">Quay về trang chủ</a>
        </p>
      </main>
    );
  }

  const questionRows = await getQuestionsByTestId(testId);

  // Chỉ giữ correct_answer cho câu EXAMPLE. Các câu thật không mang correct_answer sang client.
  const questionsByNumber = {};
  let blankCount = 0;

  for (const q of questionRows) {
    const isExample = Number(q.is_example) === 1;
    questionsByNumber[q.question_number] = {
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      is_example: isExample,
      correct_answer: isExample ? q.correct_answer : undefined,
    };
    if (!isExample) blankCount++;
  }

  return (
    <>
      <header className="site-header">
        <h1>KET Reading - Part 4</h1>
      </header>

      <NavTabs active="part4" />

      <main className="page">
        <p className="cloze-instructions">
          Read the text below. Choose the correct word (A, B or C) for each space (28-35).
        </p>

        <Part4Client test={test} questionsByNumber={questionsByNumber} blankCount={blankCount} />
      </main>
    </>
  );
}
