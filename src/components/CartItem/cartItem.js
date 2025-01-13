import React from 'react';
import styles from './cartItem.module.css';
import placeholderImage from '../books.png';

const CartItem = ({
                      img,
                      label,
                      price,
                      name,
                      author,
                      publisher,
                      genre,
                      ID,
                      amount,
                      onAmountChange,
                      onRemove,
                  }) => {

    const handleAmountChange = (action) => {
        if (onAmountChange) {
            onAmountChange(ID, action);
        }
    };

    const handleRemove = () => {
        if (onRemove) {
            onRemove(ID);
        }
    };

    return (
        <div className={styles.cartItemContainer}>
            <div className={styles.headPartContainer}>
                <div className={styles.headPartContentContainer}>
                    <img
                        className={styles.bookImg}
                        src={img}
                        alt={label}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = placeholderImage;
                        }}
                    />
                    <div className={styles.headRightPartContainer}>
                        <button className={styles.deleteButton} onClick={handleRemove}>
                            <img
                                className={styles.layoutLogOutImg}
                                src="/assets/icons/delate.png"
                                alt="Usuń"
                            />
                        </button>
                        <div className={styles.priceDetailsContainer}>
                            <p className={styles.label}>{price} zł.</p>
                            <p className={styles.label}>Cena z VAT 23%</p>
                            <p className={styles.label}>{price} zł. x {amount}</p>

                            <div className={styles.amountContainer}>
                                <button
                                    onClick={() => handleAmountChange("increase")}
                                    id={`increase-${ID}`}
                                >
                                    +
                                </button>
                                <span>{amount}</span>
                                <button
                                    onClick={() => handleAmountChange("decrease")}
                                    disabled={amount <= 1}
                                    id={`decrease-${ID}`}
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.productDetailsDescription}>
                <p className={styles.label}>{name}</p>
                <p className={styles.label}>{author}</p>
                <p className={styles.label}>{publisher}</p>
                <p className={styles.label}>{genre}</p>
            </div>
        </div>
    );
};

export default CartItem;
