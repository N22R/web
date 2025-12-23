import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';              
import { addToCart } from '../redux/cartActions';      
import { fetchBookById } from '../api/books';
import Loader from '../components/Loader';
import './ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/catalog';

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();   

  useEffect(() => { 
    fetchBookById(id)
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching book:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (!book) return <h2 style={{ textAlign: 'center' }}>Книга не знайдена</h2>;

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.image,
      stock: book.stock,   // ✅ додаємо stock
    }));
  };

  return (
    <div className="item-page">
      <img
        src={`/images/${book.image}`}
        alt={book.title}
        className="item-image"
      />
      <div className="item-info">
        <h2>{book.title}</h2>
        <p><strong>Автор:</strong> {book.author}</p>
        <p><strong>Жанр:</strong> {book.genre}</p>
        <p><strong>Опис:</strong> {book.description}</p>
        <p><strong>Ціна:</strong> {book.price} грн</p>
        <p><strong>В наявності:</strong> {book.stock} шт</p>

        <button className="cta-button" onClick={handleAddToCart}>
          Додати в кошик
        </button>

        <Link to={from}>
          <button className="cta-button">Назад</button>
        </Link>
      </div>
    </div>
  );
};

export default ItemPage;