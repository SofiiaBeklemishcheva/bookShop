import React, { useState } from "react";
import styles from "./loginForm.module.css";

const LoginForm = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Symulacja logowania (z backendem wyślij dane w fetch POST)
        if (email === "user@example.com" && password === "password") {
            alert("Logged in!");
            setIsLoggedIn(true); // Zmień stan zalogowania
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleLogin} className={styles.formContainer}>
            <h3>Zaloguj się</h3>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.formInput}
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
                />
            </div>
            <button type="submit" className={styles.submitButton}>Log in</button>
        </form>
    );
};

export default LoginForm;
