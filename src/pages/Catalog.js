import React, { useState, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import BookList from '../components/BookList';
import { fetchBooks } from '../api/books';
import Loader from '../components/Loader';
import '../App.css';

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filterGenre) params.genre = filterGenre;

    fetchBooks(params).then(data => {
      setBooks(data);
      setLoading(false);
    });
  }, [filterGenre]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (!sortOrder) return 0;
    return sortOrder === 'asc'
      ? a.price - b.price
      : b.price - a.price;
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

      {loading ? (
        <Loader />
      ) : (
        <div className="book-grid">
          <BookList books={sortedBooks} />
        </div>
      )}
    </div>
  );
};

export default Catalog;