<?php

namespace API;

use PDO;
use PDOException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService
{
    private $conn;
    private $jwtSecret;
    private $jwtIssuer;
    private $jwtExpirationTime;

    public function __construct($db, $config)
    {
        $this->conn = $db;
        $this->jwtSecret = $config['jwt_secret'];
        $this->jwtIssuer = $config['jwt_issuer'];
        $this->jwtExpirationTime = $config['jwt_expiration_time'];
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
                    $token = $this->generateToken($user['id'], $user['login']);
                    return [
                        "status" => "success",
                        "message" => "Login successful",
                        "token" => $token,
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

    private function generateToken($userId, $login)
    {
        $issuedAt = time();
        $expirationTime = $issuedAt + $this->jwtExpirationTime;

        $payload = [
            'iss' => $this->jwtIssuer,
            'iat' => $issuedAt,
            'exp' => $expirationTime,
            'sub' => $userId,
            'login' => $login
        ];

        return JWT::encode($payload, $this->jwtSecret, 'HS256');
    }

    public function validateToken($token)
    {
        try {
            return (array) JWT::decode($token, new Key($this->jwtSecret, 'HS256'));
        } catch (\Exception $e) {
            return null;
        }
    }
}
