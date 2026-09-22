<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quản trị - KET Reading Part 6</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>Quản trị đề thi - KET Reading Part 6</h1>
</header>

<?php $activeAdminTab = 'admin6'; require __DIR__ . '/../partials/admin_nav_tabs.php'; ?>

<main class="page">

    <?php if ($message === 'saved'): ?>
        <p class="flash-success">Đã lưu thành công.</p>
    <?php elseif ($message === 'deleted'): ?>
        <p class="flash-success">Đã xoá field.</p>
    <?php endif; ?>

    <section class="admin-section">
        <h2>Thông tin đề thi</h2>
        <p><strong>Tiêu đề:</strong> <?= htmlspecialchars($test['title']) ?></p>

        <p><strong>Văn bản 1 (thư) - <?= htmlspecialchars($test['text1_date']) ?>:</strong></p>
        <div class="admin-passage-preview"><?= nl2br(htmlspecialchars($test['text1_html'])) ?></div>
        <p><em>Ký tên: <?= htmlspecialchars($test['text1_signature']) ?></em></p>

        <p><strong>Văn bản 2 (note):</strong></p>
        <div class="admin-passage-preview"><?= nl2br(htmlspecialchars($test['text2_html'])) ?></div>
        <p><em>Ký tên: <?= htmlspecialchars($test['text2_signature']) ?></em></p>

        <p><strong>Tiêu đề form:</strong> <?= htmlspecialchars($test['form_title']) ?></p>

        <p><a href="index.php?controller=admin_formcompletion&amp;action=testForm" class="btn-link">Sửa văn bản / form</a></p>
    </section>

    <section class="admin-section">
        <h2>Các field trong form (<?= count($fields) ?>)</h2>
        <p><a href="index.php?controller=admin_formcompletion&amp;action=fieldForm" class="btn-link btn-add">+ Thêm field</a></p>

        <table class="admin-table">
            <thead>
                <tr>
                    <th>Số</th>
                    <th>Label</th>
                    <th>Prefix</th>
                    <th>Đáp án đúng</th>
                    <th>Giải thích</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($fields as $f): ?>
                <tr>
                    <td><?= (int) $f['field_number'] ?></td>
                    <td><?= htmlspecialchars($f['field_label']) ?></td>
                    <td><?= htmlspecialchars($f['field_prefix'] ?? '') ?></td>
                    <td><?= htmlspecialchars(str_replace('|', ' / ', $f['correct_answer'])) ?></td>
                    <td><?= htmlspecialchars($f['explanation'] ?? '') ?></td>
                    <td class="admin-actions">
                        <a href="index.php?controller=admin_formcompletion&amp;action=fieldForm&amp;id=<?= (int) $f['id'] ?>">Sửa</a>
                        <form method="POST" action="index.php?controller=admin_formcompletion&amp;action=fieldDelete" onsubmit="return confirm('Xoá field này?');">
                            <input type="hidden" name="id" value="<?= (int) $f['id'] ?>">
                            <button type="submit" class="btn-delete">Xoá</button>
                        </form>
                    </td>
                </tr>
                <?php endforeach; ?>
                <?php if (empty($fields)): ?>
                <tr><td colspan="6">Chưa có field nào.</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </section>

</main>

</body>
</html>
