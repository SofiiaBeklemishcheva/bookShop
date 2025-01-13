<?php

namespace API;

use Exception;
use PDO;
use PDOException;

class ProductService
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getProducts()
    {
        try {
            $stmt = $this->conn->prepare("SELECT p.ID, p.name AS label, p.price, p.photoSrc AS img,
                                          g.name AS genre, a.name AS authorName, a.surname AS authorSurname, p.average_rate AS rate
                                      FROM products p
                                      JOIN genres g ON p.genre_id = g.id
                                      JOIN authors a ON p.author_id = a.id");
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($results)) {
                throw new Exception("No products found in the database.");
            }

            return $results;
        } catch (PDOException $e) {
            return ["error" => "Database error: " . $e->getMessage()];
        } catch (Exception $e) {
            return ["error" => $e->getMessage()];
        }
    }
}
