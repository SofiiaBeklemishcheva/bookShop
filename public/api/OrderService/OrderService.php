<?php

namespace API;

use PDO;
use PDOException;

class OrderService
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Metoda do dodawania zamówienia
    public function addOrder($product_id, $client_id, $status, $amount)
    {
        try {
            $stmt = $this->conn->prepare("INSERT INTO carts (product_id, client_id, status, amount)
                                          VALUES (:product_id, :client_id, :status, :amount)");
            $stmt->bindParam(':product_id', $product_id);
            $stmt->bindParam(':client_id', $client_id);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':amount', $amount);
            $stmt->execute();

            return ["status" => "success", "message" => "Order placed successfully"];
        } catch (PDOException $e) {
            return ["status" => "error", "message" => $e->getMessage()];
        }
    }

    // Metoda do pobierania zamówień dla klienta na podstawie jego ID
    public function getOrdersByClientId($client_id)
    {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM carts WHERE client_id = :client_id");
            $stmt->bindParam(':client_id', $client_id);
            $stmt->execute();
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return ["status" => "success", "orders" => $orders];
        } catch (PDOException $e) {
            return ["status" => "error", "message" => $e->getMessage()];
        }
    }
}

