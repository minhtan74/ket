// JavaScript thuần cho KET Reading Part 6 (Form Completion).
// Chỉ kiểm tra đã điền đủ 5/5 ô của form (không rỗng) trước khi cho phép
// Submit, và xác nhận trước khi nộp bài. PHP vẫn validate lại toàn bộ dữ
// liệu này ở server (không tin JS).

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form-completion-form');
    var inputs = document.querySelectorAll('.fc-input');

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
});
