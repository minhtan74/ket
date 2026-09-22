<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KET Reading - Part 4 - Result</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>KET READING PART 4</h1>
</header>

<?php $activeTab = 'part4'; require __DIR__ . '/../partials/nav_tabs.php'; ?>

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
            <p class="question-number">Question <?= (int) $item['question_number'] ?></p>
            <p class="question-text">
                A. <?= htmlspecialchars($item['option_a']) ?>
                &nbsp;&nbsp; B. <?= htmlspecialchars($item['option_b']) ?>
                &nbsp;&nbsp; C. <?= htmlspecialchars($item['option_c']) ?>
            </p>

            <p>Your answer:
                <?= $item['user_answer'] !== '' ? htmlspecialchars($item['user_answer']) : 'Not answered' ?>
            </p>
            <p>Correct answer: <?= htmlspecialchars($item['correct_answer']) ?></p>

            <p class="review-status">
                <?= $item['is_correct'] ? '✓ Correct' : '✗ Wrong' ?>
            </p>
        </div>
        <?php endforeach; ?>
    </section>

    <form method="GET" action="index.php">
        <input type="hidden" name="controller" value="part4">
        <input type="hidden" name="action" value="index">
        <input type="hidden" name="id" value="<?= (int) $test['id'] ?>">
        <button type="submit" id="retry-btn">Làm lại</button>
    </form>

</main>

</body>
</html>
