<?php
$agents = [
    [
        'image' => 'https://picsum.photos/320/180?random=1',
        'title' => 'ChatBot Pro',
        'description' => 'An advanced conversational AI for customer support and sales.'
    ],
    [
        'image' => 'https://picsum.photos/320/180?random=2',
        'title' => 'VisionAI',
        'description' => 'Image recognition and analysis for business automation.'
    ],
    [
        'image' => 'https://picsum.photos/320/180?random=3',
        'title' => 'DataSage',
        'description' => 'Data analytics and insights powered by AI.'
    ],
    [
        'image' => 'https://picsum.photos/320/180?random=4',
        'title' => 'VoiceMate',
        'description' => 'Voice assistant for smart automation and productivity.'
    ],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AI Agents Marketplace</title>
    <link rel="stylesheet" href="assets/style.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>
    <div class="container">
        <?php foreach ($agents as $agent): ?>
            <div class="agent-box">
                <img src="<?= $agent['image'] ?>" alt="<?= $agent['title'] ?>" class="agent-image">
                <h2 class="agent-title"><?= $agent['title'] ?></h2>
                <p class="agent-description"><?= $agent['description'] ?></p>
                <button class="configure-btn">Configure</button>
            </div>
        <?php endforeach; ?>
    </div>
    <script src="js/main.js"></script>
</body>
</html> 