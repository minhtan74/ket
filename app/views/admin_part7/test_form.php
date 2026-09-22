<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= !empty($test['id']) ? 'Sửa tiêu đề đề' : 'Thêm đề mới' ?> - Part 7</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1><?= !empty($test['id']) ? 'Sửa tiêu đề đề' : 'Thêm đề Part 7 mới' ?></h1>
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

    <?php if (empty($test['id'])): ?>
    <p class="admin-hint">
        Sau khi tạo đề, bạn sẽ được chuyển sang màn hình quản lý để thêm thư và câu hỏi (41-50) cho đề này.
    </p>
    <?php endif; ?>

    <form
        method="POST"
        action="index.php?controller=admin_part7&amp;action=testForm<?= !empty($test['id']) ? '&amp;id=' . (int) $test['id'] : '' ?>"
        class="admin-form"
    >
        <label>
            Tiêu đề đề thi (VD "TEST 5 KET 3")
            <input type="text" name="title" value="<?= htmlspecialchars($test['title'] ?? '') ?>" required>
        </label>

        <label>
            Nhóm KET (VD "KET 3") - dùng để gom nhóm ở trang chọn đề
            <input type="text" name="ket_group" value="<?= htmlspecialchars($test['ket_group'] ?? '') ?>">
        </label>

        <label>
            Nhãn Test (VD "Test 5") - hiển thị trên nút chọn trong nhóm KET
            <input type="text" name="test_label" value="<?= htmlspecialchars($test['test_label'] ?? '') ?>">
        </label>

        <label>
            Hướng dẫn làm bài (mỗi dòng 1 câu, VD "Complete the letter.")
            <textarea name="instructions" rows="3"><?= htmlspecialchars($test['instructions'] ?? "Complete the letter(s).\nWrite ONE word for each space.\nFor questions 41–50, write the words on your answer sheet.") ?></textarea>
        </label>

        <button type="submit">Lưu</button>
        <a href="index.php?controller=admin_part7&amp;action=index" class="btn-link">Huỷ</a>
    </form>

</main>

</body>
</html>
