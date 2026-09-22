// JavaScript thuần cho KET Open Cloze (Letter Completion).
// Khác Part 4: đây là ô nhập tự do (input text), không phải select A/B/C.
// Chỉ kiểm tra đã điền đủ 10/10 ô (không kiểm tra đúng/sai) trước khi
// cho phép Submit, và xác nhận trước khi nộp bài. PHP vẫn validate lại
// toàn bộ dữ liệu này ở server (không tin JS).

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('opencloze-form');
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
});
