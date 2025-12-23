import React from 'react';
import Toolbar from '../components/Toolbar';
import BookList from '../components/BookList';

const Catalog = () => {
  return (
    <div className="catalog-page">
      <Toolbar />
      <BookList />
    </div>
  );
};

export default Catalog;
