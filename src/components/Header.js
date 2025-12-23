import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const email = localStorage.getItem("userEmail");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find(u => u.email === email);
  const userName = currentUser?.firstName || "";

  return (
    <header className="header">
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/catalog">Catalog</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/cart">Кошик</a></li>
        </ul>
      </nav>

      {}
      {email ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#fff' }}>Привіт, {userName}</span>
          <button className="signout-btn" type="button" onClick={handleSignOut}>
            Вийти
          </button>
        </div>
      ) : (
        <button className="signout-btn" type="button" onClick={() => navigate("/login")}>
          Увійти
        </button>
      )}
    </header>
  );
};

export default Header;