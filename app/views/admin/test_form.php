<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sửa thông tin đề thi</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>Sửa thông tin đề thi</h1>
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

    <form method="POST" action="index.php?controller=admin&amp;action=testForm" enctype="multipart/form-data" class="admin-form">
        <label>
            Tiêu đề đề thi
            <input type="text" name="title" value="<?= htmlspecialchars($test['title']) ?>" required>
        </label>

        <label>
            Ảnh hiện tại
            <img src="<?= htmlspecialchars($test['image']) ?>" alt="Ảnh đề thi" class="admin-preview-image">
        </label>

        <label>
            Tải ảnh mới lên (để trống nếu không đổi)
            <input type="file" name="image" accept=".jpg,.jpeg,.png,.gif">
        </label>

        <button type="submit">Lưu</button>
        <a href="index.php?controller=admin&amp;action=index" class="btn-link">Huỷ</a>
    </form>

</main>

</body>
</html>
