<?php
$servername = "localhost";
$database = "book_shop";
$username = "root";
$password = "root";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "ProductService: Connection failed: " . $e->getMessage()]);
    exit;
} 