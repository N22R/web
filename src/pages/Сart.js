import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeFromCart, clearCart } from '../redux/cartActions';
import './Catalog.css'; 

export default function Cart() {
  const { items, totalQty, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return <h2 style={{ textAlign: 'center' }}>Ваш кошик порожній</h2>;
  }

  return (
    <div className="catalog-page">
      <h1 style={{ textAlign: 'center' }}>Кошик</h1> 
      <div className="book-grid">
        {items.map((book) => (
          <div key={book.id} className="book-card">
            <img src={`/images/${book.image}`} alt={book.title} className="book-image" />
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-price">{book.price} грн</p>
              <p>Доступно: {book.stock} шт</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button onClick={() => dispatch(decreaseQty(book.id))}>-</button>
                <span>{book.qty}</span>
                <button 
                  onClick={() => dispatch(increaseQty(book.id))} 
                  disabled={book.qty >= book.stock}
                >
                  +
                </button>
                <button onClick={() => dispatch(removeFromCart(book.id))}>Видалити</button>
              </div>
              <p style={{ marginTop: '8px' }}>Сума: {book.qty * book.price} грн</p>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3>Всього товарів: {totalQty}</h3>
        <h3>Загальна сума: {totalPrice} грн</h3>
        <button onClick={() => dispatch(clearCart())}>Очистити кошик</button>
      </div>
    </div>
  );
}