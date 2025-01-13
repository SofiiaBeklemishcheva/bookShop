<?php

require_once './config.php';
require_once 'OrderService.php';

use API\OrderService;

header('Content-Type: application/json');

$orderService = new OrderService($conn);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['product_id'], $data['client_id'], $data['status'], $data['amount'])) {
        echo json_encode($orderService->addOrder($data['product_id'], $data['client_id'], $data['status'], $data['amount']));
    } else {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
