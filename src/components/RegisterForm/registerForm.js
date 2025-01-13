import React, { useState } from "react";
import styles from "./home.module.css";
import ProductTile from "../../components/ProductTile/productTile";
import Cart from "../../components/Cart/cart";
import useFetchProducts from "../../hooks/useFetchProducts";
import { useNavigate, useOutletContext } from "react-router-dom";

const Home = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const { userData, setIsLoggedIn, setUserData } = useOutletContext(); // Dostęp do userData
    console.log("UserData in Home:", userData);  // Zaloguj dane użytkownika

    const { products, loading, error } = useFetchProducts();
    console.log("Home:", userData);

    const toggleCartVisibility = () => {
        setIsCartVisible((prev) => !prev);
    };

    const addToCart = (book) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.ID === book.ID);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.ID === book.ID
                        ? { ...item, amount: item.amount + 1 }
                        : item
                );
            }
            return [...prevItems, { ...book, amount: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.ID !== id));
    };

    const updateCart = (updatedCartItems) => {
        setCartItems(updatedCartItems);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.pageContentContainer}>
            <div className={styles.cartButtonContainer}>
                <button onClick={toggleCartVisibility} className={styles.cartButton}>
                    <img className={styles.layoutLogOutImg} src="/assets/icons/cart.png" alt="Koszyk" />
                </button>
            </div>

            <div className={styles.pageOrganization}>
                <div className={styles.contentContainer}>
                    {products.map((product) => (
                        <ProductTile
                            key={product.ID}
                            id={product.ID}
                            label={product.label}
                            authorName={product.authorName}
                            price={product.price}
                            img={product.img}
                            genre={product.genre}
                            rate={product.rate}
                            onAddToCart={() => addToCart(product)}
                        />
                    ))}
                </div>

                {isCartVisible && (
                    <div className={styles.cartContainer}>
                        <Cart
                            cartItems={cartItems}
                            onUpdateCart={updateCart}
                            onRemoveItem={removeFromCart}
                            userData={userData}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
