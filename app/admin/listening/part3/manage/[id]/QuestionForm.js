// Form thêm/sửa câu hỏi Listening Part 3. Dùng chung cho question/new và
// question/[id]. Đơn giản hơn QuestionForm của Part 1 vì đáp án Part 3 luôn
// là văn bản (không cần toggle văn bản/hình ảnh/bản đồ), nên không cần là
// Client Component.

import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { saveQuestion } from '../../actions';

const LETTERS = ['A', 'B', 'C'];

export default function QuestionForm({ testId, question, errorMessage }) {
  const isEdit = Boolean(question?.id);
  const boundSaveQuestion = saveQuestion.bind(null, testId);

  return (
    <>
      <header className="site-header">
        <h1>{isEdit ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'}</h1>
      </header>

      <AdminNavTabs active="adminListening3" />

      <main className="page">
        <FormErrors errors={errorMessage ? [errorMessage] : null} />

        <form action={boundSaveQuestion} className="admin-form">
          <input type="hidden" name="id" defaultValue={question?.id || 0} />

          <label>
            Số thứ tự câu hỏi (VD 10 = Example, 11-15 = câu thật)
            <input type="number" name="question_number" min={0} defaultValue={question?.question_number ?? ''} required />
          </label>

          <label className="admin-checkbox-label">
            <input type="checkbox" name="is_example" defaultChecked={Boolean(question?.is_example)} />
            Đây là câu Example (hiển thị sẵn đáp án, không tính điểm)
          </label>

          <label>
            Nội dung câu hỏi
            <textarea name="question_text" rows={2} defaultValue={question?.question_text || ''} required />
          </label>

          {LETTERS.map((letter) => {
            const key = letter.toLowerCase();
            return (
              <label key={letter}>
                {`Đáp án ${letter}`}
                <input type="text" name={`option_${key}`} defaultValue={question?.[`option_${key}`] || ''} required />
              </label>
            );
          })}

          <label>
            Đáp án đúng
            <select name="correct_answer" defaultValue={question?.correct_answer || ''} required>
              <option value="">-- Chọn --</option>
              {LETTERS.map((letter) => (
                <option key={letter} value={letter}>{letter}</option>
              ))}
            </select>
          </label>

          <label>
            Giải thích
            <textarea name="explanation" rows={2} defaultValue={question?.explanation || ''} />
          </label>

          <button type="submit">Lưu</button>
          <a href={`/admin/listening/part3/manage/${testId}`} className="btn-link">Huỷ</a>
        </form>
      </main>
    </>
  );
}
