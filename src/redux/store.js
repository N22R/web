import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import cartReducer from './cartReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;