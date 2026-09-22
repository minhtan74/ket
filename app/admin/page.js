// Trang hub Admin: điểm vào nhanh cho từng khu quản trị. Bản PHP gốc không có
// trang tổng hợp này (mỗi Part có URL admin riêng), nhưng thêm 1 trang hub đơn
// giản ở đây giúp điều hướng dễ hơn, không thay đổi logic nghiệp vụ nào.
export const metadata = { title: 'Quản trị nội dung' };

export default function AdminHubPage() {
  return (
    <>
      <header className="site-header">
        <h1>Quản trị nội dung KET Practice</h1>
      </header>

      <main className="page">
        <ul className="part-list">
          <li className="part-item available">
            <a href="/admin/part1">
              <span className="part-badge">1</span>
              <span className="part-meta">
                <span className="part-title">Quản trị Part 1</span>
                <span className="part-desc">Câu hỏi, đáp án A-H, ảnh đề thi</span>
              </span>
              <span className="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
          <li className="part-item available">
            <a href="/admin/part4">
              <span className="part-badge">4</span>
              <span className="part-meta">
                <span className="part-title">Quản trị Part 4</span>
                <span className="part-desc">Đoạn văn Cloze, các chỗ trống A/B/C</span>
              </span>
              <span className="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
          <li className="part-item available">
            <a href="/admin/part6">
              <span className="part-badge">6</span>
              <span className="part-meta">
                <span className="part-title">Quản trị Part 6</span>
                <span className="part-desc">Thư, note và các field trong form</span>
              </span>
              <span className="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
          <li className="part-item available">
            <a href="/admin/part7">
              <span className="part-badge">7</span>
              <span className="part-meta">
                <span className="part-title">Quản trị Part 7</span>
                <span className="part-desc">Danh sách đề, thư và câu hỏi từng đề</span>
              </span>
              <span className="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
        </ul>

        <p style={{ marginTop: 24 }}>
          <a href="/" className="btn-link">
            &larr; Trang chủ
          </a>
        </p>
      </main>
    </>
  );
}
