<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= !empty($letter['id']) ? 'Sửa thư' : 'Thêm thư' ?> - Part 7</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1><?= !empty($letter['id']) ? 'Sửa thư' : 'Thêm thư mới' ?> - <?= htmlspecialchars($test['title']) ?></h1>
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

    <p class="admin-hint">
        Đánh dấu chỗ trống trong "Nội dung thư" bằng <code>{{0}}</code> (example), <code>{{41}}</code>...<code>{{50}}</code>.
        Xuống dòng đoạn mới thì cách nhau 1 dòng trống.
    </p>

    <form
        method="POST"
        action="index.php?controller=admin_part7&amp;action=letterForm&amp;test_id=<?= (int) $test['id'] ?><?= !empty($letter['id']) ? '&amp;id=' . (int) $letter['id'] : '' ?>"
        class="admin-form"
    >
        <label>
            Thứ tự thư (1 = thư đầu, 2 = thư trả lời...)
            <input type="number" name="letter_order" min="1" value="<?= htmlspecialchars((string) ($letter['letter_order'] ?? '1')) ?>" required>
        </label>

        <label>
            Dateline (địa danh/ngày ở góc trên phải, để trống nếu không có)
            <input type="text" name="dateline" value="<?= htmlspecialchars($letter['dateline'] ?? '') ?>">
        </label>

        <label>
            Lời chào đầu thư (VD "Dear Sir,")
            <input type="text" name="salutation" value="<?= htmlspecialchars($letter['salutation'] ?? '') ?>" required>
        </label>

        <label>
            Nội dung thư
            <textarea name="body_html" rows="8" required><?= htmlspecialchars($letter['body_html'] ?? '') ?></textarea>
        </label>

        <label>
            Lời chào cuối thư (VD "Yours,")
            <input type="text" name="closing" value="<?= htmlspecialchars($letter['closing'] ?? '') ?>" required>
        </label>

        <label>
            Chữ ký
            <input type="text" name="signature" value="<?= htmlspecialchars($letter['signature'] ?? '') ?>" required>
        </label>

        <button type="submit">Lưu</button>
        <a href="index.php?controller=admin_part7&amp;action=manage&amp;test_id=<?= (int) $test['id'] ?>" class="btn-link">Huỷ</a>
    </form>

</main>

</body>
</html>
