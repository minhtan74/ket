<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quản lý đề - <?= htmlspecialchars($test['title']) ?></title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1><?= htmlspecialchars($test['title']) ?></h1>
</header>

<?php $activeAdminTab = 'admin7'; require __DIR__ . '/../partials/admin_nav_tabs.php'; ?>

<main class="page">

    <?php if ($message === 'saved'): ?>
        <p class="flash-success">Đã lưu thành công.</p>
    <?php elseif ($message === 'created'): ?>
        <p class="flash-success">Đã tạo đề mới. Giờ thêm thư và câu hỏi cho đề này bên dưới.</p>
    <?php elseif ($message === 'deleted'): ?>
        <p class="flash-success">Đã xoá.</p>
    <?php endif; ?>

    <p><a href="index.php?controller=admin_part7&amp;action=index" class="btn-link">&larr; Danh sách đề</a></p>

    <p><strong>Nhóm:</strong> <?= htmlspecialchars($test['ket_group'] ?: '—') ?> &nbsp;|&nbsp; <strong>Test:</strong> <?= htmlspecialchars($test['test_label'] ?: '—') ?>
        &nbsp;|&nbsp; <a href="index.php?controller=admin_part7&amp;action=testForm&amp;id=<?= (int) $test['id'] ?>">Sửa nhóm/hướng dẫn</a>
    </p>

    <?php if (!empty($test['data_note'])): ?>
    <div class="flash-error">
        <p><strong>⚠ Ghi chú dữ liệu:</strong> <?= htmlspecialchars($test['data_note']) ?></p>
    </div>
    <?php endif; ?>

    <section class="admin-section">
        <h2>Thư (<?= count($letters) ?>)</h2>
        <p><a href="index.php?controller=admin_part7&amp;action=letterForm&amp;test_id=<?= (int) $test['id'] ?>" class="btn-link btn-add">+ Thêm thư</a></p>

        <?php foreach ($letters as $letter): ?>
        <div class="admin-passage-preview" style="margin-bottom: 10px;">
            <p><strong>#<?= (int) $letter['letter_order'] ?></strong>
                <?php if (!empty($letter['dateline'])): ?> &nbsp;|&nbsp; Dateline: <?= htmlspecialchars($letter['dateline']) ?><?php endif; ?>
                &nbsp;|&nbsp; <?= htmlspecialchars($letter['salutation']) ?>
                &nbsp;&rarr;&nbsp; <?= htmlspecialchars($letter['closing']) ?> <?= htmlspecialchars($letter['signature']) ?>
            </p>
            <?= nl2br(htmlspecialchars($letter['body_html'])) ?>
        </div>
        <p class="admin-actions" style="margin-bottom: 16px;">
            <a href="index.php?controller=admin_part7&amp;action=letterForm&amp;test_id=<?= (int) $test['id'] ?>&amp;id=<?= (int) $letter['id'] ?>">Sửa</a>
            <form method="POST" action="index.php?controller=admin_part7&amp;action=letterDelete" onsubmit="return confirm('Xoá thư này?');">
                <input type="hidden" name="id" value="<?= (int) $letter['id'] ?>">
                <input type="hidden" name="test_id" value="<?= (int) $test['id'] ?>">
                <button type="submit" class="btn-delete">Xoá</button>
            </form>
        </p>
        <?php endforeach; ?>
        <?php if (empty($letters)): ?>
            <p>Chưa có thư nào.</p>
        <?php endif; ?>
    </section>

    <section class="admin-section">
        <h2>Câu hỏi (<?= count($questions) ?>)</h2>
        <p><a href="index.php?controller=admin_part7&amp;action=questionForm&amp;test_id=<?= (int) $test['id'] ?>" class="btn-link btn-add">+ Thêm câu hỏi</a></p>

        <table class="admin-table">
            <thead>
                <tr>
                    <th>Số</th>
                    <th>Đáp án đúng</th>
                    <th>Loại</th>
                    <th>Ghi chú</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($questions as $q): ?>
                <tr>
                    <td><?= (int) $q['question_number'] ?></td>
                    <td><?= htmlspecialchars(str_replace('|', ' / ', $q['correct_answer'])) ?></td>
                    <td><?= ((int) $q['is_example'] === 1) ? 'EXAMPLE' : 'Câu thật' ?></td>
                    <td><?= !empty($q['note']) ? '⚠ ' . htmlspecialchars($q['note']) : '' ?></td>
                    <td class="admin-actions">
                        <a href="index.php?controller=admin_part7&amp;action=questionForm&amp;test_id=<?= (int) $test['id'] ?>&amp;id=<?= (int) $q['id'] ?>">Sửa</a>
                        <form method="POST" action="index.php?controller=admin_part7&amp;action=questionDelete" onsubmit="return confirm('Xoá câu hỏi này?');">
                            <input type="hidden" name="id" value="<?= (int) $q['id'] ?>">
                            <input type="hidden" name="test_id" value="<?= (int) $test['id'] ?>">
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

    <p class="admin-hint">
        Mỗi ô trống trong thư dùng placeholder <code>{{n}}</code> (VD <code>{{0}}</code> cho câu example, <code>{{41}}</code>...<code>{{50}}</code>
        cho câu thật). Thêm câu hỏi ở đây thì nhớ chèn đúng <code>{{n}}</code> tương ứng vào nội dung thư, nếu không ô nhập sẽ không hiện ra khi làm bài.
    </p>

</main>

</body>
</html>
