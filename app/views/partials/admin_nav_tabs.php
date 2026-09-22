<?php
// Thanh tab điều hướng nhanh giữa các khu Admin. View gọi file này cần set
// biến $activeAdminTab trước, ví dụ:
//   $activeAdminTab = 'admin1';
//   require __DIR__ . '/../partials/admin_nav_tabs.php';

$adminNavTabs = [
    'admin1' => ['label' => 'Part 1', 'url' => 'index.php?controller=admin&action=index'],
    'admin4' => ['label' => 'Part 4', 'url' => 'index.php?controller=admin_part4&action=index'],
    'admin6' => ['label' => 'Part 6', 'url' => 'index.php?controller=admin_formcompletion&action=index'],
    'admin7' => ['label' => 'Part 7', 'url' => 'index.php?controller=admin_part7&action=index'],
];
?>
<nav class="tab-bar tab-bar-admin">
    <span class="tab-bar-admin-badge">ADMIN</span>
    <?php foreach ($adminNavTabs as $tabKey => $tab): ?>
    <a
        href="<?= htmlspecialchars($tab['url']) ?>"
        class="tab-bar-item<?= ($activeAdminTab ?? '') === $tabKey ? ' active' : '' ?>"
    ><?= htmlspecialchars($tab['label']) ?></a>
    <?php endforeach; ?>
    <a href="index.php" class="tab-bar-item tab-bar-home-link">&larr; Trang chủ</a>
</nav>
