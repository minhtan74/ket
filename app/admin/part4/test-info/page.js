// Form sửa tiêu đề + đoạn văn Part 4. Tương đương AdminPart4Controller::testForm().
import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { getTestById } from '@/lib/models/part4';
import { saveTestInfo } from '../actions';

const DEFAULT_TEST_ID = 1;

export const metadata = { title: 'Sửa đề thi - Part 4' };

export default async function TestInfoPage({ searchParams }) {
  const sp = await searchParams;
  const test = await getTestById(DEFAULT_TEST_ID);

  return (
    <>
      <header className="site-header">
        <h1>Sửa thông tin đề thi (Part 4)</h1>
      </header>

      <AdminNavTabs active="admin4" />

      <main className="page">
        <FormErrors errors={sp?.error ? [sp.error] : null} />

        <p className="admin-hint">
          Chỗ trống trong đoạn văn được đánh dấu bằng <code>{'{{0}}'}</code>, <code>{'{{28}}'}</code>... đúng với số
          thứ tự câu hỏi ở trang danh sách. Đoạn văn phải chứa đủ placeholder cho tất cả câu hỏi hiện có thì mới lưu
          được.
        </p>

        <form action={saveTestInfo} className="admin-form">
          <label>
            Tiêu đề đề thi
            <input type="text" name="title" defaultValue={test.title} required />
          </label>

          <label>
            Đoạn văn (passage)
            <textarea name="passage_html" rows={10} defaultValue={test.passage_html} required />
          </label>

          <button type="submit">Lưu</button>
          <a href="/admin/part4" className="btn-link">
            Huỷ
          </a>
        </form>
      </main>
    </>
  );
}
