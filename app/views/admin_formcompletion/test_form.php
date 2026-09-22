<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sửa đề thi - Part 6</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>Sửa văn bản / form (Part 6)</h1>
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

    <form method="POST" action="index.php?controller=admin_formcompletion&amp;action=testForm" class="admin-form">
        <label>
            Tiêu đề đề thi
            <input type="text" name="title" value="<?= htmlspecialchars($test['title']) ?>" required>
        </label>

        <label>
            Ngày của thư (văn bản 1, VD "8 December")
            <input type="text" name="text1_date" value="<?= htmlspecialchars($test['text1_date']) ?>" required>
        </label>

        <label>
            Nội dung thư (văn bản 1)
            <textarea name="text1_html" rows="6" required><?= htmlspecialchars($test['text1_html']) ?></textarea>
        </label>

        <label>
            Chữ ký thư
            <input type="text" name="text1_signature" value="<?= htmlspecialchars($test['text1_signature']) ?>" required>
        </label>

        <label>
            Nội dung note (văn bản 2)
            <textarea name="text2_html" rows="6" required><?= htmlspecialchars($test['text2_html']) ?></textarea>
        </label>

        <label>
            Chữ ký note
            <input type="text" name="text2_signature" value="<?= htmlspecialchars($test['text2_signature']) ?>" required>
        </label>

        <label>
            Tiêu đề form
            <input type="text" name="form_title" value="<?= htmlspecialchars($test['form_title']) ?>" required>
        </label>

        <button type="submit">Lưu</button>
        <a href="index.php?controller=admin_formcompletion&amp;action=index" class="btn-link">Huỷ</a>
    </form>

</main>

</body>
</html>
