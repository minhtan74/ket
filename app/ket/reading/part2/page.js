// Trang làm bài Reading Part 2 (Vocabulary - 5 câu kể chuyện, chọn A/B/C).
// Hiển thị TOÀN BỘ 100 câu (20 đề gộp lại) trong 1 lượt làm bài duy nhất,
// không còn bước chọn đề riêng lẻ. KHÔNG gửi correct_answer/explanation ra
// client trước khi nộp bài.

import NavTabs from '@/components/NavTabs';
import { getAllQuestions } from '@/lib/models/readingPart2';
import Part2Client from './Part2Client';

export const metadata = { title: 'KET Reading - Part 2' };

export default async function Part2Page() {
  const rows = await getAllQuestions();

  const questions = rows.map((q, i) => ({
    id: q.id,
    question_number: i + 1,
    question_text: q.question_text,
    option_a: q.option_a,
    option_b: q.option_b,
    option_c: q.option_c,
  }));

  return (
    <>
      <header className="site-header">
        <h1>KET Reading - Part 2</h1>
      </header>

      <NavTabs active="part2" />

      <main className="page">
        <section className="part-info">
          <h2>READING PART 2</h2>
          <p className="cloze-instructions">
            Đọc {questions.length} câu, mỗi câu có 1 chỗ trống. Chọn từ đúng nhất trong 3 lựa chọn A/B/C.
          </p>
        </section>

        <Part2Client questions={questions} />

        {questions.length === 0 && <p>Chưa có câu hỏi nào.</p>}
      </main>
    </>
  );
}
