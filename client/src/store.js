import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  getAllProductsReducer,
  getProductInfoReducer,
  createProductReviewReducer,
  deleteProductReducer,
  createProductReducer,
  updateProductReducer,
  getTopProductsReducer,
} from './reducers/product-reducers';
import { cartReducer } from './reducers/cart-reducers';
import {
  registerUserReducer,
  loginUserReducer,
  getUserInfoReducer,
  updateUserInfoReducer,
  getAllUsersReducer,
  deleteUserReducer,
  updateUserReducer,
} from './reducers/user-reducers';
import {
  createOrderReducer,
  getOrderInfoReducer,
  payOrderReducer,
  deliverOrderReducer,
  getUserOrdersReducer,
  getAllOrdersReducer,
} from './reducers/order-reducers';

const reducer = combineReducers({
  // product
  getAllProducts: getAllProductsReducer,
  getProductInfo: getProductInfoReducer,
  createProductReview: createProductReviewReducer,
  deleteProduct: deleteProductReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  getTopProducts: getTopProductsReducer,
  // cart
  cart: cartReducer,
  // user
  registerUser: registerUserReducer,
  loginUser: loginUserReducer,
  getUserInfo: getUserInfoReducer,
  updateUserInfo: updateUserInfoReducer,
  getAllUsers: getAllUsersReducer,
  deleteUser: deleteUserReducer,
  updateUser: updateUserReducer,
  // order
  createOrder: createOrderReducer,
  getOrderInfo: getOrderInfoReducer,
  payOrder: payOrderReducer,
  deliverOrder: deliverOrderReducer,
  getUserOrders: getUserOrdersReducer,
  getAllOrders: getAllOrdersReducer,
});

const cartItems = localStorage.getItem('cart-items')
  ? JSON.parse(localStorage.getItem('cart-items'))
  : [];

const userInfo = localStorage.getItem('user-info')
  ? JSON.parse(localStorage.getItem('user-info'))
  : null;

const shippingAddress = localStorage.getItem('shipping-address')
  ? JSON.parse(localStorage.getItem('shipping-address'))
  : {};
const paymentMethod = localStorage.getItem('payment-method')
  ? JSON.parse(localStorage.getItem('payment-method'))
  : null;

const initialState = {
  cart: {
    cartItems,
    shippingAddress,
    paymentMethod,
  },
  loginUser: {
    userInfo,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
