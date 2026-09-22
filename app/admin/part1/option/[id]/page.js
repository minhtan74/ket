// Form sửa nội dung 1 đáp án (A-H). Tương đương AdminController::optionForm().
import { redirect } from 'next/navigation';
import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { getOptionById } from '@/lib/models/part1';
import { saveOption } from '../../actions';

export const metadata = { title: 'Sửa đáp án - Part 1' };

export default async function EditOptionPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const option = await getOptionById(Number(id));

  if (!option) {
    redirect('/admin/part1');
  }

  const saveOptionWithId = saveOption.bind(null, option.id);

  return (
    <>
      <header className="site-header">
        <h1>Sửa đáp án {option.option_letter}</h1>
      </header>

      <AdminNavTabs active="admin1" />

      <main className="page">
        <FormErrors errors={sp?.error ? [sp.error] : null} />

        <form action={saveOptionWithId} className="admin-form">
          <label>
            Nội dung đáp án {option.option_letter}
            <textarea name="option_text" rows={3} defaultValue={option.option_text} required />
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
