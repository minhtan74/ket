<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KET Reading - Part 1</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
    <h1>KET Reading - Part 1</h1>
</header>

<?php $activeTab = 'part1'; require __DIR__ . '/../partials/nav_tabs.php'; ?>

<main class="page">

    <form method="POST" action="index.php?controller=result&amp;action=index" id="exam-form">
        <input type="hidden" name="test_id" value="<?= (int) $test['id'] ?>">

        <div class="exam-layout">

            <div class="exam-image">
                <img src="<?= htmlspecialchars($test['image']) ?>" alt="<?= htmlspecialchars($test['title']) ?>">
            </div>

            <div class="exam-questions">
                <?php foreach ($questions as $question): ?>
                <div class="question-block">
                    <p class="question-number">Question <?= (int) $question['question_number'] ?></p>
                    <p class="question-text"><?= htmlspecialchars($question['question_text']) ?></p>

                    <label class="answer-label">
                        Answer:
                        <select
                            name="answers[<?= (int) $question['id'] ?>]"
                            class="answer-select"
                        >
                            <option value="">Select answer</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="G">G</option>
                            <option value="H">H</option>
                        </select>
                    </label>
                </div>
                <?php endforeach; ?>

                <button type="submit" id="submit-btn">SUBMIT</button>
            </div>

        </div>
    </form>

</main>

<script src="js/exam.js"></script>
</body>
</html>
