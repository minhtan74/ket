'use client';

// Form thêm/sửa câu hỏi Listening Part 1. Dùng chung cho question/new và
// question/[id]. Là Client Component vì cần toggle giữa đáp án dạng
// văn bản / hình ảnh (2 bộ input khác nhau) theo lựa chọn của admin.

import { useState } from 'react';
import AdminNavTabs from '@/components/AdminNavTabs';
import FormErrors from '@/components/FormErrors';
import { saveQuestion } from '../../actions';

const LETTERS = ['A', 'B', 'C'];

export default function QuestionForm({ testId, question, errorMessage }) {
  const isEdit = Boolean(question?.id);
  const [optionType, setOptionType] = useState(question?.option_type || 'text');
  const boundSaveQuestion = saveQuestion.bind(null, testId);

  return (
    <>
      <header className="site-header">
        <h1>{isEdit ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'}</h1>
      </header>

      <AdminNavTabs active="adminListening1" />

      <main className="page">
        <FormErrors errors={errorMessage ? [errorMessage] : null} />

        <form action={boundSaveQuestion} className="admin-form" encType="multipart/form-data">
          <input type="hidden" name="id" defaultValue={question?.id || 0} />

          <label>
            Số thứ tự câu hỏi (0 = Example)
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

          <label>
            File audio riêng cho câu này (mp3/wav/m4a/ogg, tối đa 10MB)
            {question?.audio_path && <audio controls src={`/${question.audio_path}`} style={{ marginBottom: 8, width: '100%' }} />}
            <input type="file" name="audio" accept=".mp3,.wav,.m4a,.ogg" />
          </label>

          <fieldset className="admin-fieldset">
            <legend>Kiểu đáp án</legend>
            <label className="admin-radio-label">
              <input type="radio" name="option_type" value="text" checked={optionType === 'text'} onChange={() => setOptionType('text')} />
              Văn bản / số
            </label>
            <label className="admin-radio-label">
              <input type="radio" name="option_type" value="image" checked={optionType === 'image'} onChange={() => setOptionType('image')} />
              Hình ảnh (mỗi đáp án 1 ảnh riêng)
            </label>
            <label className="admin-radio-label">
              <input type="radio" name="option_type" value="map" checked={optionType === 'map'} onChange={() => setOptionType('map')} />
              Bản đồ / ảnh dùng chung (nhãn A/B/C nằm sẵn trong ảnh)
            </label>
          </fieldset>

          {optionType === 'map' ? (
            <label>
              Ảnh sơ đồ/bản đồ dùng chung (đã có nhãn A, B, C bên trong ảnh)
              {question?.option_type === 'map' && question?.shared_image && (
                <img src={`/${question.shared_image}`} alt="Sơ đồ/bản đồ" className="admin-preview-image" style={{ maxWidth: 260, maxHeight: 260 }} />
              )}
              <input type="file" name="shared_image" accept=".jpg,.jpeg,.png,.gif,.svg" />
            </label>
          ) : (
            LETTERS.map((letter) => {
              const key = letter.toLowerCase();
              const currentValue = question?.[`option_${key}`] || '';

              return (
                <label key={letter}>
                  {`Đáp án ${letter}`}
                  {optionType === 'text' ? (
                    <input type="text" name={`option_${key}_text`} defaultValue={question?.option_type === 'text' ? currentValue : ''} />
                  ) : (
                    <>
                      {question?.option_type === 'image' && currentValue && (
                        <img src={`/${currentValue}`} alt={`Đáp án ${letter}`} className="admin-preview-image" style={{ maxWidth: 120, maxHeight: 120 }} />
                      )}
                      <input type="file" name={`option_${key}_image`} accept=".jpg,.jpeg,.png,.gif,.svg" />
                    </>
                  )}
                </label>
              );
            })
          )}

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
          <a href={`/admin/listening/part1/manage/${testId}`} className="btn-link">Huỷ</a>
        </form>
      </main>
    </>
  );
}
