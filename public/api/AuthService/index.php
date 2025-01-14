<?php

require_once './config.php';
require_once 'AuthService.php';
require_once 'vendor/autoload.php';

use API\AuthService;

header('Content-Type: application/json');

$config = require './config.php';
try {
    $conn = new PDO("mysql:host=localhost;dbname=book_shop", "root", "root");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $e->getMessage()]);
    exit;
}

$authService = new AuthService($conn, $config);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['action'])) {
        if ($data['action'] === 'login' && isset($data['email'], $data['password'])) {
            echo json_encode($authService->loginUser($data['email'], $data['password']));
        } elseif ($data['action'] === 'register' && isset($data['login'], $data['password'])) {
            echo json_encode($authService->addClient($data['login'], password_hash($data['password'], PASSWORD_DEFAULT)));
        } elseif ($data['action'] === 'validateToken' && isset($data['token'])) {
            $decodedToken = $authService->validateToken($data['token']);
            if ($decodedToken) {
                echo json_encode(["status" => "success", "message" => "Token is valid", "data" => $decodedToken]);
            } else {
                echo json_encode(["status" => "error", "message" => "Invalid or expired token"]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid action or missing fields"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No action specified"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
