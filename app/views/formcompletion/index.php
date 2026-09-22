<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KET Reading - Part 6</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>KET Reading - Part 6</h1>
</header>

<?php $activeTab = 'part6'; require __DIR__ . '/../partials/nav_tabs.php'; ?>

<main class="page">

    <p class="cloze-instructions">
        Read the letter and the note. Fill in the form below (51-55).
    </p>

    <form method="POST" action="index.php?controller=formcompletion&amp;action=result" id="form-completion-form">
        <input type="hidden" name="test_id" value="<?= (int) $test['id'] ?>">

        <div class="fc-texts">
            <div class="fc-letter">
                <p class="fc-letter-date"><?= htmlspecialchars($test['text1_date']) ?></p>
                <div class="fc-letter-body"><?= nl2br(htmlspecialchars($test['text1_html'])) ?></div>
                <p class="oc-signature"><?= htmlspecialchars($test['text1_signature']) ?></p>
            </div>

            <div class="fc-note">
                <div class="fc-note-body"><?= nl2br(htmlspecialchars($test['text2_html'])) ?></div>
                <p class="oc-signature"><?= htmlspecialchars($test['text2_signature']) ?></p>
            </div>
        </div>

        <div class="fc-form-box">
            <h2 class="fc-form-title"><?= htmlspecialchars($test['form_title']) ?></h2>

            <div class="fc-form-row fc-form-row-static">
                <span class="fc-form-label">Student's name:</span>
                <span class="fc-form-static-value">Suzanna Taylor</span>
            </div>

            <?php foreach ($fields as $field): ?>
            <div class="fc-form-row">
                <span class="fc-form-number"><?= (int) $field['field_number'] ?></span>
                <span class="fc-form-label"><?= htmlspecialchars($field['field_label']) ?></span>
                <span class="fc-form-input-wrap">
                    <?php if (!empty($field['field_prefix'])): ?>
                        <span class="fc-form-prefix"><?= htmlspecialchars($field['field_prefix']) ?></span>
                    <?php endif; ?>
                    <input
                        type="text"
                        name="answers[<?= (int) $field['field_number'] ?>]"
                        class="fc-input"
                        maxlength="40"
                        autocomplete="off"
                    >
                </span>
            </div>
            <?php endforeach; ?>
        </div>

        <button type="submit" id="submit-btn" data-field-count="<?= count($fields) ?>">SUBMIT</button>
    </form>

</main>

<script src="js/formcompletion.js"></script>
</body>
</html>
