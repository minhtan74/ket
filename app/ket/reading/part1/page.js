// Trang làm bài Part 1 (Matching). Tương đương ExamController::index() +
// app/views/exam/index.php. KHÔNG gửi correct_answer/explanation ra client.

import NavTabs from '@/components/NavTabs';
import { getTestById, getQuestionsByTestId } from '@/lib/models/part1';
import Part1Client from './Part1Client';

export const metadata = { title: 'KET Reading - Part 1' };

export default async function Part1Page({ searchParams }) {
  const params = await searchParams;
  const testId = parseInt(params?.id ?? '0', 10) || 0;
  const test = testId > 0 ? await getTestById(testId) : null;

  if (!test || Number(test.part) !== 1) {
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

  // Chỉ giữ các trường cần cho giao diện làm bài, bỏ correct_answer/explanation.
  const questions = questionRows.map((q) => ({
    id: q.id,
    question_number: q.question_number,
    question_text: q.question_text,
  }));

  return (
    <>
      <header className="site-header">
        <h1>KET Reading - Part 1</h1>
      </header>

      <NavTabs active="part1" />

      <main className="page">
        <Part1Client test={test} questions={questions} />
      </main>
    </>
  );
}
