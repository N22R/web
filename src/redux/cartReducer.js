import { CART_ADD, CART_REMOVE, CART_INCREASE, CART_DECREASE, CART_CLEAR } from './types';

const initialState = {
  items: [],
  totalQty: 0,
  totalPrice: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD: {
      const book = action.payload;
      const existing = state.items.find(item => item.id === book.id);

      if (existing) {
        if (existing.qty >= book.stock) return state;  
        return {
          ...state,
          items: state.items.map(item =>
            item.id === book.id ? { ...item, qty: item.qty + 1 } : item
          ),
          totalQty: state.totalQty + 1,
          totalPrice: state.totalPrice + book.price,
        };
      }

      return {
        ...state,
        items: [...state.items, { ...book, qty: 1 }],
        totalQty: state.totalQty + 1,
        totalPrice: state.totalPrice + book.price,
      };
    }

    case CART_INCREASE: {
      const book = state.items.find(item => item.id === action.payload);
      if (!book) return state;
      if (book.qty >= book.stock) return state; 

      return {
        ...state,
        items: state.items.map(item =>
          item.id === book.id ? { ...item, qty: item.qty + 1 } : item
        ),
        totalQty: state.totalQty + 1,
        totalPrice: state.totalPrice + book.price,
      };
    }

    case CART_DECREASE: {
      const book = state.items.find(item => item.id === action.payload);
      if (!book || book.qty <= 1) return state;

      return {
        ...state,
        items: state.items.map(item =>
          item.id === book.id ? { ...item, qty: item.qty - 1 } : item
        ),
        totalQty: state.totalQty - 1,
        totalPrice: state.totalPrice - book.price,
      };
    }

    case CART_REMOVE: {
      const book = state.items.find(item => item.id === action.payload);
      if (!book) return state;

      return {
        ...state,
        items: state.items.filter(item => item.id !== book.id),
        totalQty: state.totalQty - book.qty,
        totalPrice: state.totalPrice - book.qty * book.price,
      };
    }

    case CART_CLEAR:
      return initialState;

    default:
      return state;
  }
}