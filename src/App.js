import React from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Toolbar from './components/Toolbar';
import BookList from './components/BookList';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroBanner />
      <Toolbar />
      <BookList />
      <Footer />
    </div>
  );
}

export default App;
