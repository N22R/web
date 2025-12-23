import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';          
import { addToCart } from './redux/cartActions';
import './BookCard.css';

const BookCard = ({ book }) => {
  const location = useLocation();
  const dispatch = useDispatch();   

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.image,
      stock: book.stock,    
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
        <p className="book-stock">В наявності: {book.stock} шт</p>

        <Link to={`/book/${book.id}`} state={{ from: location.pathname }}>
          <button className="cta-button">Детальніше</button>
        </Link>

        <button className="cta-button" onClick={handleAddToCart}>
          В кошик
        </button>
      </div>
    </div>
  );
};

export default BookCard;