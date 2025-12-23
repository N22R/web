import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <img src="/images/facebook.png" alt="Facebook"/>
        <img src="/images/instagram.png" alt="Instagram"/>
        <img src="/images/telegram.png" alt="Telegram"/>
      </div>
      <p>© 2025 BS Book Shop</p>
    </footer>
  );
}

export default Footer;
