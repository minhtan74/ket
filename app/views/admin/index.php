<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quản trị - KET Reading Part 1</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>Quản trị đề thi - KET Reading Part 1</h1>
</header>

<?php $activeAdminTab = 'admin1'; require __DIR__ . '/../partials/admin_nav_tabs.php'; ?>

<main class="page">

    <?php if ($message === 'saved'): ?>
        <p class="flash-success">Đã lưu thành công.</p>
    <?php elseif ($message === 'deleted'): ?>
        <p class="flash-success">Đã xoá câu hỏi.</p>
    <?php endif; ?>

    <section class="admin-section">
        <h2>Thông tin đề thi</h2>
        <p><strong>Tiêu đề:</strong> <?= htmlspecialchars($test['title']) ?></p>
        <img src="<?= htmlspecialchars($test['image']) ?>" alt="Ảnh đề thi" class="admin-preview-image">
        <p><a href="index.php?controller=admin&amp;action=testForm" class="btn-link">Sửa tiêu đề / đổi ảnh</a></p>
    </section>

    <section class="admin-section">
        <h2>Câu hỏi (<?= count($questions) ?>)</h2>
        <p><a href="index.php?controller=admin&amp;action=questionForm" class="btn-link btn-add">+ Thêm câu hỏi</a></p>

        <table class="admin-table">
            <thead>
                <tr>
                    <th>Số</th>
                    <th>Nội dung câu hỏi</th>
                    <th>Đáp án đúng</th>
                    <th>Giải thích</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($questions as $q): ?>
                <tr>
                    <td><?= (int) $q['question_number'] ?></td>
                    <td><?= htmlspecialchars($q['question_text']) ?></td>
                    <td><?= htmlspecialchars($q['correct_answer']) ?></td>
                    <td><?= htmlspecialchars($q['explanation'] ?? '') ?></td>
                    <td class="admin-actions">
                        <a href="index.php?controller=admin&amp;action=questionForm&amp;id=<?= (int) $q['id'] ?>">Sửa</a>
                        <form method="POST" action="index.php?controller=admin&amp;action=questionDelete" onsubmit="return confirm('Xoá câu hỏi này?');">
                            <input type="hidden" name="id" value="<?= (int) $q['id'] ?>">
                            <button type="submit" class="btn-delete">Xoá</button>
                        </form>
                    </td>
                </tr>
                <?php endforeach; ?>
                <?php if (empty($questions)): ?>
                <tr><td colspan="5">Chưa có câu hỏi nào.</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </section>

    <section class="admin-section">
        <h2>Đáp án (A-H)</h2>
        <table class="admin-table">
            <thead>
                <tr><th>Chữ cái</th><th>Nội dung</th><th>Hành động</th></tr>
            </thead>
            <tbody>
                <?php foreach ($options as $opt): ?>
                <tr>
                    <td><?= htmlspecialchars($opt['option_letter']) ?></td>
                    <td><?= nl2br(htmlspecialchars($opt['option_text'])) ?></td>
                    <td class="admin-actions">
                        <a href="index.php?controller=admin&amp;action=optionForm&amp;id=<?= (int) $opt['id'] ?>">Sửa</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </section>

</main>

</body>
</html>
