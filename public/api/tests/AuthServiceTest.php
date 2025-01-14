<?php

use PHPUnit\Framework\TestCase;
use API\AuthService;

class AuthServiceTest extends TestCase
{
    private $db;
    private $config;
    private $authService;

    protected function setUp(): void
    {
        $this->config = [
            'jwt_secret' => 'test_secret_key',
            'jwt_issuer' => 'test-app',
            'jwt_expiration_time' => 3600
        ];

        $this->db = new PDO('sqlite::memory:');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $this->db->exec("
            CREATE TABLE clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                login TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        ");

        $this->authService = new AuthService($this->db, $this->config);
    }

    public function testRegisterUser(): void
    {
        $result = $this->authService->addClient('testuser', password_hash('password123', PASSWORD_DEFAULT));
        $this->assertEquals('success', $result['status']);
        $this->assertEquals('User registered', $result['message']);

        $stmt = $this->db->prepare("SELECT * FROM clients WHERE login = :login");
        $stmt->execute(['login' => 'testuser']);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->assertNotEmpty($user);
        $this->assertEquals('testuser', $user['login']);
    }

    public function testRegisterDuplicateUser(): void
    {
        $this->authService->addClient('testuser', password_hash('password123', PASSWORD_DEFAULT));

        $result = $this->authService->addClient('testuser', password_hash('password123', PASSWORD_DEFAULT));
        $this->assertEquals('error', $result['status']);
        $this->assertEquals('User already exists', $result['message']);
    }

    public function testLoginUser(): void
    {
        $hashedPassword = password_hash('password123', PASSWORD_DEFAULT);
        $this->authService->addClient('testuser', $hashedPassword);

        $result = $this->authService->loginUser('testuser', 'password123');
        $this->assertEquals('success', $result['status']);
        $this->assertNotEmpty($result['token']);

        $result = $this->authService->loginUser('testuser', 'wrongpassword');
        $this->assertEquals('error', $result['status']);
        $this->assertEquals('Invalid credentials', $result['message']);
    }

    public function testValidateToken(): void
    {
        $this->authService->addClient('testuser', password_hash('password123', PASSWORD_DEFAULT));
        $loginResult = $this->authService->loginUser('testuser', 'password123');
        $token = $loginResult['token'];

        $decoded = $this->authService->validateToken($token);
        $this->assertNotNull($decoded);
        $this->assertEquals('testuser', $decoded['login']);

        $invalidToken = $token . 'invalid';
        $decoded = $this->authService->validateToken($invalidToken);
        $this->assertNull($decoded);
    }
}
