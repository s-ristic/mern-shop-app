import axios from 'axios';

import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
} from '../constants/cart-constants';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const {
    data: { product },
  } = await axios.get(`/api/products/${id}`);
  const { _id, name, image, price, inStock } = product;

  try {
    dispatch({
      type: ADD_CART_ITEM,
      payload: {
        _id,
        name,
        image,
        price,
        inStock,
        quantity,
      },
    });
  } catch (err) {}

  localStorage.setItem('cart-items', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });

  localStorage.setItem('cart-items', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: data });

  localStorage.setItem('shipping-address', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_METHOD, payload: data });

  localStorage.setItem('payment-method', JSON.stringify(data));
};
