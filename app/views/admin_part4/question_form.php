<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= !empty($question['id']) ? 'Sửa câu hỏi' : 'Thêm câu hỏi' ?> - Part 4</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1><?= !empty($question['id']) ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới' ?> (Part 4)</h1>
</header>

<?php $activeAdminTab = 'admin4'; require __DIR__ . '/../partials/admin_nav_tabs.php'; ?>

<main class="page">

    <?php if (!empty($errors)): ?>
    <div class="flash-error">
        <?php foreach ($errors as $error): ?>
            <p><?= htmlspecialchars($error) ?></p>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>

    <form
        method="POST"
        action="index.php?controller=admin_part4&amp;action=questionForm<?= !empty($question['id']) ? '&amp;id=' . (int) $question['id'] : '' ?>"
        class="admin-form"
    >
        <label>
            Số thứ tự câu hỏi (0 = EXAMPLE, hoặc 28-35...)
            <input type="number" name="question_number" min="0" value="<?= htmlspecialchars((string) ($question['question_number'] ?? '')) ?>" required>
        </label>

        <label>
            Lựa chọn A
            <input type="text" name="option_a" value="<?= htmlspecialchars($question['option_a'] ?? '') ?>" required>
        </label>

        <label>
            Lựa chọn B
            <input type="text" name="option_b" value="<?= htmlspecialchars($question['option_b'] ?? '') ?>" required>
        </label>

        <label>
            Lựa chọn C
            <input type="text" name="option_c" value="<?= htmlspecialchars($question['option_c'] ?? '') ?>" required>
        </label>

        <label>
            Đáp án đúng
            <select name="correct_answer" required>
                <option value="">-- Chọn --</option>
                <?php foreach (['A', 'B', 'C'] as $letter): ?>
                <option value="<?= $letter ?>" <?= (($question['correct_answer'] ?? '') === $letter) ? 'selected' : '' ?>><?= $letter ?></option>
                <?php endforeach; ?>
            </select>
        </label>

        <p class="admin-hint">
            Lưu ý: nếu thêm câu mới với số thứ tự khác 0, nhớ thêm placeholder
            <code>{{n}}</code> tương ứng vào đoạn văn (mục "Sửa tiêu đề / đoạn văn"),
            nếu không câu hỏi sẽ không hiển thị trong bài làm.
        </p>

        <button type="submit">Lưu</button>
        <a href="index.php?controller=admin_part4&amp;action=index" class="btn-link">Huỷ</a>
    </form>

</main>

</body>
</html>
