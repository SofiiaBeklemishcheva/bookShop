import React from "react";
import styles from "./authPopUp.module.css";
import LoginForm from "../LoginForm/loginForm";
import RegisterForm from "../RegisterForm/registerForm";

const AuthPopup = ({ onClose, setIsLoggedIn }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button onClick={onClose} className={styles.closeButton}>X</button>
                <h2>Log in or Register</h2>

                {/* Formularze */}
                <LoginForm setIsLoggedIn={setIsLoggedIn} />
                <RegisterForm />
            </div>
        </div>
    );
};

export default AuthPopup;
