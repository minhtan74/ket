<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= !empty($question['id']) ? 'Sửa câu hỏi' : 'Thêm câu hỏi' ?> - Part 7</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1><?= !empty($question['id']) ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới' ?> - <?= htmlspecialchars($test['title']) ?></h1>
</header>

<?php $activeAdminTab = 'admin7'; require __DIR__ . '/../partials/admin_nav_tabs.php'; ?>

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
        action="index.php?controller=admin_part7&amp;action=questionForm&amp;test_id=<?= (int) $test['id'] ?><?= !empty($question['id']) ? '&amp;id=' . (int) $question['id'] : '' ?>"
        class="admin-form"
    >
        <label>
            Số thứ tự câu hỏi (0 = EXAMPLE, hoặc 41-50...)
            <input type="number" name="question_number" min="0" value="<?= htmlspecialchars((string) ($question['question_number'] ?? '')) ?>" required>
        </label>

        <label>
            Đáp án đúng (nhiều đáp án cách nhau bởi dấu "|", VD "read")
            <input type="text" name="correct_answer" value="<?= htmlspecialchars($question['correct_answer'] ?? '') ?>" required>
        </label>

        <label>
            Ghi chú dữ liệu (nếu đáp án được suy luận lại từ bản scan mờ/thiếu — để trống nếu không có)
            <textarea name="note" rows="2"><?= htmlspecialchars($question['note'] ?? '') ?></textarea>
        </label>

        <p class="admin-hint">
            Nhớ chèn placeholder <code>{{<?= htmlspecialchars((string) ($question['question_number'] ?? 'n')) ?>}}</code>
            vào đúng vị trí trong nội dung thư (mục "Thư" ở màn hình quản lý), nếu không câu hỏi sẽ không hiện ra khi làm bài.
        </p>

        <button type="submit">Lưu</button>
        <a href="index.php?controller=admin_part7&amp;action=manage&amp;test_id=<?= (int) $test['id'] ?>" class="btn-link">Huỷ</a>
    </form>

</main>

</body>
</html>
