import React from 'react';
import './orderButton.module.css';

const OrderButton = ({ onOrder }) => {

    const handleOrder = (e) => {
        e.preventDefault(); 
        if (onOrder) {
            onOrder();
        }
    };

    return (
        <div className="order-button-container">
            <input
                type="submit"
                className="order-button"
                value="ZAMAWIAM"
                onClick={handleOrder}
            />
        </div>
    );
};

export default OrderButton;
