import React, { useState } from "react";
import styles from "./registerForm.module.css"

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        // Symulacja rejestracji (z backendem wyślij dane w fetch POST)
        alert(`Registered with email: ${email}`);
    };

    return (
        <form onSubmit={handleRegister}>
            <h3>Register</h3>
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
            <button type="submit" className={styles.submitButton}>Register</button>
        </form>
    );
};

export default RegisterForm;
