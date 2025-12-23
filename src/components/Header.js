import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src={Logo} alt="Logo" className="logo" />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
