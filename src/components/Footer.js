import React from 'react';
import FbIcon from '../assets/facebook.png';
import InstaIcon from '../assets/instagram.png';
import TelegramIcon from '../assets/telegram.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <img src={FbIcon} alt="Facebook"/>
        <img src={InstaIcon} alt="Instagram"/>
        <img src={TelegramIcon} alt="Telegram"/>
      </div>
      <p>© 2025 BS Book Shop</p>
    </footer>
  );
}

export default Footer;
