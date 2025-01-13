import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.css";

const LoginForm = ({ handleLoginSuccess, onClose, setIsLoggedIn, setUserData }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:PORT/auth/login", {
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
                handleLoginSuccess(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUserData(data.user);
                setIsLoggedIn(true);
                onClose();
                navigate("/home");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (error) {
            setError("An error occurred while logging in");
        }
    };

    return (
        <form onSubmit={handleLogin} className={styles.formContainer}>
            <h3>Zaloguj się</h3>
            {error && <div className={styles.error}>{error}</div>}

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.formInput}
                    placeholder="Wprowadź swój email"
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
                    placeholder="Wprowadź swoje hasło"
                />
            </div>

            <button type="submit" className={styles.submitButton}>
                Log in
            </button>
        </form>
    );
};

export default LoginForm;
