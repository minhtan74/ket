// JavaScript thuần cho KET Reading Part 4 (Multiple Choice Cloze).
// Chỉ 2 việc: (1) kiểm tra đã trả lời đủ các câu 28-35, (2) xác nhận trước
// khi Submit. Không cần chống trùng đáp án vì mỗi câu chọn A/B/C độc lập.
// PHP vẫn phải validate lại toàn bộ dữ liệu này (không tin JS).

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('cloze-form');

    // Câu EXAMPLE có class "cloze-example" và bị disabled -> loại khỏi kiểm tra.
    var selects = document.querySelectorAll('.cloze-select:not(.cloze-example)');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var answeredCount = 0;

        selects.forEach(function (select) {
            if (select.value !== '') {
                answeredCount++;
            }
        });

        if (answeredCount < selects.length) {
            alert('Vui lòng trả lời đầy đủ ' + selects.length + ' câu.');
            return;
        }

        var confirmed = confirm(
            'Bạn đã trả lời ' + answeredCount + '/' + selects.length + ' câu.\n\n' +
            'Bạn có chắc chắn muốn nộp bài?'
        );

        if (confirmed) {
            form.submit();
        }
    });
});
