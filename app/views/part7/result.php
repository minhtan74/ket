<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KET Reading - Part 7 - Result</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>KET READING PART 7: <?= htmlspecialchars($test['title']) ?></h1>
</header>

<?php $activeTab = 'part7'; require __DIR__ . '/../partials/nav_tabs.php'; ?>

<main class="page">

    <section class="score-summary">
        <p class="score-line">Score: <?= (int) $correct ?> / <?= (int) $total ?></p>
        <p>Correct: <?= (int) $correct ?></p>
        <p>Wrong: <?= (int) $wrong ?></p>
        <p>Accuracy: <?= htmlspecialchars((string) $accuracy) ?>%</p>
    </section>

    <?php foreach ($letters as $letter): ?>
    <div class="oc-letter">
        <?php if (!empty($letter['dateline'])): ?>
            <p class="p7-dateline"><?= nl2br(htmlspecialchars($letter['dateline'])) ?></p>
        <?php endif; ?>
        <?php if (!empty($letter['salutation'])): ?>
            <p class="p7-salutation"><?= htmlspecialchars($letter['salutation']) ?></p>
        <?php endif; ?>
        <div class="oc-letter-body"><?= $letter['bodyHtml'] ?></div>
        <?php if (!empty($letter['closing'])): ?>
            <p class="p7-closing"><?= htmlspecialchars($letter['closing']) ?></p>
        <?php endif; ?>
        <p class="oc-signature"><?= nl2br(htmlspecialchars($letter['signature'])) ?></p>
    </div>
    <?php endforeach; ?>

    <section class="review-list">
        <?php foreach ($review as $item): ?>
        <div class="review-item <?= $item['is_correct'] ? 'correct' : 'wrong' ?>">
            <p class="question-number">Question <?= (int) $item['question_number'] ?></p>

            <p>Your answer:
                <?= $item['user_answer'] !== '' ? htmlspecialchars($item['user_answer']) : 'Not answered' ?>
            </p>
            <p>Correct answer: <?= htmlspecialchars($item['correct_answer_display']) ?></p>

            <p class="review-status">
                <?= $item['is_correct'] ? '✓ Correct' : '✗ Wrong' ?>
            </p>
        </div>
        <?php endforeach; ?>
    </section>

    <form method="GET" action="index.php">
        <input type="hidden" name="controller" value="part7">
        <input type="hidden" name="action" value="index">
        <input type="hidden" name="id" value="<?= (int) $test['id'] ?>">
        <button type="submit" id="retry-btn">Làm lại</button>
    </form>

</main>

</body>
</html>
