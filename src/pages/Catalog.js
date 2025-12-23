import React, { useState } from 'react';
import Toolbar from '../components/Toolbar';
import BookList from '../components/BookList';
import booksData from '../data/booksData';
import '../App.css';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [sortOrder, setSortOrder] = useState(null);

  const filteredBooks = booksData
    .filter(book =>
      (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterGenre ? book.genre === filterGenre : true)
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  const handleClear = () => {
    setSearchTerm('');
    setFilterGenre('');
    setSortOrder(null);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="catalog-page">
      <h1 style={{ textAlign: 'center' }}>Каталог книжок</h1>
      <Toolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterGenre={filterGenre}
        setFilterGenre={setFilterGenre}
        handleClear={handleClear}
        handleSort={handleSort}
        sortOrder={sortOrder}
      />
      <div className="book-grid">
        <BookList books={filteredBooks} />
      </div>
    </div>
  );
};

export default Catalog;