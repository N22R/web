import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './redux/cartActions';
import './BookCard.css';

const BookCard = ({ book }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.cart.currentUserId);
  const cartItems = useSelector(
    (state) => state.cart.userCarts?.[currentUserId] || []
  );

  const [variant, setVariant] = useState("hard");

  const itemInCart = cartItems.find(
    (item) => item.id === book.id && item.variant === variant
  );
  const currentQty = itemInCart ? itemInCart.qty : 0;
  const isOutOfStock = currentQty >= (book.stock?.[variant] ?? 0);

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
    <div className="book-card">
      <img
        src={`/images/${book.image}`}
        alt={book.title}
        className="book-image"
      />
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">Автор: {book.author}</p>
        <p className="book-price">{book.price} грн</p>

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

        <p className="book-stock">
          В наявності: {book.stock?.[variant] ?? 0} шт
        </p>
        {isOutOfStock && <p style={{ color: "red" }}>Немає в наявності</p>}

        <Link to={`/book/${book.id}`} state={{ from: location.pathname, variant }}>
          <button className="cta-button">Детальніше</button>
        </Link>

        <button
          className="cta-button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Немає в наявності" : "В кошик"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;