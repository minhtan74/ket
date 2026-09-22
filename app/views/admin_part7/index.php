<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quản trị - KET Reading Part 7</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>Quản trị đề thi - KET Reading Part 7</h1>
</header>

<?php $activeAdminTab = 'admin7'; require __DIR__ . '/../partials/admin_nav_tabs.php'; ?>

<main class="page">

    <?php if ($message === 'saved'): ?>
        <p class="flash-success">Đã lưu thành công.</p>
    <?php elseif ($message === 'created'): ?>
        <p class="flash-success">Đã tạo đề mới.</p>
    <?php elseif ($message === 'deleted'): ?>
        <p class="flash-success">Đã xoá.</p>
    <?php endif; ?>

    <section class="admin-section">
        <h2>Danh sách đề (<?= (int) $testCount ?>)</h2>
        <p><a href="index.php?controller=admin_part7&amp;action=testForm" class="btn-link btn-add">+ Thêm đề mới</a></p>
    </section>

    <?php foreach ($grouped as $ketLabel => $testsInGroup): ?>
    <section class="admin-section admin-ket-group">
        <h2 class="admin-ket-heading">
            <?= htmlspecialchars($ketLabel) ?>
            <span class="p7-ket-count"><?= count($testsInGroup) ?> đề</span>
        </h2>

        <table class="admin-table">
            <thead>
                <tr>
                    <th>Test</th>
                    <th>Tiêu đề</th>
                    <th>Số thư</th>
                    <th>Số câu (41-50)</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($testsInGroup as $t): ?>
                <tr>
                    <td><strong><?= htmlspecialchars($t['test_label'] !== '' ? $t['test_label'] : '#' . $t['id']) ?></strong></td>
                    <td><?= htmlspecialchars($t['title']) ?><?= !empty($t['data_note']) ? ' <span title="Có ghi chú dữ liệu suy luận">⚠</span>' : '' ?></td>
                    <td><?= (int) $t['letter_count'] ?></td>
                    <td><?= (int) $t['question_count'] ?></td>
                    <td class="admin-actions">
                        <a href="index.php?controller=admin_part7&amp;action=manage&amp;test_id=<?= (int) $t['id'] ?>">Quản lý</a>
                        <a href="index.php?controller=admin_part7&amp;action=testForm&amp;id=<?= (int) $t['id'] ?>">Sửa</a>
                        <form method="POST" action="index.php?controller=admin_part7&amp;action=testDelete" onsubmit="return confirm('Xoá cả đề này (gồm toàn bộ thư và câu hỏi)?');">
                            <input type="hidden" name="id" value="<?= (int) $t['id'] ?>">
                            <button type="submit" class="btn-delete">Xoá</button>
                        </form>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </section>
    <?php endforeach; ?>

    <?php if ($testCount === 0): ?>
    <section class="admin-section">
        <p>Chưa có đề nào.</p>
    </section>
    <?php endif; ?>

</main>

</body>
</html>
