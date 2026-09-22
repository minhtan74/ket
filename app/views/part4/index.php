<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KET Reading - Part 4</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>KET Reading - Part 4</h1>
</header>

<?php $activeTab = 'part4'; require __DIR__ . '/../partials/nav_tabs.php'; ?>

<main class="page">

    <p class="cloze-instructions">
        Read the text below. Choose the correct word (A, B or C) for each space (28-35).
    </p>

    <form method="POST" action="index.php?controller=part4&amp;action=result" id="cloze-form">
        <input type="hidden" name="test_id" value="<?= (int) $test['id'] ?>">

        <div class="cloze-passage">
            <?= $passageHtml ?>
        </div>

        <button type="submit" id="submit-btn" data-blank-count="<?= (int) $blankCount ?>">SUBMIT</button>
    </form>

</main>

<script src="js/part4.js"></script>
</body>
</html>
