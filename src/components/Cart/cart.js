import React, { useState, useEffect } from "react";
import styles from "./cart.module.css";
import CartItem from "../CartItem/cartItem";

const Cart = ({ cartItems = [], onUpdateCart, onRemoveItem, userData }) => {
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        const value = cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);
        setTotalValue(value);
    }, [cartItems]);

    const updateAmount = (id, action) => {
        const updatedCart = cartItems.map(item => {
            if (item.ID === id) {
                const newAmount = action === "increase" ? item.amount + 1 : item.amount - 1;
                return { ...item, amount: newAmount };
            }
            return item;
        });
        onUpdateCart(updatedCart);
    };

    const handleOrder = () => {
        if (!userData) {
            alert("Musisz być zalogowany, aby złożyć zamówienie.");
            return;
        }

        const orderData = cartItems.map(item => ({
            product_id: item.ID,
            client_id: userData.id,
            status: 1,
            amount: item.amount,
        }));

        fetch('http://localhost:PORT/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: orderData }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("Zamówienie zostało złożone!");
                } else {
                    alert("Wystąpił błąd podczas składania zamówienia");
                }
            })
            .catch((error) => console.error("Wystąpił błąd:", error));
    };

    return (
        <div className={styles.cartContainer}>
            <p>Twój koszyk ({cartItems.length})</p>
            {cartItems.map((item) => (
                <CartItem
                    key={item.ID}
                    img={item.img}
                    label={item.label}
                    price={item.price}
                    name={item.name}
                    author={item.authorName}
                    publisher={item.publisher}
                    genre={item.genre}
                    ID={item.ID}
                    amount={item.amount}
                    onAmountChange={updateAmount}
                    onRemove={onRemoveItem}
                />
            ))}

            <p className="summary-container">
                Wartość koszyka: {totalValue.toFixed(2)} zł.
            </p>

            <button className={styles.orderButton} onClick={handleOrder}>
                Zamawiam
            </button>
        </div>
    );
};

export default Cart;
