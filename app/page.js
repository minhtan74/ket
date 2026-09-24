// Trang chủ. Tương đương app/views/home/index.php của bản PHP.
import NavTabs from '@/components/NavTabs';

export const metadata = { title: 'KET Practice' };

export default function HomePage() {
  return (
    <>
      <header className="site-header">
        <h1>KET PRACTICE</h1>
        <p className="site-header-sub">Luyện thi Cambridge KET (A2 Key) — Reading &amp; Writing</p>
      </header>

      <NavTabs active="home" />

      <main className="page">
        <h2>Reading</h2>

        <ul className="part-list">
          <li className="part-item available">
            <a href="/ket/reading/part1?id=1">
              <span className="part-badge">1</span>
              <span className="part-meta">
                <span className="part-title">Reading Part 1</span>
                <span className="part-desc">Matching — đọc 5 câu, ghép với 8 biển báo / thông báo</span>
              </span>
              <span className="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
          <li className="part-item available">
            <a href="/ket/reading/part2">
              <span className="part-badge">2</span>
              <span className="part-meta">
                <span className="part-title">Reading Part 2</span>
                <span className="part-desc">Vocabulary — 100 câu, chọn A/B/C</span>
              </span>
              <span className="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
          <li className="part-item available">
            <a href="/ket/reading/part3">
              <span className="part-badge">3</span>
              <span className="part-meta">
                <span className="part-title">Reading Part 3 <small>(Matching Response)</small></span>
                <span className="part-desc">100 câu — chọn phản hồi đúng cho câu nói/câu hỏi</span>
              </span>
              <span className="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
          <li className="part-item available">
            <a href="/ket/reading/part4?id=1">
              <span className="part-badge">4</span>
              <span className="part-meta">
                <span className="part-title">Reading Part 4</span>
                <span className="part-desc">Multiple Choice Cloze — đoạn văn 8 chỗ trống, chọn A/B/C</span>
              </span>
              <span className="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
          <li className="part-item available">
            <a href="/ket/reading/part5?id=1">
              <span className="part-badge">5</span>
              <span className="part-meta">
                <span className="part-title">Reading Part 5 <small>(Open Cloze)</small></span>
                <span className="part-desc">Đọc 2 lá thư, tự gõ 1 từ vào mỗi chỗ trống</span>
              </span>
              <span className="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
          <li className="part-item available">
            <a href="/ket/reading/part6">
              <span className="part-badge">6</span>
              <span className="part-meta">
                <span className="part-title">Reading Part 6 <small>(Word Completion)</small></span>
                <span className="part-desc">100 câu — đoán từ từ định nghĩa tiếng Anh</span>
              </span>
              <span className="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
          <li className="part-item available">
            <a href="/ket/reading/part7">
              <span className="part-badge">7</span>
              <span className="part-meta">
                <span className="part-title">Reading Part 7 <small>(Complete the Letter)</small></span>
                <span className="part-desc">20 đề — chọn quyển KET 2&ndash;6, mỗi quyển 4 Test</span>
              </span>
              <span className="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
        </ul>

        <h2 style={{ marginTop: 32 }}>Listening</h2>

        <ul className="part-list">
          <li className="part-item available">
            <a href="/ket/listening/part1">
              <span className="part-badge">1</span>
              <span className="part-meta">
                <span className="part-title">Listening 1</span>
                <span className="part-desc">Nghe 5 hội thoại ngắn, chọn tranh/đáp án A/B/C — nhiều đề</span>
              </span>
              <span className="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
          <li className="part-item disabled">
            <span className="part-badge">2</span>
            <span className="part-meta">
              <span className="part-title">Listening Part 2</span>
              <span className="part-desc">Chưa triển khai</span>
            </span>
            <span className="coming-soon">Coming soon</span>
          </li>
          <li className="part-item disabled">
            <span className="part-badge">3</span>
            <span className="part-meta">
              <span className="part-title">Listening Part 3</span>
              <span className="part-desc">Chưa triển khai</span>
            </span>
            <span className="coming-soon">Coming soon</span>
          </li>
          <li className="part-item disabled">
            <span className="part-badge">4</span>
            <span className="part-meta">
              <span className="part-title">Listening Part 4</span>
              <span className="part-desc">Chưa triển khai</span>
            </span>
            <span className="coming-soon">Coming soon</span>
          </li>
          <li className="part-item disabled">
            <span className="part-badge">5</span>
            <span className="part-meta">
              <span className="part-title">Listening Part 5</span>
              <span className="part-desc">Chưa triển khai</span>
            </span>
            <span className="coming-soon">Coming soon</span>
          </li>
        </ul>

        <a className="admin-entry" href="/admin">
          <span>⚙ Quản trị nội dung (Admin)</span>
          <span className="part-arrow" aria-hidden="true">&rarr;</span>
        </a>
      </main>
    </>
  );
}
