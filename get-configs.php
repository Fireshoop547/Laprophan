<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Check if configs directory exists
if (!is_dir('configs')) {
    echo json_encode(['configs' => []]);
    exit();
}

// Get all JSON files in the configs directory
$files = glob('configs/*.json');
$configs = [];

foreach ($files as $file) {
    $content = file_get_contents($file);
    $data = json_decode($content, true);
    
    if ($data) {
        // Add filename for reference
        $data['filename'] = basename($file);
        $configs[] = $data;
    }
}

// Sort by timestamp (newest first)
usort($configs, function($a, $b) {
    return strtotime($b['timestamp']) - strtotime($a['timestamp']);
});

echo json_encode([
    'success' => true,
    'configs' => $configs,
    'count' => count($configs)
]);
?> 