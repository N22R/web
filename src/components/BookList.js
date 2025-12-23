import React from 'react';
import BookCard from '../BookCard';
import './BookList.css';

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books.length ? (
        books.map(book => <BookCard key={book.id} book={book} />)
      ) : (
        <p>Книг не знайдено</p>
      )}
    </div>
  );
};

export default BookList;
