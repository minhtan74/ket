<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sửa đáp án <?= htmlspecialchars($option['option_letter']) ?></title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>Sửa đáp án <?= htmlspecialchars($option['option_letter']) ?></h1>
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

    <form method="POST" action="index.php?controller=admin&amp;action=optionForm&amp;id=<?= (int) $option['id'] ?>" class="admin-form">
        <label>
            Nội dung đáp án <?= htmlspecialchars($option['option_letter']) ?>
            <textarea name="option_text" rows="3" required><?= htmlspecialchars($option['option_text']) ?></textarea>
        </label>

        <button type="submit">Lưu</button>
        <a href="index.php?controller=admin&amp;action=index" class="btn-link">Huỷ</a>
    </form>

</main>

</body>
</html>
