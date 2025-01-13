<?php
namespace API;

use PDO;
use API\OrderService;

class OrderController
{
    private $orderService;

    public function __construct($db)
    {
        $this->orderService = new OrderService($db);
    }

    public function getOrders($client_id)
    {
        $result = $this->orderService->getOrdersByClientId($client_id);

        if ($result["status"] === "success") {
            // Zwracamy zamówienia
            echo json_encode($result);
        } else {
            // Zwracamy błąd
            echo json_encode($result);
        }
    }
}
