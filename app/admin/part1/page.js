// Trang tổng quan Admin Part 1. Tương đương AdminController::index() +
// app/views/admin/index.php.

import AdminNavTabs from '@/components/AdminNavTabs';
import AdminFlash from '@/components/AdminFlash';
import DeleteButton from '@/components/DeleteButton';
import { getTestById, getQuestionsByTestId, getOptionsByTestId } from '@/lib/models/part1';
import { deleteQuestionAction } from './actions';

const DEFAULT_TEST_ID = 1;

export const metadata = { title: 'Quản trị - KET Reading Part 1' };

export default async function AdminPart1Page({ searchParams }) {
  const params = await searchParams;
  const test = await getTestById(DEFAULT_TEST_ID);
  const questions = await getQuestionsByTestId(DEFAULT_TEST_ID);
  const options = await getOptionsByTestId(DEFAULT_TEST_ID);

  return (
    <>
      <header className="site-header">
        <h1>Quản trị đề thi - KET Reading Part 1</h1>
      </header>

      <AdminNavTabs active="admin1" />

      <main className="page">
        <AdminFlash
          msg={params?.msg}
          messages={{ saved: 'Đã lưu thành công.', deleted: 'Đã xoá câu hỏi.' }}
        />

        <section className="admin-section">
          <h2>Thông tin đề thi</h2>
          <p>
            <strong>Tiêu đề:</strong> {test.title}
          </p>
          <img src={`/${test.image}`} alt="Ảnh đề thi" className="admin-preview-image" />
          <p>
            <a href="/admin/part1/test-info" className="btn-link">
              Sửa tiêu đề / đổi ảnh
            </a>
          </p>
        </section>

        <section className="admin-section">
          <h2>Câu hỏi ({questions.length})</h2>
          <p>
            <a href="/admin/part1/question/new" className="btn-link btn-add">
              + Thêm câu hỏi
            </a>
          </p>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Số</th>
                <th>Nội dung câu hỏi</th>
                <th>Đáp án đúng</th>
                <th>Giải thích</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
                  <td>{q.question_number}</td>
                  <td>{q.question_text}</td>
                  <td>{q.correct_answer}</td>
                  <td>{q.explanation || ''}</td>
                  <td className="admin-actions">
                    <a href={`/admin/part1/question/${q.id}`}>Sửa</a>
                    <form action={deleteQuestionAction.bind(null, q.id)}>
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

        <section className="admin-section">
          <h2>Đáp án (A-H)</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Chữ cái</th>
                <th>Nội dung</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {options.map((opt) => (
                <tr key={opt.id}>
                  <td>{opt.option_letter}</td>
                  <td style={{ whiteSpace: 'pre-line' }}>{opt.option_text}</td>
                  <td className="admin-actions">
                    <a href={`/admin/part1/option/${opt.id}`}>Sửa</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
