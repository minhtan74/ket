// Trang tổng quan Admin Part 4. Tương đương AdminPart4Controller::index().
import AdminNavTabs from '@/components/AdminNavTabs';
import AdminFlash from '@/components/AdminFlash';
import DeleteButton from '@/components/DeleteButton';
import { getTestById, getQuestionsByTestId } from '@/lib/models/part4';
import { deleteQuestionAction } from './actions';

const DEFAULT_TEST_ID = 1;

export const metadata = { title: 'Quản trị - KET Reading Part 4' };

export default async function AdminPart4Page({ searchParams }) {
  const params = await searchParams;
  const test = await getTestById(DEFAULT_TEST_ID);
  const questions = await getQuestionsByTestId(DEFAULT_TEST_ID);

  return (
    <>
      <header className="site-header">
        <h1>Quản trị đề thi - KET Reading Part 4</h1>
      </header>

      <AdminNavTabs active="admin4" />

      <main className="page">
        <AdminFlash msg={params?.msg} messages={{ saved: 'Đã lưu thành công.', deleted: 'Đã xoá câu hỏi.' }} />

        <section className="admin-section">
          <h2>Thông tin đề thi</h2>
          <p>
            <strong>Tiêu đề:</strong> {test.title}
          </p>
          <p>
            <strong>Đoạn văn (passage):</strong>
          </p>
          <div className="admin-passage-preview" style={{ whiteSpace: 'pre-line' }}>
            {test.passage_html}
          </div>
          <p>
            <a href="/admin/part4/test-info" className="btn-link">
              Sửa tiêu đề / đoạn văn
            </a>
          </p>
        </section>

        <section className="admin-section">
          <h2>Câu hỏi ({questions.length})</h2>
          <p>
            <a href="/admin/part4/question/new" className="btn-link btn-add">
              + Thêm câu hỏi
            </a>
          </p>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Số</th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>Đáp án đúng</th>
                <th>Loại</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
                  <td>{q.question_number}</td>
                  <td>{q.option_a}</td>
                  <td>{q.option_b}</td>
                  <td>{q.option_c}</td>
                  <td>{q.correct_answer}</td>
                  <td>{Number(q.is_example) === 1 ? 'EXAMPLE' : 'Câu thật'}</td>
                  <td className="admin-actions">
                    <a href={`/admin/part4/question/${q.id}`}>Sửa</a>
                    <form action={deleteQuestionAction.bind(null, q.id)}>
                      <DeleteButton message="Xoá câu hỏi này?" />
                    </form>
                  </td>
                </tr>
              ))}
              {questions.length === 0 && (
                <tr>
                  <td colSpan={7}>Chưa có câu hỏi nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
