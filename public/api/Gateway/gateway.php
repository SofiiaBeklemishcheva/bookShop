<?php

header('Content-Type: application/json');

$requestPath = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

switch (true) {
    case str_starts_with($requestPath, '/auth'):
        require_once '../AuthService/index.php';
        break;
    case str_starts_with($requestPath, '/products'):
        require_once '../ProductService/index.php';
        break;
    case str_starts_with($requestPath, '/orders'):
        require_once '../OrderService/index.php';
        break;
    default:
        echo json_encode(["status" => "error", "message" => "Endpoint not found"]);
}
