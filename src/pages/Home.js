import React, { useState, useRef } from 'react';
import HeroBanner from '../components/HeroBanner';
import Toolbar from '../components/Toolbar';
import BookList from '../components/BookList';
import booksData from '../data/booksData';
import '../App.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [sortOrder, setSortOrder] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const aboutRef = useRef(null);

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

  const handleViewMore = () => {
    setVisibleCount(filteredBooks.length);
  };

  const visibleBooks = filteredBooks.slice(0, visibleCount);

  return (
    <>
      <HeroBanner scrollToAbout={() => aboutRef.current.scrollIntoView({ behavior: 'smooth' })} />

      <Toolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterGenre={filterGenre}
        setFilterGenre={setFilterGenre}
        handleClear={handleClear}
        handleSort={handleSort}
        sortOrder={sortOrder}
      />

      <div className="book-list">
        <BookList books={visibleBooks} />
      </div>

      {visibleCount < filteredBooks.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="cta-button" onClick={handleViewMore}>
            View More
          </button>
        </div>
      )}

      <section ref={aboutRef} id="about-section" className="about-section">
        <h2>Більше про наш магазин</h2>
        <p>Ми прагнемо зробити читання приємним та доступним кожному.</p>
        <p>Від старих класиків до нових бестселерів — знайди свій світ у книгах!</p>
        <p>Ще більше цікавинок чекає на вас у нашому каталозі.</p>
      </section>
    </>
  );
};

export default Home;