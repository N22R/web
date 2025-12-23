import React from 'react';
import Logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src={Logo} alt="Logo" className="logo" />
      <nav>
        <ul>
          <li>Home</li>
          <li>Shop</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
