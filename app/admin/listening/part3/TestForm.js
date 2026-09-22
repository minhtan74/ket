// Form thêm/sửa đề Listening Part 3. Dùng chung cho test/new và test/[id].
// Khác TestForm của Part 1: có thêm ô tải audio hội thoại DÙNG CHUNG cho cả
// đề (Part 1 audio nằm ở từng câu, không nằm ở đây).

import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { saveTest } from './actions';

export default function TestForm({ test, errorMessage }) {
  const isEdit = Boolean(test?.id);

  return (
    <>
      <header className="site-header">
        <h1>{isEdit ? 'Sửa đề Listening 3' : 'Thêm đề Listening 3 mới'}</h1>
      </header>

      <AdminNavTabs active="adminListening3" />

      <main className="page">
        <FormErrors errors={errorMessage ? [errorMessage] : null} />

        {!isEdit && (
          <p className="admin-hint">
            Sau khi tạo đề, bạn sẽ được chuyển sang màn hình quản lý để thêm câu hỏi (Example + 11-15) cho đề này.
          </p>
        )}

        <form action={saveTest} className="admin-form" encType="multipart/form-data">
          <input type="hidden" name="id" defaultValue={test?.id || 0} />

          <label>
            Tiêu đề đề thi (VD &quot;KET Listening 3 - Test 2&quot;)
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

          <label>
            File audio đoạn hội thoại (dùng chung cho cả 5 câu, mp3/wav/m4a/ogg, tối đa 10MB)
            {test?.audio_path && <audio controls src={`/${test.audio_path}`} style={{ marginBottom: 8, width: '100%' }} />}
            <input type="file" name="audio" accept=".mp3,.wav,.m4a,.ogg" />
          </label>

          <button type="submit">Lưu</button>
          <a href="/admin/listening/part3" className="btn-link">
            Huỷ
          </a>
        </form>
      </main>
    </>
  );
}
