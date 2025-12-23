import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartActions';
import { fetchBookById } from '../api/books';
import Loader from '../components/Loader';
import './ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/catalog';

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [variant, setVariant] = useState(location.state?.variant || "hard");

  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.cart.currentUserId);
  const cartItems = useSelector(
    (state) => state.cart.userCarts?.[currentUserId] || []
  );

  useEffect(() => {
    fetchBookById(id)
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching book:', err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (location.state?.variant) {
      setVariant(location.state.variant);
    }
  }, [location.state]);

  if (loading) return <Loader />;
  if (!book) return <h2 style={{ textAlign: 'center' }}>Книга не знайдена</h2>;

  const itemInCart = cartItems.find(
    (item) => item.id === book.id && item.variant === variant
  );
  const currentQty = itemInCart ? itemInCart.qty : 0;

  const available = (book.stock?.[variant] ?? 0) - currentQty;
  const isOutOfStock = available <= 0;

  const handleAddToCart = () => {
    if (!currentUserId) {
      alert("Спочатку увійдіть у систему");
      return;
    }
    if (isOutOfStock) {
      alert("Немає в наявності");
      return;
    }
    dispatch(addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.image,
      variant,
      stock: book.stock
    }));
  };

  return (
    <div className="item-page">
      <img
        src={`/images/${book.image}`}
        alt={book.title}
        className="item-image"
      />
      <div className="item-info">
        <h2>{book.title}</h2>
        <p><strong>Автор:</strong> {book.author}</p>
        <p><strong>Жанр:</strong> {book.genre}</p>
        <p><strong>Опис:</strong> {book.description}</p>
        <p><strong>Ціна:</strong> {book.price} грн</p>

        {}
        <label>
          Формат:
          <select value={variant} onChange={(e) => setVariant(e.target.value)}>
            <option value="electronic">Електронна</option>
            <option value="audio">Аудіо</option>
            <option value="hard">Тверда</option>
            <option value="simple">Проста</option>
          </select>
        </label>

        <p><strong>В наявності:</strong> {available} шт</p>
        {isOutOfStock && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Немає в наявності
          </p>
        )}

        <button
          className="cta-button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Немає в наявності" : "Додати в кошик"}
        </button>

        <Link to={from}>
          <button className="cta-button">Назад</button>
        </Link>
      </div>
    </div>
  );
};

export default ItemPage;