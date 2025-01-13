import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./logOutButton.module.css";

const LogOutButton = ({ setIsLoggedIn, setUserData, onLogout }) => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        onLogout();

        if (window.location.pathname === "/myProfile") {
            navigate("/home");
        }
    };

    return (
        <button className={styles.logOutButton} onClick={handleLogOut}>
            <img className={styles.layoutLogOutImg} src="/assets/icons/logout.png" alt="Wyloguj"/>
        </button>
    );
};

export default LogOutButton;
