import React from 'react';
import { Link } from 'react-router-dom';
import BannerImage from '../assets/banner.jpg';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <img src={BannerImage} alt="Banner" className="banner-image"/>
      <div className="banner-content">
        <h1>Відкрий свій світ книжок</h1>
        <p>Найкращі бестселери та класика для будь-якого читача</p>
        <Link to="/catalog">
          <button className="cta-button">Переглянути каталог</button>
        </Link>
      </div>
    </section>
  );
}

export default HeroBanner;
