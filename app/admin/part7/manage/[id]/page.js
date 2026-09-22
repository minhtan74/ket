// Quản lý thư + câu hỏi của một đề Part 7. Tương đương AdminPart7Controller::manage().
import { redirect } from 'next/navigation';
import AdminNavTabs from '@/components/AdminNavTabs';
import AdminFlash from '@/components/AdminFlash';
import DeleteButton from '@/components/DeleteButton';
import { getTestById, getLettersByTestId, getQuestionsByTestId } from '@/lib/models/part7';
import { deleteLetterAction, deleteQuestionAction } from '../../actions';

export const metadata = { title: 'Quản lý đề - Part 7' };

export default async function ManageTestPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const testId = Number(id);
  const test = await getTestById(testId);

  if (!test) {
    redirect('/admin/part7');
  }

  const letters = await getLettersByTestId(testId);
  const questions = await getQuestionsByTestId(testId);

  return (
    <>
      <header className="site-header">
        <h1>{test.title}</h1>
      </header>

      <AdminNavTabs active="admin7" />

      <main className="page">
        <AdminFlash
          msg={sp?.msg}
          messages={{
            saved: 'Đã lưu thành công.',
            created: 'Đã tạo đề mới. Giờ thêm thư và câu hỏi cho đề này bên dưới.',
            deleted: 'Đã xoá.',
          }}
        />

        <p>
          <a href="/admin/part7" className="btn-link">
            &larr; Danh sách đề
          </a>
        </p>

        <p>
          <strong>Nhóm:</strong> {test.ket_group || '—'} &nbsp;|&nbsp; <strong>Test:</strong>{' '}
          {test.test_label || '—'} &nbsp;|&nbsp; <a href={`/admin/part7/test/${test.id}`}>Sửa nhóm/hướng dẫn</a>
        </p>

        {test.data_note && (
          <div className="flash-error">
            <p>
              <strong>⚠ Ghi chú dữ liệu:</strong> {test.data_note}
            </p>
          </div>
        )}

        <section className="admin-section">
          <h2>Thư ({letters.length})</h2>
          <p>
            <a href={`/admin/part7/manage/${test.id}/letter/new`} className="btn-link btn-add">
              + Thêm thư
            </a>
          </p>

          {letters.map((letter) => (
            <div key={letter.id}>
              <div className="admin-passage-preview" style={{ marginBottom: 10 }}>
                <p>
                  <strong>#{letter.letter_order}</strong>
                  {letter.dateline ? <> &nbsp;|&nbsp; Dateline: {letter.dateline}</> : null} &nbsp;|&nbsp;{' '}
                  {letter.salutation} &nbsp;&rarr;&nbsp; {letter.closing} {letter.signature}
                </p>
                <div style={{ whiteSpace: 'pre-line' }}>{letter.body_html}</div>
              </div>
              <p className="admin-actions" style={{ marginBottom: 16 }}>
                <a href={`/admin/part7/manage/${test.id}/letter/${letter.id}`}>Sửa</a>
                <form action={deleteLetterAction.bind(null, test.id, letter.id)}>
                  <DeleteButton message="Xoá thư này?" />
                </form>
              </p>
            </div>
          ))}
          {letters.length === 0 && <p>Chưa có thư nào.</p>}
        </section>

        <section className="admin-section">
          <h2>Câu hỏi ({questions.length})</h2>
          <p>
            <a href={`/admin/part7/manage/${test.id}/question/new`} className="btn-link btn-add">
              + Thêm câu hỏi
            </a>
          </p>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Số</th>
                <th>Đáp án đúng</th>
                <th>Loại</th>
                <th>Ghi chú</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
                  <td>{q.question_number}</td>
                  <td>{String(q.correct_answer).replace(/\|/g, ' / ')}</td>
                  <td>{Number(q.is_example) === 1 ? 'EXAMPLE' : 'Câu thật'}</td>
                  <td>{q.note ? '⚠ ' + q.note : ''}</td>
                  <td className="admin-actions">
                    <a href={`/admin/part7/manage/${test.id}/question/${q.id}`}>Sửa</a>
                    <form action={deleteQuestionAction.bind(null, test.id, q.id)}>
                      <DeleteButton message="Xoá câu hỏi này?" />
                    </form>
                  </td>
                </tr>
              ))}
              {questions.length === 0 && (
                <tr>
                  <td colSpan={5}>Chưa có câu hỏi nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <p className="admin-hint">
          Mỗi ô trống trong thư dùng placeholder <code>{'{{n}}'}</code> (VD <code>{'{{0}}'}</code> cho câu example,{' '}
          <code>{'{{41}}'}</code>...<code>{'{{50}}'}</code> cho câu thật). Thêm câu hỏi ở đây thì nhớ chèn đúng{' '}
          <code>{'{{n}}'}</code> tương ứng vào nội dung thư, nếu không ô nhập sẽ không hiện ra khi làm bài.
        </p>
      </main>
    </>
  );
}
