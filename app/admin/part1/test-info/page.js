// Form sửa tiêu đề + ảnh đề thi Part 1. Tương đương AdminController::testForm().
import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { getTestById } from '@/lib/models/part1';
import { saveTestInfo } from '../actions';

const DEFAULT_TEST_ID = 1;

export const metadata = { title: 'Sửa thông tin đề thi - Part 1' };

export default async function TestInfoPage({ searchParams }) {
  const sp = await searchParams;
  const test = await getTestById(DEFAULT_TEST_ID);

  return (
    <>
      <header className="site-header">
        <h1>Sửa thông tin đề thi</h1>
      </header>

      <AdminNavTabs active="admin1" />

      <main className="page">
        <FormErrors errors={sp?.error ? [sp.error] : null} />

        <form action={saveTestInfo} encType="multipart/form-data" className="admin-form">
          <label>
            Tiêu đề đề thi
            <input type="text" name="title" defaultValue={test.title} required />
          </label>

          <label>
            Ảnh hiện tại
            <img src={`/${test.image}`} alt="Ảnh đề thi" className="admin-preview-image" />
          </label>

          <label>
            Tải ảnh mới lên (để trống nếu không đổi)
            <input type="file" name="image" accept=".jpg,.jpeg,.png,.gif" />
          </label>

          <button type="submit">Lưu</button>
          <a href="/admin/part1" className="btn-link">
            Huỷ
          </a>
        </form>
      </main>
    </>
  );
}
