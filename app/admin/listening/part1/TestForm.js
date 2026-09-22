// Form thêm/sửa tiêu đề đề Listening Part 1. Dùng chung cho test/new và
// test/[id].
import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { saveTest } from './actions';

export default function TestForm({ test, errorMessage }) {
  const isEdit = Boolean(test?.id);

  return (
    <>
      <header className="site-header">
        <h1>{isEdit ? 'Sửa tiêu đề đề' : 'Thêm đề Listening 1 mới'}</h1>
      </header>

      <AdminNavTabs active="adminListening1" />

      <main className="page">
        <FormErrors errors={errorMessage ? [errorMessage] : null} />

        {!isEdit && (
          <p className="admin-hint">
            Sau khi tạo đề, bạn sẽ được chuyển sang màn hình quản lý để thêm câu hỏi (Example + 1-5) cho đề này.
          </p>
        )}

        <form action={saveTest} className="admin-form">
          <input type="hidden" name="id" defaultValue={test?.id || 0} />

          <label>
            Tiêu đề đề thi (VD &quot;KET Listening 1 - Test 2&quot;)
            <input type="text" name="title" defaultValue={test?.title || ''} required />
          </label>

          <label>
            Nhóm KET (VD &quot;KET 1&quot;) - dùng để gom nhóm ở trang chọn đề
            <input type="text" name="ket_group" defaultValue={test?.ket_group || ''} />
          </label>

          <label>
            Nhãn Test (VD &quot;Test 2&quot;) - hiển thị trên nút chọn trong nhóm KET
            <input type="text" name="test_label" defaultValue={test?.test_label || ''} />
          </label>

          <button type="submit">Lưu</button>
          <a href="/admin/listening/part1" className="btn-link">
            Huỷ
          </a>
        </form>
      </main>
    </>
  );
}
