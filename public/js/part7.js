// JavaScript thuần cho KET Reading Part 7 (Complete the Letter(s)).
// Giống Part 5: ô nhập tự do, kiểm tra đủ số câu + confirm trước khi nộp.
// Thêm riêng: nút ẩn/hiện bảng gợi ý (tính năng đặc trưng của Part 7).
// PHP vẫn validate lại toàn bộ dữ liệu ở server khi nộp bài (không tin JS).

document.addEventListener('DOMContentLoaded', function () {
    // ----- Trang làm bài (index.php): chỉ có khi ở trang này -----
    var form = document.getElementById('part7-form');

    if (form) {
        var inputs = document.querySelectorAll('.oc-input');

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var filledCount = 0;

            inputs.forEach(function (input) {
                if (input.value.trim() !== '') {
                    filledCount++;
                }
            });

            if (filledCount < inputs.length) {
                alert('Vui lòng điền đầy đủ ' + inputs.length + ' câu.');
                return;
            }

            var confirmed = confirm(
                'Bạn đã điền ' + filledCount + '/' + inputs.length + ' câu.\n\n' +
                'Bạn có chắc chắn muốn nộp bài?'
            );

            if (confirmed) {
                form.submit();
            }
        });
    }

    var hintsToggle = document.getElementById('p7-hints-toggle');
    var hintsPanel = document.getElementById('p7-hints-panel');

    if (hintsToggle && hintsPanel) {
        hintsToggle.addEventListener('click', function () {
            hintsPanel.classList.toggle('hidden');
        });
    }

    // ----- Trang chọn đề (browse.php): bấm 1 nút KET để mở/đóng danh sách
    // Test của KET đó. Không dùng AJAX, chỉ show/hide DOM có sẵn. -----
    var ketButtons = document.querySelectorAll('.p7-ket-btn');

    ketButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var panel = document.getElementById(button.getAttribute('data-target'));
            if (!panel) {
                return;
            }

            var isOpening = panel.classList.contains('hidden');
            panel.classList.toggle('hidden');
            button.classList.toggle('open', isOpening);
        });
    });
});
