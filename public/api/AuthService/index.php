<?php

require_once './config.php';
require_once 'AuthService.php';

use API\AuthService;

header('Content-Type: application/json');

$authService = new AuthService($conn);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['action'])) {
        if ($data['action'] === 'login' && isset($data['email'], $data['password'])) {
            echo json_encode($authService->loginUser($data['email'], $data['password']));
        } elseif ($data['action'] === 'register' && isset($data['login'], $data['password'])) {
            echo json_encode($authService->addClient($data['login'], password_hash($data['password'], PASSWORD_DEFAULT)));
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid action or missing fields"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No action specified"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
