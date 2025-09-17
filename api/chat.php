<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$token = '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';
$model = 'tiiuae/falcon-7b-instruct';

$data = json_decode(file_get_contents('php://input'), true);
$userInput = $data['message'] ?? '';

$response = @file_get_contents("https://api-inference.huggingface.co/models/$model", false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Authorization: Bearer $token\r\nContent-Type: application/json\r\n",
        'content' => json_encode(["inputs" => $userInput]),
        'timeout' => 60
    ]
]));

if ($response === false) {
    echo json_encode(['error' => 'ارتباط برقرار نشد ⚠️']);
    exit;
}

$result = json_decode($response, true);
$answer = $result[0]['generated_text'] ?? 'پاسخی دریافت نشد 😢';

echo json_encode(['answer' => $answer]);
