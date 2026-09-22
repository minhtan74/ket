'use client';

// Trang chọn quyển KET + Test cho Part 7. Tương đương Part7Controller::browse()
// + app/views/part7/browse.php (đã gồm bản thiết kế nút Test dạng ô số + nhãn).

import { useState } from 'react';

export default function Part7Browse({ grouped }) {
  const [openGroup, setOpenGroup] = useState(null);

  return (
    <div className="p7-browse">
      {Object.entries(grouped).map(([ketLabel, testsInGroup]) => {
        const isOpen = openGroup === ketLabel;

        return (
          <div className="p7-ket-group" key={ketLabel}>
            <button
              type="button"
              className={`p7-ket-btn${isOpen ? ' open' : ''}`}
              onClick={() => setOpenGroup(isOpen ? null : ketLabel)}
            >
              <span className="part-badge">{(ketLabel.match(/\d+/) || ['?'])[0]}</span>
              <span className="p7-ket-label">{ketLabel}</span>
              <span className="p7-ket-count">{testsInGroup.length} đề</span>
              <span className="p7-ket-chevron" aria-hidden="true">
                &#9662;
              </span>
            </button>

            {isOpen && (
              <div className="p7-ket-panel">
                {testsInGroup.map((t, i) => (
                  <a key={t.id} className="p7-test-btn" href={`/ket/reading/part7?id=${t.id}`}>
                    <span className="p7-test-num">{i + 1}</span>
                    <span className="p7-test-label">{t.test_label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
