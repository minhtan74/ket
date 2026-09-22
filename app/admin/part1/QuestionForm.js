// Form thêm/sửa câu hỏi Part 1. Dùng chung cho question/new và question/[id].
import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { saveQuestion } from './actions';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export default function QuestionForm({ question, errorMessage }) {
  const isEdit = Boolean(question?.id);

  return (
    <>
      <header className="site-header">
        <h1>{isEdit ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'}</h1>
      </header>

      <AdminNavTabs active="admin1" />

      <main className="page">
        <FormErrors errors={errorMessage ? [errorMessage] : null} />

        <form action={saveQuestion} className="admin-form">
          <input type="hidden" name="id" defaultValue={question?.id || 0} />

          <label>
            Số thứ tự câu hỏi
            <input type="number" name="question_number" min={1} defaultValue={question?.question_number || ''} required />
          </label>

          <label>
            Nội dung câu hỏi
            <textarea name="question_text" rows={3} defaultValue={question?.question_text || ''} required />
          </label>

          <label>
            Đáp án đúng
            <select name="correct_answer" defaultValue={question?.correct_answer || ''} required>
              <option value="">-- Chọn --</option>
              {LETTERS.map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
          </label>

          <label>
            Giải thích
            <textarea name="explanation" rows={3} defaultValue={question?.explanation || ''} />
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
