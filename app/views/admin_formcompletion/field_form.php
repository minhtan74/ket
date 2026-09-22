<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= !empty($field['id']) ? 'Sửa field' : 'Thêm field' ?> - Part 6</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1><?= !empty($field['id']) ? 'Sửa field' : 'Thêm field mới' ?> (Part 6)</h1>
</header>

<?php $activeAdminTab = 'admin6'; require __DIR__ . '/../partials/admin_nav_tabs.php'; ?>

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
        action="index.php?controller=admin_formcompletion&amp;action=fieldForm<?= !empty($field['id']) ? '&amp;id=' . (int) $field['id'] : '' ?>"
        class="admin-form"
    >
        <label>
            Số thứ tự field (VD 51, 52...)
            <input type="number" name="field_number" min="1" value="<?= htmlspecialchars((string) ($field['field_number'] ?? '')) ?>" required>
        </label>

        <label>
            Label (VD "Class:", "Trip to:")
            <input type="text" name="field_label" value="<?= htmlspecialchars($field['field_label'] ?? '') ?>" required>
        </label>

        <label>
            Prefix trước ô nhập (VD "£", để trống nếu không có)
            <input type="text" name="field_prefix" value="<?= htmlspecialchars($field['field_prefix'] ?? '') ?>">
        </label>

        <label>
            Đáp án đúng (nhiều đáp án cách nhau bởi dấu "|", VD "Walton Zoo|Zoo")
            <input type="text" name="correct_answer" value="<?= htmlspecialchars($field['correct_answer'] ?? '') ?>" required>
        </label>

        <label>
            Giải thích (dựa vào câu nào trong thư/note)
            <textarea name="explanation" rows="3"><?= htmlspecialchars($field['explanation'] ?? '') ?></textarea>
        </label>

        <p class="admin-hint">
            Chấm điểm không phân biệt hoa/thường và tự gộp khoảng trắng thừa,
            nên không cần liệt kê từng biến thể viết hoa/thường trong đáp án đúng.
        </p>

        <button type="submit">Lưu</button>
        <a href="index.php?controller=admin_formcompletion&amp;action=index" class="btn-link">Huỷ</a>
    </form>

</main>

</body>
</html>
