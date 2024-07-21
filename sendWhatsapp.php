<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = $data['name'];
    $email = $data['email'];
    $subject = $data['subject'];
    $message = $data['message'];
    
    $phone = 'YOUR_PHONE_NUMBER';
    $apiToken = 'YOUR_WHATSAPP_API_TOKEN';

    $whatsAppMessage = "Name: $name\nEmail: $email\nSubject: $subject\nMessage: $message";

    $url = 'https://api.whatsapp.com/send?phone=' . $phone . '&text=' . urlencode($whatsAppMessage);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    if ($response) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>

