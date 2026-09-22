// Form thêm/sửa tiêu đề đề Part 7. Dùng chung cho test/new và test/[id].
import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { saveTest } from './actions';

const DEFAULT_INSTRUCTIONS =
  'Complete the letter(s).\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.';

export default function TestForm({ test, errorMessage }) {
  const isEdit = Boolean(test?.id);

  return (
    <>
      <header className="site-header">
        <h1>{isEdit ? 'Sửa tiêu đề đề' : 'Thêm đề Part 7 mới'}</h1>
      </header>

      <AdminNavTabs active="admin7" />

      <main className="page">
        <FormErrors errors={errorMessage ? [errorMessage] : null} />

        {!isEdit && (
          <p className="admin-hint">
            Sau khi tạo đề, bạn sẽ được chuyển sang màn hình quản lý để thêm thư và câu hỏi (41-50) cho đề này.
          </p>
        )}

        <form action={saveTest} className="admin-form">
          <input type="hidden" name="id" defaultValue={test?.id || 0} />

          <label>
            Tiêu đề đề thi (VD &quot;TEST 5 KET 3&quot;)
            <input type="text" name="title" defaultValue={test?.title || ''} required />
          </label>

          <label>
            Nhóm KET (VD &quot;KET 3&quot;) - dùng để gom nhóm ở trang chọn đề
            <input type="text" name="ket_group" defaultValue={test?.ket_group || ''} />
          </label>

          <label>
            Nhãn Test (VD &quot;Test 5&quot;) - hiển thị trên nút chọn trong nhóm KET
            <input type="text" name="test_label" defaultValue={test?.test_label || ''} />
          </label>

          <label>
            Hướng dẫn làm bài (mỗi dòng 1 câu, VD &quot;Complete the letter.&quot;)
            <textarea name="instructions" rows={3} defaultValue={test?.instructions ?? DEFAULT_INSTRUCTIONS} />
          </label>

          <button type="submit">Lưu</button>
          <a href="/admin/part7" className="btn-link">
            Huỷ
          </a>
        </form>
      </main>
    </>
  );
}
