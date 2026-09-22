// JavaScript thuần cho trang làm bài Matching (KET Reading Part 1).
// 3 việc: (1) không cho chọn trùng đáp án, (2) kiểm tra đã trả lời đủ,
// (3) xác nhận trước khi Submit. PHP vẫn phải validate lại toàn bộ dữ liệu này.

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('exam-form');
    var selects = document.querySelectorAll('.answer-select');

    // Đáp án đã chọn ở select này thì bị disable ở các select khác,
    // để mỗi đáp án A-H chỉ dùng được một lần. Người dùng vẫn đổi được
    // đáp án của mình bất cứ lúc nào (chỉ disable ở CÁC SELECT KHÁC).
    function updateOptionsState() {
        var selectedValues = [];
        selects.forEach(function (select) {
            if (select.value !== '') {
                selectedValues.push(select.value);
            }
        });

        selects.forEach(function (select) {
            var currentValue = select.value;

            Array.prototype.forEach.call(select.options, function (option) {
                if (option.value === '') {
                    return;
                }

                if (option.value === currentValue) {
                    option.disabled = false;
                    return;
                }

                option.disabled = selectedValues.indexOf(option.value) !== -1;
            });
        });
    }

    selects.forEach(function (select) {
        select.addEventListener('change', updateOptionsState);
    });

    updateOptionsState();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var answeredCount = 0;
        var usedLetters = {};
        var duplicateFound = false;

        selects.forEach(function (select) {
            var value = select.value;

            if (value !== '') {
                answeredCount++;

                if (usedLetters[value]) {
                    duplicateFound = true;
                }
                usedLetters[value] = true;
            }
        });

        if (duplicateFound) {
            alert('Đáp án này đã được sử dụng cho câu khác.');
            return;
        }

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
