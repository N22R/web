import React from 'react';
import './BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} className="book-image"/>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>Ціна: {book.price} грн</p>
      <div className="book-buttons">
      </div>
    </div>
  );
}

export default BookCard;
