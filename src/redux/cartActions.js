import { CART_ADD, CART_REMOVE, CART_INCREASE, CART_DECREASE, CART_CLEAR } from './types';

export const addToCart = (book) => ({
  type: CART_ADD,
  payload: book,
});

export const removeFromCart = ({ id, variant }) => ({
  type: CART_REMOVE,
  payload: { id, variant },
});

export const increaseQty = ({ id, variant }) => ({ 
  type: CART_INCREASE,
  payload: { id, variant },
});

export const decreaseQty = ({ id, variant }) => ({
  type: CART_DECREASE,
  payload: { id, variant },
});

export const clearCart = () => ({ type: CART_CLEAR });