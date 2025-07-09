<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get the JSON data from the request
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit();
}

// Create a unique filename with timestamp
$timestamp = date('Y-m-d_H-i-s');
$filename = "configs/config_{$timestamp}.json";

// Create configs directory if it doesn't exist
if (!is_dir('configs')) {
    mkdir('configs', 0755, true);
}

// Save the configuration data
$result = file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));

if ($result === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save configuration']);
    exit();
}

// Return success response
echo json_encode([
    'success' => true,
    'filename' => $filename,
    'id' => $data['id'] ?? 'unknown',
    'message' => 'Configuration saved successfully'
]);
?> 