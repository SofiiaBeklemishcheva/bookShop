<?php

namespace API;

use PDO;
use PDOException;

class AuthService
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function loginUser($email, $password)
    {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM clients WHERE login = :login");
            $stmt->bindParam(':login', $email);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if (password_verify($password, $user['password'])) {
                    return [
                        "status" => "success",
                        "message" => "Login successful",
                        "user" => [
                            "id" => $user['id'],
                            "name" => $user['login']
                        ]
                    ];
                }
            }
            return ["status" => "error", "message" => "Invalid credentials"];
        } catch (PDOException $e) {
            return ["status" => "error", "message" => $e->getMessage()];
        }
    }

    public function addClient($login, $password)
    {
        try {
            $stmt = $this->conn->prepare("SELECT COUNT(*) FROM clients WHERE login = :login");
            $stmt->bindParam(':login', $login);
            $stmt->execute();
            $exists = $stmt->fetchColumn();

            if ($exists > 0) {
                return ["status" => "error", "message" => "User already exists"];
            }

            $stmt = $this->conn->prepare("INSERT INTO clients (login, password) VALUES (:login, :password)");
            $stmt->bindParam(':login', $login);
            $stmt->bindParam(':password', $password);
            $stmt->execute();

            return ["status" => "success", "message" => "User registered"];
        } catch (PDOException $e) {
            return ["status" => "error", "message" => $e->getMessage()];
        }
    }
}
