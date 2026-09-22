// Form thêm/sửa thư Part 7. Dùng chung cho letter/new và letter/[letterId].
import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { saveLetter } from '../../actions';

export default function LetterForm({ test, letter, errorMessage }) {
  const isEdit = Boolean(letter?.id);
  const saveLetterForTest = saveLetter.bind(null, test.id);

  return (
    <>
      <header className="site-header">
        <h1>
          {isEdit ? 'Sửa thư' : 'Thêm thư mới'} - {test.title}
        </h1>
      </header>

      <AdminNavTabs active="admin7" />

      <main className="page">
        <FormErrors errors={errorMessage ? [errorMessage] : null} />

        <p className="admin-hint">
          Đánh dấu chỗ trống trong &quot;Nội dung thư&quot; bằng <code>{'{{0}}'}</code> (example),{' '}
          <code>{'{{41}}'}</code>...<code>{'{{50}}'}</code>. Xuống dòng đoạn mới thì cách nhau 1 dòng trống.
        </p>

        <form action={saveLetterForTest} className="admin-form">
          <input type="hidden" name="id" defaultValue={letter?.id || 0} />

          <label>
            Thứ tự thư (1 = thư đầu, 2 = thư trả lời...)
            <input type="number" name="letter_order" min={1} defaultValue={letter?.letter_order || 1} required />
          </label>

          <label>
            Dateline (địa danh/ngày ở góc trên phải, để trống nếu không có)
            <input type="text" name="dateline" defaultValue={letter?.dateline || ''} />
          </label>

          <label>
            Lời chào đầu thư (VD &quot;Dear Sir,&quot;)
            <input type="text" name="salutation" defaultValue={letter?.salutation || ''} required />
          </label>

          <label>
            Nội dung thư
            <textarea name="body_html" rows={8} defaultValue={letter?.body_html || ''} required />
          </label>

          <label>
            Lời chào cuối thư (VD &quot;Yours,&quot;)
            <input type="text" name="closing" defaultValue={letter?.closing || ''} required />
          </label>

          <label>
            Chữ ký
            <input type="text" name="signature" defaultValue={letter?.signature || ''} required />
          </label>

          <button type="submit">Lưu</button>
          <a href={`/admin/part7/manage/${test.id}`} className="btn-link">
            Huỷ
          </a>
        </form>
      </main>
    </>
  );
}
