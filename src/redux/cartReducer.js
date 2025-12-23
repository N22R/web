import {
  CART_ADD,
  CART_REMOVE,
  CART_INCREASE,
  CART_DECREASE,
  CART_CLEAR,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT
} from './types';

const initialState = {
  userCarts: {},       
  userTotals: {},      
  currentUserId: null  
};

export default function cartReducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: {
      const uid = action.payload.id;
      const savedCart = JSON.parse(localStorage.getItem("cart_" + uid));
      return {
        ...state,
        currentUserId: uid,
        userCarts: {
          ...state.userCarts,
          [uid]: savedCart?.items || state.userCarts[uid] || []
        },
        userTotals: {
          ...state.userTotals,
          [uid]: savedCart?.totals || state.userTotals[uid] || { totalQty: 0, totalPrice: 0 }
        }
      };
    }

    case LOGOUT:
      return { ...state, currentUserId: null };

    case CART_ADD: {
      const book = action.payload;
      const uid = state.currentUserId;
      const userCart = state.userCarts[uid] || [];
      const totals = state.userTotals[uid] || { totalQty: 0, totalPrice: 0 };

      const existing = userCart.find(item => item.id === book.id && item.variant === book.variant);
      if (existing && existing.qty >= book.stock[book.variant]) return state;

      const updatedItems = existing
        ? userCart.map(item =>
            item.id === book.id && item.variant === book.variant
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        : [...userCart, { ...book, qty: 1 }];

      newState = {
        ...state,
        userCarts: { ...state.userCarts, [uid]: updatedItems },
        userTotals: {
          ...state.userTotals,
          [uid]: {
            totalQty: totals.totalQty + 1,
            totalPrice: totals.totalPrice + book.price
          }
        }
      };
      break;
    }

    case CART_INCREASE: {
      const uid = state.currentUserId;
      const userCart = state.userCarts[uid] || [];
      const totals = state.userTotals[uid] || { totalQty: 0, totalPrice: 0 };

      const book = userCart.find(item => item.id === action.payload.id && item.variant === action.payload.variant);
      if (!book || book.qty >= book.stock[book.variant]) return state;

      const updatedItems = userCart.map(item =>
        item.id === book.id && item.variant === book.variant
          ? { ...item, qty: item.qty + 1 }
          : item
      );

      newState = {
        ...state,
        userCarts: { ...state.userCarts, [uid]: updatedItems },
        userTotals: {
          ...state.userTotals,
          [uid]: {
            totalQty: totals.totalQty + 1,
            totalPrice: totals.totalPrice + book.price
          }
        }
      };
      break;
    }

    case CART_DECREASE: {
      const uid = state.currentUserId;
      const userCart = state.userCarts[uid] || [];
      const totals = state.userTotals[uid] || { totalQty: 0, totalPrice: 0 };

      const book = userCart.find(item => item.id === action.payload.id && item.variant === action.payload.variant);
      if (!book || book.qty <= 1) return state;

      const updatedItems = userCart.map(item =>
        item.id === book.id && item.variant === book.variant
          ? { ...item, qty: item.qty - 1 }
          : item
      );

      newState = {
        ...state,
        userCarts: { ...state.userCarts, [uid]: updatedItems },
        userTotals: {
          ...state.userTotals,
          [uid]: {
            totalQty: totals.totalQty - 1,
            totalPrice: totals.totalPrice - book.price
          }
        }
      };
      break;
    }

    case CART_REMOVE: {
      const uid = state.currentUserId;
      const userCart = state.userCarts[uid] || [];
      const totals = state.userTotals[uid] || { totalQty: 0, totalPrice: 0 };

      const book = userCart.find(item => item.id === action.payload.id && item.variant === action.payload.variant);
      if (!book) return state;

      const updatedItems = userCart.filter(item => !(item.id === book.id && item.variant === book.variant));

      newState = {
        ...state,
        userCarts: { ...state.userCarts, [uid]: updatedItems },
        userTotals: {
          ...state.userTotals,
          [uid]: {
            totalQty: totals.totalQty - book.qty,
            totalPrice: totals.totalPrice - book.qty * book.price
          }
        }
      };
      break;
    }

    case CART_CLEAR: {
      const uid = state.currentUserId;
      newState = {
        ...state,
        userCarts: { ...state.userCarts, [uid]: [] },
        userTotals: { ...state.userTotals, [uid]: { totalQty: 0, totalPrice: 0 } }
      };
      break;
    }

    default:
      return state;
  }

  if (newState.currentUserId) {
    const uid = newState.currentUserId;
    localStorage.setItem("cart_" + uid, JSON.stringify({
      items: newState.userCarts[uid],
      totals: newState.userTotals[uid]
    }));
  }

  return newState;
}