// Khối hiển thị điểm số ở đầu trang kết quả. Dùng chung cho Part 1/4/5/6/7.
export default function ScoreSummary({ correct, total, wrong, accuracy }) {
  return (
    <section className="score-summary">
      <p className="score-line">
        Score: {correct} / {total}
      </p>
      <p>Correct: {correct}</p>
      <p>Wrong: {wrong}</p>
      <p>Accuracy: {accuracy}%</p>
    </section>
  );
}
