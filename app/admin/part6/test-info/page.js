// Form sửa văn bản + form Part 6. Tương đương AdminFormCompletionController::testForm().
import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { getTestById } from '@/lib/models/formcompletion';
import { saveTestInfo } from '../actions';

const DEFAULT_TEST_ID = 1;

export const metadata = { title: 'Sửa đề thi - Part 6' };

export default async function TestInfoPage({ searchParams }) {
  const sp = await searchParams;
  const test = await getTestById(DEFAULT_TEST_ID);

  return (
    <>
      <header className="site-header">
        <h1>Sửa văn bản / form (Part 6)</h1>
      </header>

      <AdminNavTabs active="admin6" />

      <main className="page">
        <FormErrors errors={sp?.error ? [sp.error] : null} />

        <form action={saveTestInfo} className="admin-form">
          <label>
            Tiêu đề đề thi
            <input type="text" name="title" defaultValue={test.title} required />
          </label>

          <label>
            Ngày của thư (văn bản 1, VD &quot;8 December&quot;)
            <input type="text" name="text1_date" defaultValue={test.text1_date} required />
          </label>

          <label>
            Nội dung thư (văn bản 1)
            <textarea name="text1_html" rows={6} defaultValue={test.text1_html} required />
          </label>

          <label>
            Chữ ký thư
            <input type="text" name="text1_signature" defaultValue={test.text1_signature} required />
          </label>

          <label>
            Nội dung note (văn bản 2)
            <textarea name="text2_html" rows={6} defaultValue={test.text2_html} required />
          </label>

          <label>
            Chữ ký note
            <input type="text" name="text2_signature" defaultValue={test.text2_signature} required />
          </label>

          <label>
            Tiêu đề form
            <input type="text" name="form_title" defaultValue={test.form_title} required />
          </label>

          <button type="submit">Lưu</button>
          <a href="/admin/part6" className="btn-link">
            Huỷ
          </a>
        </form>
      </main>
    </>
  );
}
