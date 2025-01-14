import React, { useState } from "react";
import styles from "./registerForm.module.css";

const RegisterForm = ({ handleLoginSuccess, onClose, setIsLoggedIn, setUserData }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        // Sprawdzenie, czy hasła pasują
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Sprawdzenie, czy email i hasło są wprowadzone
        if (!email || !password) {
            setError("Email and password are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:PORT/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (error) {
                throw new Error("Invalid JSON response");
            }

            if (data.status === "success" && data.user) {
                // Rejestracja zakończona sukcesem, automatyczne logowanie
                handleLoginSuccess(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUserData(data.user);
                setIsLoggedIn(true);
                setSuccessMessage("Registration successful! You are now logged in.");
                onClose(); // Zamknięcie popupu po udanej rejestracji
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            setError("An error occurred while registering");
        }
    };

    return (
        <form onSubmit={handleRegister} className={styles.formContainer}>
            <h3>Register</h3>

            {error && <div className={styles.error}>{error}</div>}
            {successMessage && <div className={styles.success}>{successMessage}</div>}

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.formInput}
                    placeholder="Enter your email"
                />
            </div>

            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.formInput}
                    placeholder="Enter your password"
                />
            </div>

            <div>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={styles.formInput}
                    placeholder="Confirm your password"
                />
            </div>

            <button type="submit" className={styles.submitButton}>
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
