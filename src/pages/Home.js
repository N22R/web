import React from 'react';
import HeroBanner from '../components/HeroBanner';
import Toolbar from '../components/Toolbar';
import BookList from '../components/BookList';

const Home = () => {
  return (
    <>
      <HeroBanner />
      <Toolbar />
      <BookList />
    </>
  );
};

export default Home;
