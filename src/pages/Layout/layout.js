import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Layout/layout.module.css";
import AuthButton from "../../components/AuthButton/authButton";
import LogOutButton from "../../components/LogOutButton/logOutButton";
import { Outlet } from "react-router-dom";
import AuthPopup from "../../components/AuthPopUp/authPopUp";

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUserData(parsedUser);
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Błąd parsowania danych użytkownika z localStorage", error);
            }
        }
    }, []);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const handleLoginSuccess = (user) => {
        setIsLoggedIn(true);
        setUserData(user);
        localStorage.setItem("user", JSON.stringify(user));
        closePopup();
        navigate("/home");
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        localStorage.removeItem("user");
        navigate("/home");
    };

    return (
        <div className={styles.page}>
            <div className={styles.layoutContainer}>
                <div className={styles.imgButtonsContainer}>
                    <AuthButton
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                    />
                    {isLoggedIn && (
                        <LogOutButton
                            setIsLoggedIn={setIsLoggedIn}
                            setUserData={setUserData}
                            onLogout={handleLogout}
                        />
                    )}
                </div>

                <nav className={styles.navBar}>
                    <button onClick={() => navigate("/home")}>
                        Home
                    </button>
                </nav>
            </div>

            <div className={styles.content}>
                <Outlet context={{ userData, setIsLoggedIn, setUserData }} />
            </div>

            {isPopupOpen && (
                <AuthPopup
                    onClose={closePopup}
                    handleLoginSuccess={handleLoginSuccess}
                />
            )}
        </div>
    );
};

export default Layout;
