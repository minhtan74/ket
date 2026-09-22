<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KET Practice</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>KET PRACTICE</h1>
    <p class="site-header-sub">Luyện thi Cambridge KET (A2 Key) — Reading &amp; Writing</p>
</header>

<?php $activeTab = 'home'; require __DIR__ . '/../partials/nav_tabs.php'; ?>

<main class="page">
    <h2>Reading</h2>

    <ul class="part-list">
        <li class="part-item available">
            <a href="index.php?controller=exam&amp;action=index&amp;id=1">
                <span class="part-badge">1</span>
                <span class="part-meta">
                    <span class="part-title">Reading Part 1</span>
                    <span class="part-desc">Matching — đọc 5 câu, ghép với 8 biển báo / thông báo</span>
                </span>
                <span class="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
        </li>
        <li class="part-item disabled">
            <span class="part-badge">2</span>
            <span class="part-meta">
                <span class="part-title">Reading Part 2</span>
                <span class="part-desc">Chưa triển khai</span>
            </span>
            <span class="coming-soon">Coming soon</span>
        </li>
        <li class="part-item disabled">
            <span class="part-badge">3</span>
            <span class="part-meta">
                <span class="part-title">Reading Part 3</span>
                <span class="part-desc">Chưa triển khai</span>
            </span>
            <span class="coming-soon">Coming soon</span>
        </li>
        <li class="part-item available">
            <a href="index.php?controller=part4&amp;action=index&amp;id=1">
                <span class="part-badge">4</span>
                <span class="part-meta">
                    <span class="part-title">Reading Part 4</span>
                    <span class="part-desc">Multiple Choice Cloze — đoạn văn 8 chỗ trống, chọn A/B/C</span>
                </span>
                <span class="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
        </li>
        <li class="part-item available">
            <a href="index.php?controller=opencloze&amp;action=index&amp;id=1">
                <span class="part-badge">5</span>
                <span class="part-meta">
                    <span class="part-title">Reading Part 5 <small>(Open Cloze)</small></span>
                    <span class="part-desc">Đọc 2 lá thư, tự gõ 1 từ vào mỗi chỗ trống</span>
                </span>
                <span class="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
        </li>
        <li class="part-item available">
            <a href="index.php?controller=formcompletion&amp;action=index&amp;id=1">
                <span class="part-badge">6</span>
                <span class="part-meta">
                    <span class="part-title">Reading Part 6 <small>(Form Completion)</small></span>
                    <span class="part-desc">Đọc thư + note, tổng hợp thông tin điền vào form</span>
                </span>
                <span class="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
        </li>
        <li class="part-item available">
            <a href="index.php?controller=part7&amp;action=browse">
                <span class="part-badge">7</span>
                <span class="part-meta">
                    <span class="part-title">Reading Part 7 <small>(Complete the Letter)</small></span>
                    <span class="part-desc">20 đề — chọn quyển KET 2&ndash;6, mỗi quyển 4 Test</span>
                </span>
                <span class="part-arrow" aria-hidden="true">&rarr;</span>
            </a>
        </li>
    </ul>

    <a class="admin-entry" href="index.php?controller=admin&amp;action=index">
        <span>⚙ Quản trị nội dung (Admin)</span>
        <span class="part-arrow" aria-hidden="true">&rarr;</span>
    </a>
</main>

</body>
</html>
