// Trang tổng quan Admin Part 6. Tương đương AdminFormCompletionController::index().
import AdminNavTabs from '@/components/AdminNavTabs';
import AdminFlash from '@/components/AdminFlash';
import DeleteButton from '@/components/DeleteButton';
import { getTestById, getFieldsByTestId } from '@/lib/models/formcompletion';
import { deleteFieldAction } from './actions';

const DEFAULT_TEST_ID = 1;

export const metadata = { title: 'Quản trị - KET Reading Part 6' };

export default async function AdminPart6Page({ searchParams }) {
  const params = await searchParams;
  const test = await getTestById(DEFAULT_TEST_ID);
  const fields = await getFieldsByTestId(DEFAULT_TEST_ID);

  return (
    <>
      <header className="site-header">
        <h1>Quản trị đề thi - KET Reading Part 6</h1>
      </header>

      <AdminNavTabs active="admin6" />

      <main className="page">
        <AdminFlash msg={params?.msg} messages={{ saved: 'Đã lưu thành công.', deleted: 'Đã xoá field.' }} />

        <section className="admin-section">
          <h2>Thông tin đề thi</h2>
          <p>
            <strong>Tiêu đề:</strong> {test.title}
          </p>

          <p>
            <strong>Văn bản 1 (thư) - {test.text1_date}:</strong>
          </p>
          <div className="admin-passage-preview" style={{ whiteSpace: 'pre-line' }}>
            {test.text1_html}
          </div>
          <p>
            <em>Ký tên: {test.text1_signature}</em>
          </p>

          <p>
            <strong>Văn bản 2 (note):</strong>
          </p>
          <div className="admin-passage-preview" style={{ whiteSpace: 'pre-line' }}>
            {test.text2_html}
          </div>
          <p>
            <em>Ký tên: {test.text2_signature}</em>
          </p>

          <p>
            <strong>Tiêu đề form:</strong> {test.form_title}
          </p>

          <p>
            <a href="/admin/part6/test-info" className="btn-link">
              Sửa văn bản / form
            </a>
          </p>
        </section>

        <section className="admin-section">
          <h2>Các field trong form ({fields.length})</h2>
          <p>
            <a href="/admin/part6/field/new" className="btn-link btn-add">
              + Thêm field
            </a>
          </p>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Số</th>
                <th>Label</th>
                <th>Prefix</th>
                <th>Đáp án đúng</th>
                <th>Giải thích</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((f) => (
                <tr key={f.id}>
                  <td>{f.field_number}</td>
                  <td>{f.field_label}</td>
                  <td>{f.field_prefix || ''}</td>
                  <td>{String(f.correct_answer).replace(/\|/g, ' / ')}</td>
                  <td>{f.explanation || ''}</td>
                  <td className="admin-actions">
                    <a href={`/admin/part6/field/${f.id}`}>Sửa</a>
                    <form action={deleteFieldAction.bind(null, f.id)}>
                      <DeleteButton message="Xoá field này?" />
                    </form>
                  </td>
                </tr>
              ))}
              {fields.length === 0 && (
                <tr>
                  <td colSpan={6}>Chưa có field nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
