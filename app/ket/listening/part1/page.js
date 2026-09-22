// Trang làm bài Listening Part 1. Tương đương ExamController::index().
// KHÔNG gửi correct_answer/explanation của các câu thật ra client trước khi
// nộp bài. Riêng câu Example được gửi kèm đáp án đúng để hiển thị minh hoạ
// (đúng như trên đề thi giấy thật).

import NavTabs from '@/components/NavTabs';
import { getAllTests, getTestById, getQuestionsByTestId } from '@/lib/models/listeningPart1';
import ListeningPart1Client from './ListeningPart1Client';
import ListeningPart1Browse from './ListeningPart1Browse';

export const metadata = { title: 'KET Listening 1' };

export default async function ListeningPart1Page({ searchParams }) {
  const params = await searchParams;
  const testId = parseInt(params?.id ?? '0', 10) || 0;

  if (testId <= 0) {
    return renderBrowse();
  }

  const test = await getTestById(testId);

  if (!test) {
    return (
      <main className="page">
        <p className="error-message">Không tìm thấy đề thi.</p>
        <p>
          <a href="/ket/listening/part1">Chọn đề khác</a>
        </p>
      </main>
    );
  }

  const rows = await getQuestionsByTestId(testId);

  const exampleRow = rows.find((q) => q.is_example) || null;
  const example = exampleRow
    ? {
        id: exampleRow.id,
        question_number: exampleRow.question_number,
        question_text: exampleRow.question_text,
        option_type: exampleRow.option_type,
        option_a: exampleRow.option_a,
        option_b: exampleRow.option_b,
        option_c: exampleRow.option_c,
        shared_image: exampleRow.shared_image,
        correct_answer: exampleRow.correct_answer,
      }
    : null;

  const questions = rows
    .filter((q) => !q.is_example)
    .map((q) => ({
      id: q.id,
      question_number: q.question_number,
      question_text: q.question_text,
      audio_path: q.audio_path,
      option_type: q.option_type,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      shared_image: q.shared_image,
    }));

  return (
    <>
      <header className="site-header">
        <h1>KET Listening 1</h1>
      </header>

      <NavTabs active="listening1" />

      <main className="page">
        <p>
          <a href="/ket/listening/part1" className="btn-link">
            &larr; Chọn đề khác
          </a>
        </p>

        <ListeningPart1Client test={test} example={example} questions={questions} />
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
        <h1>KET Listening 1</h1>
      </header>

      <NavTabs active="listening1" />

      <main className="page">
        <section className="part-info">
          <h2>LISTENING 1</h2>
          <p className="cloze-instructions">Chọn một quyển KET, sau đó chọn Test muốn làm.</p>
        </section>

        <ListeningPart1Browse grouped={grouped} />

        {tests.length === 0 && <p>Chưa có đề nào.</p>}
      </main>
    </>
  );
}
