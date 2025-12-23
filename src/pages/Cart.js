import { useSelector, useDispatch } from 'react-redux';
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart
} from '../redux/cartActions';
import { useNavigate } from 'react-router-dom';
import './Catalog.css';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUserId = useSelector((state) => state.cart.currentUserId);

  const cartItems = useSelector(
    (state) => state.cart.userCarts?.[currentUserId] || []
  );

  const totals = useSelector(
    (state) => state.cart.userTotals?.[currentUserId] || { totalQty: 0, totalPrice: 0 }
  );
  const totalQty = totals.totalQty;
  const totalPrice = totals.totalPrice;

  if (!currentUserId) {
    return <h2 style={{ textAlign: 'center' }}>Спочатку увійдіть у систему</h2>;
  }

  if (cartItems.length === 0) {
    return <h2 style={{ textAlign: 'center' }}>Ваш кошик порожній</h2>;
  }

  return (
    <div className="catalog-page">
      <h1 style={{ textAlign: 'center' }}>Кошик</h1>
      <div className="book-grid">
        {cartItems.map((book) => {
          const available = book.stock?.[book.variant] ?? 0;
          const isOutOfStock = book.qty >= available;

          return (
            <div key={`${book.id}-${book.variant}`} className="book-card">
              <img
                src={`/images/${book.image}`}
                alt={book.title}
                className="book-image"
              />
              <div className="book-info">
                <h3 className="book-title">
                  {book.title}{' '}
                  <span style={{ fontWeight: 'normal' }}>({book.variant})</span>
                </h3>
                <p className="book-price">{book.price} грн</p>
                <p>Доступно: {available} шт</p>

                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button
                    onClick={() =>
                      dispatch(decreaseQty({ id: book.id, variant: book.variant }))
                    }
                    disabled={book.qty <= 1}
                  >
                    -
                  </button>
                  <span>{book.qty}</span>
                  <button
                    onClick={() =>
                      dispatch(increaseQty({ id: book.id, variant: book.variant }))
                    }
                    disabled={isOutOfStock}
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      dispatch(removeFromCart({ id: book.id, variant: book.variant }))
                    }
                  >
                    Видалити
                  </button>
                </div>

                <p style={{ marginTop: '8px' }}>
                  Сума: {book.qty * book.price} грн
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3>Всього товарів: {totalQty}</h3>
        <h3>Загальна сума: {totalPrice} грн</h3>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '10px' }}>
          <button onClick={() => dispatch(clearCart())}>Очистити кошик</button>
          <button onClick={() => navigate('/checkout')}>Оформити замовлення</button>
        </div>
      </div>
    </div>
  );
}