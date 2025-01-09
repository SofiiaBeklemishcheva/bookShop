import React, { useState, useEffect } from "react";
import "./cart.module.css";

const Cart = ({ cartItems, onUpdateCart }) => {
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        // Obliczenie łącznej wartości koszyka
        const value = cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);
        setTotalValue(value);
    }, [cartItems]);

    const increaseAmount = (id) => {
        onUpdateCart(id, "increase");
    };

    const decreaseAmount = (id) => {
        onUpdateCart(id, "decrease");
    };

    return (
        <div className="cart-container">
            <p>Twój koszyk ({cartItems.length})</p>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                        <img src={item.img} alt={item.label} className="cart-item-img" />
                        <div className="cart-item-details">
                            <p>{item.label}</p>
                            <p>{item.price} zł</p>
                            <div className="cart-item-quantity">
                                <button onClick={() => decreaseAmount(item.id)}>-</button>
                                <input
                                    type="text"
                                    readOnly
                                    value={item.amount}
                                    className="amount-display"
                                />
                                <button onClick={() => increaseAmount(item.id)}>+</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <p className="summary-container">
                Wartość koszyka: {totalValue.toFixed(2)} zł.
            </p>
        </div>
    );
};

export default Cart;
