<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quản trị - KET Reading Part 4</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>Quản trị đề thi - KET Reading Part 4</h1>
</header>

<?php $activeAdminTab = 'admin4'; require __DIR__ . '/../partials/admin_nav_tabs.php'; ?>

<main class="page">

    <?php if ($message === 'saved'): ?>
        <p class="flash-success">Đã lưu thành công.</p>
    <?php elseif ($message === 'deleted'): ?>
        <p class="flash-success">Đã xoá câu hỏi.</p>
    <?php endif; ?>

    <section class="admin-section">
        <h2>Thông tin đề thi</h2>
        <p><strong>Tiêu đề:</strong> <?= htmlspecialchars($test['title']) ?></p>
        <p><strong>Đoạn văn (passage):</strong></p>
        <div class="admin-passage-preview"><?= nl2br(htmlspecialchars($test['passage_html'])) ?></div>
        <p><a href="index.php?controller=admin_part4&amp;action=testForm" class="btn-link">Sửa tiêu đề / đoạn văn</a></p>
    </section>

    <section class="admin-section">
        <h2>Câu hỏi (<?= count($questions) ?>)</h2>
        <p><a href="index.php?controller=admin_part4&amp;action=questionForm" class="btn-link btn-add">+ Thêm câu hỏi</a></p>

        <table class="admin-table">
            <thead>
                <tr>
                    <th>Số</th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>Đáp án đúng</th>
                    <th>Loại</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($questions as $q): ?>
                <tr>
                    <td><?= (int) $q['question_number'] ?></td>
                    <td><?= htmlspecialchars($q['option_a']) ?></td>
                    <td><?= htmlspecialchars($q['option_b']) ?></td>
                    <td><?= htmlspecialchars($q['option_c']) ?></td>
                    <td><?= htmlspecialchars($q['correct_answer']) ?></td>
                    <td><?= ((int) $q['is_example'] === 1) ? 'EXAMPLE' : 'Câu thật' ?></td>
                    <td class="admin-actions">
                        <a href="index.php?controller=admin_part4&amp;action=questionForm&amp;id=<?= (int) $q['id'] ?>">Sửa</a>
                        <form method="POST" action="index.php?controller=admin_part4&amp;action=questionDelete" onsubmit="return confirm('Xoá câu hỏi này?');">
                            <input type="hidden" name="id" value="<?= (int) $q['id'] ?>">
                            <button type="submit" class="btn-delete">Xoá</button>
                        </form>
                    </td>
                </tr>
                <?php endforeach; ?>
                <?php if (empty($questions)): ?>
                <tr><td colspan="7">Chưa có câu hỏi nào.</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </section>

</main>

</body>
</html>
