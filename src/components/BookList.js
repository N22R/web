import React from 'react';
import BookCard from '../BookCard';
import './BookList.css';

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books && books.length > 0 ? (
        books.map((book) => <BookCard key={book.id} book={book} />)
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Книг не знайдено</p>
      )}
    </div>
  );
}

export default BookList;
