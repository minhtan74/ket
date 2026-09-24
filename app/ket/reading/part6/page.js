// Trang làm bài Reading Part 6 (Word Completion - đoán từ từ định nghĩa).
// Hiển thị TOÀN BỘ 100 câu (20 đề gộp lại) trong 1 lượt làm bài duy nhất,
// không còn bước chọn đề riêng lẻ. Mỗi câu chỉ có 1 định nghĩa + 1 ô gõ đáp
// án (không có A/B/C). KHÔNG gửi correct_answer/explanation ra client
// trước khi nộp bài.

import NavTabs from '@/components/NavTabs';
import { getAllQuestions } from '@/lib/models/wordCompletion';
import Part6Client from './Part6Client';

export const metadata = { title: 'KET Reading - Part 6' };

export default async function Part6Page() {
  const rows = await getAllQuestions();

  // Gửi độ dài từ (word_length) và chữ cái đầu (first_letter) làm gợi ý,
  // suy ra từ correct_answer ở server - KHÔNG gửi cả từ đúng ra client.
  const questions = rows.map((q, i) => ({
    id: q.id,
    question_number: i + 1,
    question_text: q.question_text,
    first_letter: q.correct_answer.charAt(0),
    word_length: q.correct_answer.length,
  }));

  return (
    <>
      <header className="site-header">
        <h1>KET Reading - Part 6</h1>
      </header>

      <NavTabs active="part6" />

      <main className="page">
        <section className="part-info">
          <h2>READING PART 6</h2>
          <p className="cloze-instructions">
            Đọc {questions.length} định nghĩa tiếng Anh và gõ đúng từ được mô tả.
          </p>
        </section>

        <Part6Client questions={questions} />

        {questions.length === 0 && <p>Chưa có câu hỏi nào.</p>}
      </main>
    </>
  );
}
