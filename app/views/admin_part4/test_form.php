<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sửa đề thi - Part 4</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>Sửa thông tin đề thi (Part 4)</h1>
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

    <p class="admin-hint">
        Chỗ trống trong đoạn văn được đánh dấu bằng <code>{{0}}</code>, <code>{{28}}</code>...
        đúng với số thứ tự câu hỏi ở trang danh sách. Đoạn văn phải chứa đủ
        placeholder cho tất cả câu hỏi hiện có thì mới lưu được.
    </p>

    <form method="POST" action="index.php?controller=admin_part4&amp;action=testForm" class="admin-form">
        <label>
            Tiêu đề đề thi
            <input type="text" name="title" value="<?= htmlspecialchars($test['title']) ?>" required>
        </label>

        <label>
            Đoạn văn (passage)
            <textarea name="passage_html" rows="10" required><?= htmlspecialchars($test['passage_html']) ?></textarea>
        </label>

        <button type="submit">Lưu</button>
        <a href="index.php?controller=admin_part4&amp;action=index" class="btn-link">Huỷ</a>
    </form>

</main>

</body>
</html>
