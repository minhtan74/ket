<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KET Reading - Part 7</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>KET Reading - Part 7 (Complete the Letter)</h1>
</header>

<?php $activeTab = 'part7'; require __DIR__ . '/../partials/nav_tabs.php'; ?>

<main class="page">

    <section class="part-info">
        <h2>PART 7</h2>
        <p class="cloze-instructions">Chọn một quyển KET, sau đó chọn Test muốn làm.</p>
    </section>

    <div class="p7-browse">
        <?php foreach ($grouped as $ketLabel => $testsInGroup): ?>
        <div class="p7-ket-group">
            <button type="button" class="p7-ket-btn" data-target="p7-panel-<?= md5($ketLabel) ?>">
                <span class="part-badge"><?= htmlspecialchars(preg_replace('/\D/', '', $ketLabel) ?: '?') ?></span>
                <span class="p7-ket-label"><?= htmlspecialchars($ketLabel) ?></span>
                <span class="p7-ket-count"><?= count($testsInGroup) ?> đề</span>
                <span class="p7-ket-chevron" aria-hidden="true">&#9662;</span>
            </button>
            <div class="p7-ket-panel hidden" id="p7-panel-<?= md5($ketLabel) ?>">
                <?php $testNum = 1; foreach ($testsInGroup as $t): ?>
                <a class="p7-test-btn" href="index.php?controller=part7&amp;action=index&amp;id=<?= (int) $t['id'] ?>">
                    <span class="p7-test-num"><?= $testNum++ ?></span>
                    <span class="p7-test-label"><?= htmlspecialchars($t['test_label']) ?></span>
                </a>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endforeach; ?>
    </div>

</main>

<script src="js/part7.js"></script>
</body>
</html>
