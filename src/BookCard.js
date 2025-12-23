import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
  const location = useLocation();

  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} className="book-image" />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>Ціна: {book.price} грн</p>
      <Link to={`/item/${book.id}`} state={{ from: location.pathname }}>
        <button className="cta-button">View more</button>
      </Link>
    </div>
  );
};

export default BookCard;