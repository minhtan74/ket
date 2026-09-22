// Trang làm bài Part 6 (Form Completion). Tương đương
// FormCompletionController::index() + app/views/formcompletion/index.php.

import NavTabs from '@/components/NavTabs';
import { getTestById, getFieldsByTestId } from '@/lib/models/formcompletion';
import Part6Client from './Part6Client';

export const metadata = { title: 'KET Reading - Part 6' };

export default async function Part6Page({ searchParams }) {
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

  const fieldRows = await getFieldsByTestId(testId);
  const fields = fieldRows.map((f) => ({
    field_number: f.field_number,
    field_label: f.field_label,
    field_prefix: f.field_prefix,
  }));

  return (
    <>
      <header className="site-header">
        <h1>KET Reading - Part 6</h1>
      </header>

      <NavTabs active="part6" />

      <main className="page">
        <p className="cloze-instructions">Read the letter and the note. Fill in the form below (51-55).</p>

        <Part6Client test={test} fields={fields} />
      </main>
    </>
  );
}
