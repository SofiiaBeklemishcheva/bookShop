import React from 'react';
import './productTile.module.css';

const ProductTile = ({
                         label,
                         authorName,
                         price,
                         img,
                         id,
                         genre,
                         stock,
                         onAddToCart,
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
        };
        onAddToCart(productData); // Wywołanie funkcji przekazanej jako props
    };

    return (
        <div className="product-tile-container">
            <img className="product-tile-img" src={img} alt={label} />
            <p className="product-tile-label">{label}</p>
            <p className="product-tile-author">{authorName}</p>
            <p className="product-tile-price">{price} zł</p>

            {/* Formularz wysyła dane produktu */}
            <form onSubmit={handleAddToCart}>
                {/* Ukryte pola do przesyłania danych */}
                <input type="hidden" name="product_id" value={id} />
                <input type="hidden" name="product_label" value={label} />
                <input type="hidden" name="product_author" value={authorName} />
                <input type="hidden" name="product_price" value={price} />
                <input type="hidden" name="product_image" value={img} />
                <input type="hidden" name="product_genre" value={genre} />
                <input type="hidden" name="product_stock" value={stock} />

                {/* Przycisk "Dodaj do koszyka" */}
                <button type="submit" className="add-to-cart-button">
                    Dodaj do koszyka
                </button>
            </form>
        </div>
    );
};

export default ProductTile;
