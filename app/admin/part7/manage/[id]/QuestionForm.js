// Form thêm/sửa câu hỏi Part 7. Dùng chung cho question/new và question/[qId].
import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { saveQuestion } from '../../actions';

export default function QuestionForm({ test, question, errorMessage }) {
  const isEdit = Boolean(question?.id);
  const saveQuestionForTest = saveQuestion.bind(null, test.id);

  return (
    <>
      <header className="site-header">
        <h1>
          {isEdit ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'} - {test.title}
        </h1>
      </header>

      <AdminNavTabs active="admin7" />

      <main className="page">
        <FormErrors errors={errorMessage ? [errorMessage] : null} />

        <form action={saveQuestionForTest} className="admin-form">
          <input type="hidden" name="id" defaultValue={question?.id || 0} />

          <label>
            Số thứ tự câu hỏi (0 = EXAMPLE, hoặc 41-50...)
            <input type="number" name="question_number" min={0} defaultValue={question?.question_number ?? ''} required />
          </label>

          <label>
            Đáp án đúng (nhiều đáp án cách nhau bởi dấu &quot;|&quot;, VD &quot;read&quot;)
            <input type="text" name="correct_answer" defaultValue={question?.correct_answer || ''} required />
          </label>

          <label>
            Ghi chú dữ liệu (nếu đáp án được suy luận lại từ bản scan mờ/thiếu — để trống nếu không có)
            <textarea name="note" rows={2} defaultValue={question?.note || ''} />
          </label>

          <p className="admin-hint">
            Nhớ chèn placeholder <code>{`{{${question?.question_number ?? 'n'}}}`}</code> vào đúng vị trí trong nội
            dung thư (mục &quot;Thư&quot; ở màn hình quản lý), nếu không câu hỏi sẽ không hiện ra khi làm bài.
          </p>

          <button type="submit">Lưu</button>
          <a href={`/admin/part7/manage/${test.id}`} className="btn-link">
            Huỷ
          </a>
        </form>
      </main>
    </>
  );
}
