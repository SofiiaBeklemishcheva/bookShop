import React from 'react';
import styles from './productTile.module.css';
import placeholderImage from '../books.png';

const ProductTile = ({
                         label,
                         authorName,
                         price,
                         img,
                         id,
                         genre,
                         stock,
                         onAddToCart,
                         rate,
                     }) => {
    // Funkcja wywoływana po kliknięciu przycisku dodania do koszyka
    const handleAddToCart = (e) => {
        e.preventDefault();
        const productData = {
            product_id: id,
            product_label: label,
            product_author: authorName,
            product_price: price,
            product_image: img,
            product_genre: genre,
            product_stock: stock,
            product_rate: rate,
        };
        onAddToCart(productData); // Wywołanie funkcji przekazanej jako props
    };

    return (
        <div className={styles.productTileContainer}>
            <img
                className={styles.productTileImg}
                src={img}
                alt={label}
                onError={(e) => {
                    e.target.onerror = null; // Zapobieganie nieskończonemu wywołaniu `onError`
                    e.target.src = placeholderImage; // Ustawienie obrazu zastępczego
                }}
            />
            <p className={styles.productTileLabel}>{label}</p>
            <p className={styles.productTileLabel}>{authorName}</p>
            <p className={styles.productTileLabel}>Ocena użytkowników: {rate}</p>
            <p className={styles.productTilePrice}>{price} zł</p>

            {/* Formularz wysyła dane produktu */}
            <form onSubmit={handleAddToCart}>
                {/* Ukryte pola do przesyłania danych */}
                <input type="hidden" name="product_id" value={id}/>
                <input type="hidden" name="product_label" value={label}/>
                <input type="hidden" name="product_author" value={authorName}/>
                <input type="hidden" name="product_price" value={price}/>
                <input type="hidden" name="product_image" value={img}/>
                <input type="hidden" name="product_genre" value={genre}/>
                <input type="hidden" name="product_stock" value={stock}/>
                <input type="hidden" name="product_rate" value={rate}/>

                {/* Przycisk "Dodaj do koszyka" */}
                <button type="submit" className={styles.addToCartButton}>
                    <img className={styles.addToCartButtonImg} src={"../../assets/icons/cartWhite.png"}/>
                    Dodaj do koszyka
                </button>
            </form>
        </div>
    );
};

export default ProductTile;
