import { CART_ADD, CART_REMOVE, CART_INCREASE, CART_DECREASE, CART_CLEAR } from './types';

export const addToCart = (book) => ({
  type: CART_ADD,
  payload: book,
});

export const removeFromCart = (id) => ({
  type: CART_REMOVE,
  payload: id,
});

export const increaseQty = (id) => ({
  type: CART_INCREASE, 
  payload: id,
});

export const decreaseQty = (id) => ({
  type: CART_DECREASE,
  payload: id,
});

export const clearCart = () => ({ type: CART_CLEAR });