import React, { useState } from "react";
import styles from "./authButton.module.css";
import AuthPopup from "../AuthPopUp/authPopUp"; // Importujemy popup

const AuthButton = ({ isLoggedIn, setIsLoggedIn }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleButtonClick = () => {
        if (isLoggedIn) {
            window.location.href = "/myProfile";
        } else {
            // Pokaż popup
            setIsPopupVisible(true);
        }
    };

    return (
        <>
            {/* Przycisk */}
            <button onClick={handleButtonClick} className={styles.loginButtonContainer}>
                <img
                    src={isLoggedIn ? "../assets/icons/userLogedIn.png" : "../assets/icons/userNotLogedIn.png"} // Zmieniamy obrazek
                    alt={isLoggedIn ? "Go to profile" : "Log in"}
                    className={styles.loginImg}
                />
            </button>

            {/* Popup */}
            {isPopupVisible && (
                <AuthPopup onClose={() => setIsPopupVisible(false)} setIsLoggedIn={setIsLoggedIn} />
            )}
        </>
    );
};

export default AuthButton;
