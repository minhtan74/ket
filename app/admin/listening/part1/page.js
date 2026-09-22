// Trang danh sách đề Listening Part 1, gom nhóm theo quyển KET (giống Admin
// Part 7). Tương đương AdminController::index() nhưng cho phép nhiều đề.

import AdminNavTabs from '@/components/AdminNavTabs';
import AdminFlash from '@/components/AdminFlash';
import DeleteButton from '@/components/DeleteButton';
import { getAllTests } from '@/lib/models/listeningPart1';
import { deleteTestAction } from './actions';

export const metadata = { title: 'Quản trị - KET Listening 1' };

export default async function AdminListeningPart1Page({ searchParams }) {
  const params = await searchParams;
  const tests = await getAllTests();

  const grouped = {};
  for (const test of tests) {
    const groupLabel = test.ket_group !== '' ? test.ket_group : 'Khác';
    if (!grouped[groupLabel]) grouped[groupLabel] = [];
    grouped[groupLabel].push(test);
  }

  return (
    <>
      <header className="site-header">
        <h1>Quản trị đề thi - KET Listening 1</h1>
      </header>

      <AdminNavTabs active="adminListening1" />

      <main className="page">
        <AdminFlash
          msg={params?.msg}
          messages={{ saved: 'Đã lưu thành công.', created: 'Đã tạo đề mới.', deleted: 'Đã xoá.' }}
        />

        <section className="admin-section">
          <h2>Danh sách đề ({tests.length})</h2>
          <p>
            <a href="/admin/listening/part1/test/new" className="btn-link btn-add">
              + Thêm đề mới
            </a>
          </p>
        </section>

        {Object.entries(grouped).map(([ketLabel, testsInGroup]) => (
          <section className="admin-section admin-ket-group" key={ketLabel}>
            <h2 className="admin-ket-heading">
              {ketLabel} <span className="p7-ket-count">{testsInGroup.length} đề</span>
            </h2>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Tiêu đề</th>
                  <th>Số câu (1-5)</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {testsInGroup.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <strong>{t.test_label !== '' ? t.test_label : '#' + t.id}</strong>
                    </td>
                    <td>{t.title}</td>
                    <td>{t.question_count}</td>
                    <td className="admin-actions">
                      <a href={`/admin/listening/part1/manage/${t.id}`}>Quản lý</a>
                      <a href={`/admin/listening/part1/test/${t.id}`}>Sửa</a>
                      <form action={deleteTestAction.bind(null, t.id)}>
                        <DeleteButton message="Xoá cả đề này (gồm toàn bộ câu hỏi)?" />
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}

        {tests.length === 0 && (
          <section className="admin-section">
            <p>Chưa có đề nào.</p>
          </section>
        )}
      </main>
    </>
  );
}
