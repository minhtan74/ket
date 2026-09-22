// Form thêm/sửa field Part 6. Dùng chung cho field/new và field/[id].
import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { saveField } from './actions';

export default function FieldForm({ field, errorMessage }) {
  const isEdit = Boolean(field?.id);

  return (
    <>
      <header className="site-header">
        <h1>{isEdit ? 'Sửa field' : 'Thêm field mới'} (Part 6)</h1>
      </header>

      <AdminNavTabs active="admin6" />

      <main className="page">
        <FormErrors errors={errorMessage ? [errorMessage] : null} />

        <form action={saveField} className="admin-form">
          <input type="hidden" name="id" defaultValue={field?.id || 0} />

          <label>
            Số thứ tự field (VD 51, 52...)
            <input type="number" name="field_number" min={1} defaultValue={field?.field_number || ''} required />
          </label>

          <label>
            Label (VD &quot;Class:&quot;, &quot;Trip to:&quot;)
            <input type="text" name="field_label" defaultValue={field?.field_label || ''} required />
          </label>

          <label>
            Prefix trước ô nhập (VD &quot;£&quot;, để trống nếu không có)
            <input type="text" name="field_prefix" defaultValue={field?.field_prefix || ''} />
          </label>

          <label>
            Đáp án đúng (nhiều đáp án cách nhau bởi dấu &quot;|&quot;, VD &quot;Walton Zoo|Zoo&quot;)
            <input type="text" name="correct_answer" defaultValue={field?.correct_answer || ''} required />
          </label>

          <label>
            Giải thích (dựa vào câu nào trong thư/note)
            <textarea name="explanation" rows={3} defaultValue={field?.explanation || ''} />
          </label>

          <p className="admin-hint">
            Chấm điểm không phân biệt hoa/thường và tự gộp khoảng trắng thừa, nên không cần liệt kê từng biến thể viết
            hoa/thường trong đáp án đúng.
          </p>

          <button type="submit">Lưu</button>
          <a href="/admin/part6" className="btn-link">
            Huỷ
          </a>
        </form>
      </main>
    </>
  );
}
