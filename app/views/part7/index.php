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
    <h1>KET Reading - Part 7: <?= htmlspecialchars($test['title']) ?></h1>
</header>

<?php $activeTab = 'part7'; require __DIR__ . '/../partials/nav_tabs.php'; ?>

<main class="page">

    <p><a href="index.php?controller=part7&amp;action=browse" class="btn-link">&larr; Chọn đề khác</a></p>

    <section class="part-info">
        <h2>PART 7</h2>
        <p class="part-info-range">QUESTIONS 41&ndash;50</p>
        <p class="cloze-instructions">
            <?php foreach ($instructionLines as $line): ?>
                <?= htmlspecialchars($line) ?><br>
            <?php endforeach; ?>
        </p>
    </section>

    <form method="POST" action="index.php?controller=part7&amp;action=result" id="part7-form">
        <input type="hidden" name="test_id" value="<?= (int) $test['id'] ?>">

        <div class="p7-layout">

            <div class="p7-letters">
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

                <button type="submit" id="submit-btn" data-blank-count="<?= (int) $blankCount ?>">SUBMIT</button>
            </div>

            <aside class="p7-hints-column">
                <button type="button" id="p7-hints-toggle" class="p7-hints-btn">💡 Gợi ý / Hiện đáp án gợi ý</button>
                <div id="p7-hints-panel" class="p7-hints-panel hidden">
                    <h3>Gợi ý (41&ndash;50)</h3>
                    <ul class="p7-hints-list">
                        <?php foreach ($hints as $hint): ?>
                        <li><span class="p7-hint-num"><?= (int) $hint['question_number'] ?>.</span> <span><?= htmlspecialchars($hint['answer']) ?></span></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </aside>

        </div>
    </form>

</main>

<script src="js/part7.js"></script>
</body>
</html>
