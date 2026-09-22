// Trang làm bài Part 5 / Open Cloze (Letter Completion). Tương đương
// OpenClozeController::index() + app/views/opencloze/index.php.

import NavTabs from '@/components/NavTabs';
import { getTestById, getQuestionsByTestId } from '@/lib/models/opencloze';
import OpenClozeClient from './OpenClozeClient';

export const metadata = { title: 'KET Open Cloze' };

export default async function Part5Page({ searchParams }) {
  const params = await searchParams;
  const testId = parseInt(params?.id ?? '0', 10) || 0;
  const test = testId > 0 ? await getTestById(testId) : null;

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

  return (
    <>
      <header className="site-header">
        <h1>KET Reading/Writing - {test.part_label}</h1>
      </header>

      <NavTabs active="part5" />

      <main className="page">
        <p className="cloze-instructions">Read the two letters. Fill in each space (41-50) with ONE word.</p>

        <OpenClozeClient test={test} questionsByNumber={questionsByNumber} blankCount={blankCount} />
      </main>
    </>
  );
}
