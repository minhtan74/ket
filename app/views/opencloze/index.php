<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KET Reading/Writing - Open Cloze</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>KET Reading/Writing - <?= htmlspecialchars($test['part_label']) ?></h1>
</header>

<?php $activeTab = 'part5'; require __DIR__ . '/../partials/nav_tabs.php'; ?>

<main class="page">

    <p class="cloze-instructions">
        Read the two letters. Fill in each space (41-50) with ONE word.
    </p>

    <form method="POST" action="index.php?controller=opencloze&amp;action=result" id="opencloze-form">
        <input type="hidden" name="test_id" value="<?= (int) $test['id'] ?>">

        <div class="oc-letter">
            <div class="oc-letter-body"><?= $letter1Html ?></div>
            <p class="oc-signature"><?= htmlspecialchars($test['letter1_signature']) ?></p>
        </div>

        <div class="oc-letter">
            <div class="oc-letter-body"><?= $letter2Html ?></div>
            <p class="oc-signature"><?= htmlspecialchars($test['letter2_signature']) ?></p>
        </div>

        <button type="submit" id="submit-btn" data-blank-count="<?= (int) $blankCount ?>">SUBMIT</button>
    </form>

</main>

<script src="js/opencloze.js"></script>
</body>
</html>
