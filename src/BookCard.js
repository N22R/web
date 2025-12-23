import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
  const location = useLocation();

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
        <Link to={`/book/${book.id}`} state={{ from: location.pathname }}>
          <button className="cta-button">Детальніше</button>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;