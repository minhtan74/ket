<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KET Reading/Writing - Open Cloze - Result</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>KET OPEN CLOZE - <?= htmlspecialchars($test['part_label']) ?></h1>
</header>

<?php $activeTab = 'part5'; require __DIR__ . '/../partials/nav_tabs.php'; ?>

<main class="page">

    <section class="score-summary">
        <p class="score-line">Score: <?= (int) $correct ?> / <?= (int) $total ?></p>
        <p>Correct: <?= (int) $correct ?></p>
        <p>Wrong: <?= (int) $wrong ?></p>
        <p>Accuracy: <?= htmlspecialchars((string) $accuracy) ?>%</p>
    </section>

    <p class="cloze-instructions">
        Di chuột vào từ được tô màu để xem đáp án đúng. Xanh = đúng, đỏ = sai.
    </p>

    <div class="oc-letter">
        <div class="oc-letter-body"><?= $letter1ReviewHtml ?></div>
        <p class="oc-signature"><?= htmlspecialchars($test['letter1_signature']) ?></p>
    </div>

    <div class="oc-letter">
        <div class="oc-letter-body"><?= $letter2ReviewHtml ?></div>
        <p class="oc-signature"><?= htmlspecialchars($test['letter2_signature']) ?></p>
    </div>

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
        <input type="hidden" name="controller" value="opencloze">
        <input type="hidden" name="action" value="index">
        <input type="hidden" name="id" value="<?= (int) $test['id'] ?>">
        <button type="submit" id="retry-btn">Làm lại</button>
    </form>

</main>

</body>
</html>
