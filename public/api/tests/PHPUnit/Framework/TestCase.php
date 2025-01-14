<?php

namespace PHPUnit\Framework;

abstract class TestCase
{
    protected function setUp(): void
    {
    }

    protected function tearDown(): void
    {
    }

    public function assertEquals($expected, $actual, $message = ''): void
    {
        if ($expected !== $actual) {
            throw new \PHPUnit\Framework\AssertionFailedError(
                $message ?: "Failed asserting that two variables are equal."
            );
        }
    }

    public function assertIsArray($value, $message = ''): void
    {
        if (!is_array($value)) {
            throw new \PHPUnit\Framework\AssertionFailedError(
                $message ?: "Failed asserting that variable is an array."
            );
        }
    }

    public function assertCount($expectedCount, $haystack, $message = ''): void
    {
        $this->assertEquals($expectedCount, count($haystack), $message);
    }

    public function assertNotEmpty($value, $message = ''): void
    {
        if (empty($value)) {
            throw new \PHPUnit\Framework\AssertionFailedError(
                $message ?: "Failed asserting that variable is not empty."
            );
        }
    }
}
