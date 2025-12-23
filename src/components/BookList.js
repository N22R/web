import React from 'react';
import BookCard from '../BookCard';
import './BookList.css';

const books = [
  {
    id: 1,
    title: "Великий принц",
    author: "Володимир Великий",
    price: 960,
    image: require('../assets/book1.jpg')
  },
  {
    id: 2,
    title: "Тіні забутих внуків",
    author: "Леся Американо",
    price: 1871,
    image: require('../assets/book2.jpg')
  },
  {
    id: 3,
    title: "Іван Чаротворець",
    author: "Тарас Шевченко",
    price: 1814,
    image: require('../assets/book3.jpg')
  }
];

const BookList = () => {
  return (
    <div className="book-list">
      {books.map(book => <BookCard key={book.id} book={book} />)}
    </div>
  );
}

export default BookList;
