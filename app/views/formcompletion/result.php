<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KET Reading - Part 6 - Result</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>KET READING PART 6</h1>
</header>

<?php $activeTab = 'part6'; require __DIR__ . '/../partials/nav_tabs.php'; ?>

<main class="page">

    <section class="score-summary">
        <p class="score-line">Score: <?= (int) $correct ?> / <?= (int) $total ?></p>
        <p>Correct: <?= (int) $correct ?></p>
        <p>Wrong: <?= (int) $wrong ?></p>
        <p>Accuracy: <?= htmlspecialchars((string) $accuracy) ?>%</p>
    </section>

    <section class="review-list">
        <?php foreach ($review as $item): ?>
        <div class="review-item <?= $item['is_correct'] ? 'correct' : 'wrong' ?>">
            <p class="question-number">
                <?= (int) $item['field_number'] ?>. <?= htmlspecialchars($item['field_label']) ?>
            </p>

            <p>Your answer:
                <?php if ($item['user_answer'] === ''): ?>
                    Not answered
                <?php else: ?>
                    <?= !empty($item['field_prefix']) ? htmlspecialchars($item['field_prefix']) : '' ?><?= htmlspecialchars($item['user_answer']) ?>
                <?php endif; ?>
            </p>
            <p>Correct answer:
                <?= !empty($item['field_prefix']) ? htmlspecialchars($item['field_prefix']) : '' ?><?= htmlspecialchars($item['correct_answer_display']) ?>
            </p>

            <p class="review-status">
                <?= $item['is_correct'] ? '✓ Correct' : '✗ Wrong' ?>
            </p>

            <?php if (!empty($item['explanation'])): ?>
            <p class="review-explanation">
                Explanation: <?= htmlspecialchars($item['explanation']) ?>
            </p>
            <?php endif; ?>
        </div>
        <?php endforeach; ?>
    </section>

    <form method="GET" action="index.php">
        <input type="hidden" name="controller" value="formcompletion">
        <input type="hidden" name="action" value="index">
        <input type="hidden" name="id" value="<?= (int) $test['id'] ?>">
        <button type="submit" id="retry-btn">Làm lại</button>
    </form>

</main>

</body>
</html>
