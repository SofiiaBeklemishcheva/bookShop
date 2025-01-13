import React, { useState } from "react";
import styles from "./authButton.module.css";
import AuthPopup from "../AuthPopUp/authPopUp";

const AuthButton = ({ isLoggedIn, setIsLoggedIn }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleButtonClick = () => {
        if (isLoggedIn) {
            window.location.href = "/home";
        } else {
            setIsPopupVisible(true);
        }
    };

    return (
        <>
            <button onClick={handleButtonClick} className={styles.loginButtonContainer}>
                <img
                    src={isLoggedIn ? "../assets/icons/userLogedIn.png" : "../assets/icons/userNotLogedIn.png"}
                    alt={isLoggedIn ? "Go to profile" : "Log in"}
                    className={styles.loginImg}
                />
            </button>

            {isPopupVisible && (
                <AuthPopup
                    onClose={() => setIsPopupVisible(false)}
                    handleLoginSuccess={(user) => {
                        setIsLoggedIn(true);
                        localStorage.setItem("user", JSON.stringify(user));
                        setIsPopupVisible(false);
                    }}
                />
            )}
        </>
    );
};

export default AuthButton;
