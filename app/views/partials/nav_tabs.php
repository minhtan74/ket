<?php
// Thanh tab điều hướng nhanh giữa các Part (dùng chung cho mọi trang làm bài
// và trang kết quả). View gọi file này cần set biến $activeTab trước, ví dụ:
//   $activeTab = 'part1';
//   require __DIR__ . '/../partials/nav_tabs.php';

$navTabs = [
    'home'  => ['label' => 'Home',   'url' => 'index.php'],
    'part1' => ['label' => 'Part 1', 'url' => 'index.php?controller=exam&action=index&id=1'],
    'part4' => ['label' => 'Part 4', 'url' => 'index.php?controller=part4&action=index&id=1'],
    'part5' => ['label' => 'Part 5', 'url' => 'index.php?controller=opencloze&action=index&id=1'],
    'part6' => ['label' => 'Part 6', 'url' => 'index.php?controller=formcompletion&action=index&id=1'],
    'part7' => ['label' => 'Part 7', 'url' => 'index.php?controller=part7&action=browse'],
];
?>
<nav class="tab-bar">
    <?php foreach ($navTabs as $tabKey => $tab): ?>
    <a
        href="<?= htmlspecialchars($tab['url']) ?>"
        class="tab-bar-item<?= ($activeTab ?? '') === $tabKey ? ' active' : '' ?>"
    ><?= htmlspecialchars($tab['label']) ?></a>
    <?php endforeach; ?>
</nav>
