<?php
global $conn;
require_once './config.php';

$userId = 1;

setcookie("user_id", $userId, [
    'expires' => time() + 3600,
    'path' => '/',
    'httponly' => true,
    'secure' => true,
    'samesite' => 'Lax'
]);

error_log(print_r(getallheaders(), true));

header('Content-Type: application/json');

$request = $_SERVER['REQUEST_URI'];
$request = strtok($request, '?');

switch ($request) {
    case '/products':
        try {
            $stmt = $conn->prepare("SELECT p.ID, p.name AS label, p.price, p.photoSrc AS img,
                                          g.name AS genre, a.name AS authorName, a.surname AS authorSurname, p.average_rate AS rate
                                      FROM products p
                                      JOIN genres g ON p.genre_id = g.id
                                      JOIN authors a ON p.author_id = a.id");
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($products)) {
                throw new Exception("No products found in the database.");
            }

            echo json_encode($products);

        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Not Found"]);
        break;
}
