<?php

use PHPUnit\Framework\TestCase;
use API\OrderService;

class OrderServiceTest extends TestCase
{
    private $db;
    private $orderService;

    protected function setUp(): void
    {
        $this->db = new PDO('sqlite::memory:');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $this->db->exec("
            CREATE TABLE carts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id INTEGER NOT NULL,
                client_id INTEGER NOT NULL,
                status TEXT NOT NULL,
                amount INTEGER NOT NULL
            )
        ");

        $this->orderService = new OrderService($this->db);
    }

    public function testAddOrder(): void
    {
        $result = $this->orderService->addOrder(1, 1, 'pending', 3);
        $this->assertEquals('success', $result['status']);
        $this->assertEquals('Order placed successfully', $result['message']);

        $stmt = $this->db->prepare("SELECT * FROM carts WHERE client_id = :client_id");
        $stmt->execute(['client_id' => 1]);
        $order = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->assertNotEmpty($order);
        $this->assertEquals(1, $order['product_id']);
        $this->assertEquals('pending', $order['status']);
        $this->assertEquals(3, $order['amount']);
    }

    public function testGetOrdersByClientId(): void
    {
        $this->orderService->addOrder(1, 1, 'pending', 3);
        $this->orderService->addOrder(2, 1, 'completed', 5);

        $result = $this->orderService->getOrdersByClientId(1);
        $this->assertEquals('success', $result['status']);
        $this->assertCount(2, $result['orders']);

        $order1 = $result['orders'][0];
        $this->assertEquals(1, $order1['product_id']);
        $this->assertEquals('pending', $order1['status']);

        $order2 = $result['orders'][1];
        $this->assertEquals(2, $order2['product_id']);
        $this->assertEquals('completed', $order2['status']);
    }

    public function testGetOrdersByClientIdNoOrders(): void
    {
        $result = $this->orderService->getOrdersByClientId(1);
        $this->assertEquals('success', $result['status']);
        $this->assertEmpty($result['orders']);
    }
}
