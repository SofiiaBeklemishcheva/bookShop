import React from "react";
import "./cartItem.module.css";

const CartItem = ({
                      img,
                      label,
                      price,
                      name,
                      author,
                      publisher,
                      genre,
                      id,
                      amount,
                      onAmountChange
                  }) => {
    const priceWithTax = price.toFixed(2); // W razie potrzeby można obliczać VAT

    return (
        <div className="cart-item-container">
            <div className="item-top-container">
                <img className="book-img" src={img} alt={label} />
                <div className="item-price-container">
                    <p className="item-price">{price} zł</p>
                    <p className="item-label">Cena z VAT 23%</p>
                    <p className="item-price-with-tax">
                        {priceWithTax} zł x {amount}
                    </p>
                    <ChangeAmount
                        id={id}
                        amount={amount}
                        onAmountChange={onAmountChange}
                    />
                </div>
            </div>
            <div className="item-description-container">
                <p className="item-description">{name}</p>
                <p className="item-description">{author}</p>
                <p className="item-description">{publisher}</p>
                <p className="item-description">{genre}</p>
            </div>
        </div>
    );
};

export default CartItem;
