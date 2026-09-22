// Quản lý câu hỏi của một đề Listening Part 1. Tương đương AdminController::index()
// trước đây (khi còn 1 đề cố định), nay scope theo testId.

import { redirect } from 'next/navigation';
import AdminNavTabs from '@/components/AdminNavTabs';
import AdminFlash from '@/components/AdminFlash';
import DeleteButton from '@/components/DeleteButton';
import { getTestById, getQuestionsByTestId } from '@/lib/models/listeningPart1';
import { deleteQuestionAction } from '../../actions';

export const metadata = { title: 'Quản lý đề - Listening 1' };

export default async function ManageListeningTestPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const testId = Number(id);
  const test = await getTestById(testId);

  if (!test) {
    redirect('/admin/listening/part1');
  }

  const questions = await getQuestionsByTestId(testId);

  return (
    <>
      <header className="site-header">
        <h1>{test.title}</h1>
      </header>

      <AdminNavTabs active="adminListening1" />

      <main className="page">
        <AdminFlash
          msg={sp?.msg}
          messages={{
            saved: 'Đã lưu thành công.',
            created: 'Đã tạo đề mới. Giờ thêm câu hỏi (Example + 1-5) cho đề này bên dưới.',
            deleted: 'Đã xoá.',
          }}
        />

        <p>
          <a href="/admin/listening/part1" className="btn-link">
            &larr; Danh sách đề
          </a>
        </p>

        <p>
          <strong>Nhóm:</strong> {test.ket_group || '—'} &nbsp;|&nbsp; <strong>Test:</strong>{' '}
          {test.test_label || '—'} &nbsp;|&nbsp; <a href={`/admin/listening/part1/test/${test.id}`}>Sửa nhóm/tiêu đề</a>
        </p>

        <section className="admin-section">
          <h2>Câu hỏi ({questions.length})</h2>
          <p>
            <a href={`/admin/listening/part1/manage/${test.id}/question/new`} className="btn-link btn-add">
              + Thêm câu hỏi
            </a>
          </p>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Số</th>
                <th>Nội dung câu hỏi</th>
                <th>Audio</th>
                <th>Kiểu đáp án</th>
                <th>Đáp án đúng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
                  <td>{q.question_number}{q.is_example ? ' (Example)' : ''}</td>
                  <td>{q.question_text}</td>
                  <td>{q.audio_path ? '✓' : '—'}</td>
                  <td>{q.option_type === 'image' ? 'Hình ảnh' : q.option_type === 'map' ? 'Bản đồ chung' : 'Văn bản'}</td>
                  <td>{q.correct_answer}</td>
                  <td className="admin-actions">
                    <a href={`/admin/listening/part1/manage/${test.id}/question/${q.id}`}>Sửa</a>
                    <form action={deleteQuestionAction.bind(null, test.id, q.id)}>
                      <DeleteButton message="Xoá câu hỏi này?" />
                    </form>
                  </td>
                </tr>
              ))}
              {questions.length === 0 && (
                <tr>
                  <td colSpan={6}>Chưa có câu hỏi nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
