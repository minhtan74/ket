// Form thêm/sửa chỗ trống Part 4. Dùng chung cho question/new và question/[id].
import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { saveQuestion } from './actions';

export default function QuestionForm({ question, errorMessage }) {
  const isEdit = Boolean(question?.id);

  return (
    <>
      <header className="site-header">
        <h1>{isEdit ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'} (Part 4)</h1>
      </header>

      <AdminNavTabs active="admin4" />

      <main className="page">
        <FormErrors errors={errorMessage ? [errorMessage] : null} />

        <form action={saveQuestion} className="admin-form">
          <input type="hidden" name="id" defaultValue={question?.id || 0} />

          <label>
            Số thứ tự câu hỏi (0 = EXAMPLE, hoặc 28-35...)
            <input type="number" name="question_number" min={0} defaultValue={question?.question_number ?? ''} required />
          </label>

          <label>
            Lựa chọn A
            <input type="text" name="option_a" defaultValue={question?.option_a || ''} required />
          </label>

          <label>
            Lựa chọn B
            <input type="text" name="option_b" defaultValue={question?.option_b || ''} required />
          </label>

          <label>
            Lựa chọn C
            <input type="text" name="option_c" defaultValue={question?.option_c || ''} required />
          </label>

          <label>
            Đáp án đúng
            <select name="correct_answer" defaultValue={question?.correct_answer || ''} required>
              <option value="">-- Chọn --</option>
              {['A', 'B', 'C'].map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
          </label>

          <p className="admin-hint">
            Lưu ý: nếu thêm câu mới với số thứ tự khác 0, nhớ thêm placeholder <code>{'{{n}}'}</code> tương ứng vào
            đoạn văn (mục &quot;Sửa tiêu đề / đoạn văn&quot;), nếu không câu hỏi sẽ không hiển thị trong bài làm.
          </p>

          <button type="submit">Lưu</button>
          <a href="/admin/part4" className="btn-link">
            Huỷ
          </a>
        </form>
      </main>
    </>
  );
}
