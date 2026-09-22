<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= !empty($question['id']) ? 'Sửa câu hỏi' : 'Thêm câu hỏi' ?></title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1><?= !empty($question['id']) ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới' ?></h1>
</header>

<?php $activeAdminTab = 'admin1'; require __DIR__ . '/../partials/admin_nav_tabs.php'; ?>

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
        action="index.php?controller=admin&amp;action=questionForm<?= !empty($question['id']) ? '&amp;id=' . (int) $question['id'] : '' ?>"
        class="admin-form"
    >
        <label>
            Số thứ tự câu hỏi
            <input type="number" name="question_number" min="1" value="<?= htmlspecialchars((string) ($question['question_number'] ?? '')) ?>" required>
        </label>

        <label>
            Nội dung câu hỏi
            <textarea name="question_text" rows="3" required><?= htmlspecialchars($question['question_text'] ?? '') ?></textarea>
        </label>

        <label>
            Đáp án đúng
            <select name="correct_answer" required>
                <option value="">-- Chọn --</option>
                <?php foreach (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as $letter): ?>
                <option value="<?= $letter ?>" <?= (($question['correct_answer'] ?? '') === $letter) ? 'selected' : '' ?>><?= $letter ?></option>
                <?php endforeach; ?>
            </select>
        </label>

        <label>
            Giải thích
            <textarea name="explanation" rows="3"><?= htmlspecialchars($question['explanation'] ?? '') ?></textarea>
        </label>

        <button type="submit">Lưu</button>
        <a href="index.php?controller=admin&amp;action=index" class="btn-link">Huỷ</a>
    </form>

</main>

</body>
</html>
