import React, { useState, useEffect, useRef } from 'react';
import HeroBanner from '../components/HeroBanner';
import Toolbar from '../components/Toolbar';
import BookList from '../components/BookList';
import Loader from '../components/Loader';
import { fetchBooks } from '../api/books';
import '../App.css';

const Home = () => {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [sortOrder, setSortOrder] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const aboutRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filterGenre) params.genre = filterGenre;

    fetchBooks(params)
      .then(data => {
        setBooksData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setLoading(false);
      });
  }, [filterGenre]);

  const filteredBooks = booksData.filter(book =>
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

  const handleViewMore = () => {
    setVisibleCount(sortedBooks.length);
  };

  const visibleBooks = sortedBooks.slice(0, visibleCount);

  if (loading) return <Loader />;

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

      {visibleCount < sortedBooks.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="cta-button" type="button" onClick={handleViewMore}>
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