<?php

use PHPUnit\Framework\TestCase;
use API\ProductService;

class ProductServiceTest extends TestCase
{
    private $db;
    private $productService;

    protected function setUp(): void
    {
        $this->db = new PDO('sqlite::memory:');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $this->db->exec("
            CREATE TABLE products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                photoSrc TEXT NOT NULL,
                genre_id INTEGER NOT NULL,
                author_id INTEGER NOT NULL,
                average_rate REAL NOT NULL
            )
        ");

        $this->db->exec("
            CREATE TABLE genres (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )
        ");

        $this->db->exec("
            CREATE TABLE authors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                surname TEXT NOT NULL
            )
        ");

        $this->db->exec("
            INSERT INTO genres (name) VALUES ('Fiction'), ('Non-Fiction')
        ");

        $this->db->exec("
            INSERT INTO authors (name, surname) VALUES ('John', 'Doe'), ('Jane', 'Smith')
        ");

        $this->productService = new ProductService($this->db);
    }

    public function testGetProductsReturnsProducts(): void
    {
        $this->db->exec("
            INSERT INTO products (name, price, photoSrc, genre_id, author_id, average_rate)
            VALUES ('Book 1', 19.99, 'image1.jpg', 1, 1, 4.5),
                   ('Book 2', 29.99, 'image2.jpg', 2, 2, 4.0)
        ");

        $result = $this->productService->getProducts();

        $this->assertIsArray($result);
        $this->assertCount(2, $result);

        $product1 = $result[0];
        $this->assertEquals('Book 1', $product1['label']);
        $this->assertEquals(19.99, $product1['price']);
        $this->assertEquals('image1.jpg', $product1['img']);
        $this->assertEquals('Fiction', $product1['genre']);
        $this->assertEquals('John', $product1['authorName']);
        $this->assertEquals('Doe', $product1['authorSurname']);
        $this->assertEquals(4.5, $product1['rate']);
    }

    public function testGetProductsReturnsEmpty(): void
    {
        $result = $this->productService->getProducts();

        $this->assertIsArray($result);
        $this->assertArrayHasKey('error', $result);
        $this->assertEquals('No products found in the database.', $result['error']);
    }

    public function testGetProductsDatabaseError(): void
    {
        $this->db->exec("DROP TABLE products");

        $result = $this->productService->getProducts();

        $this->assertIsArray($result);
        $this->assertArrayHasKey('error', $result);
        $this->assertStringContainsString('Database error:', $result['error']);
    }
}
