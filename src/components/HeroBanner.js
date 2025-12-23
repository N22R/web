import React from 'react';
import { Link } from 'react-router-dom';
import BannerImage from '../assets/banner.jpg';
import './HeroBanner.css';

const HeroBanner = () => {
  const handleScrollToInfo = () => {
    const section = document.getElementById('about-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-banner">
      <img src={BannerImage} alt="Banner" className="banner-image" />
      <div className="banner-content">
        <h1>Відкрий свій світ книжок</h1>
        <p>Найкращі бестселери та класика для будь-якого читача</p>

        <div className="banner-buttons">
          <Link to="/catalog">
            <button className="cta-button">Переглянути каталог</button>
          </Link>
          <button className="cta-button secondary" onClick={handleScrollToInfo}>
            Про нас
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
