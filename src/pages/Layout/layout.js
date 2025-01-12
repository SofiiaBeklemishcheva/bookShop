import { Outlet, useNavigate } from "react-router-dom";
import styles from "../Layout/layout.module.css";
import '../../App.css';
import AuthButton from "../../components/AuthButton/authButton";
import {useState} from "react";

const Layout = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const buttons = [
        {
            id: "home",
            buttonName: "Home",
            buttonLink: "/home"
        }
    ];

    return (
        <div className={styles.page}>
            <div className={styles.layoutContainer}>
                <div className={styles.imgButtonsContainer}>
                <AuthButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <button
                    className={styles.logOutButton}
                >
                    <img
                        className={styles.layoutLogOutImg}
                        src="/assets/icons/cart.png"
                        alt="Menu"
                    />
                </button>
                <button
                    className={styles.logOutButton}
                >
                    <img
                        className={styles.layoutLogOutImg}
                        src="/assets/icons/logout.png"
                        alt="Menu"
                    />
                </button>
                </div>
                <nav className={styles.navBar}>
                    <div className={styles.logoContainer}></div>
                    {buttons.map((button) => (
                        <button
                            key={button.id}
                            className={styles.navBarButton}
                            onClick={() => navigate(button.buttonLink)}
                        >
                            {button.buttonName}
                        </button>
                    ))}
                </nav>
            </div>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;
