import styles from './home.module.css'
import ProductTile from "../../components/ProductTile/productTile";
const Home = () => {
   const handleAddToCart = () =>{

    }
    const books = [
        {
            id: 1,
            label: "Książka 1",
            authorName: "Autor 1",
            price: 29.99,
            img: "/path/to/image1.jpg",
            genre: "Fantastyka",
            stock: 10,
            rate: 2/10,
        },
        {
            id: 2,
            label: "Książka 2",
            authorName: "Autor 2",
            price: 39.99,
            img: "/path/to/image2.jpg",
            genre: "Horror",
            stock: 5,
            rate: 7/10,
        },
        {
            id: 3,
            label: "Książka 3",
            authorName: "Autor 3",
            price: 100.99,
            img: "/path/to/image2.jpg",
            genre: "Horror",
            stock: 5,
            rate: 7/10,
        },
        {
            id: 4,
            label: "Książka 4",
            authorName: "Autor 4",
            price: 39.99,
            img: "/path/to/image2.jpg",
            genre: "Horror",
            stock: 5,
            rate: 7/10,
        },
        {
            id: 6,
            label: "Książka 6",
            authorName: "Autor 6",
            price: 39.99,
            img: "/path/to/image2.jpg",
            genre: "Horror",
            stock: 5,
            rate: 7/10,
        }
    ]
    return (
        <div className={styles.pageContentContainer}>
            <div className={styles.contentContainer}>
                {books.map((book) => (
                    <ProductTile
                        key={book.id}
                        id={book.id}
                        label={book.label}
                        authorName={book.authorName}
                        price={book.price}
                        img={book.img}
                        genre={book.genre}
                        stock={book.stock}
                        rate={book.rate}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
            );
            };

            export default Home;