import axios from 'axios';

import {
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  GET_USER_INFO_RESET,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../constants/user-constants';
import { GET_USER_ORDERS_RESET } from '../constants/order-constants';
import { RESET_CART_ITEM } from '../constants/cart-constants';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { user },
    } = await axios.post('/api/users/login', { email, password }, config);

    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });

    localStorage.setItem('user-info', JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  dispatch({ type: RESET_CART_ITEM });
  dispatch({ type: GET_USER_INFO_RESET });
  dispatch({ type: GET_USER_ORDERS_RESET });
  dispatch({ type: GET_ALL_USERS_RESET });

  localStorage.removeItem('user-info');
  localStorage.removeItem('cart-items');
  localStorage.removeItem('payment-method');
  localStorage.removeItem('shipping-address');
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { user },
    } = await axios.post('/api/users', { name, email, password }, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: user });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });

    localStorage.setItem('user-info', JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserInfo = (id) => async (dispatch, getState) => {
  dispatch({ type: GET_USER_INFO_REQUEST });

  try {
    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {
      data: { user },
    } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: GET_USER_INFO_SUCCESS, payload: user });
  } catch (error) {
    dispatch({
      type: GET_USER_INFO_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateUserInfo = (updatedUser) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_INFO_REQUEST });

  try {
    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {
      data: { user },
    } = await axios.put(`/api/users/profile`, updatedUser, config);

    dispatch({ type: GET_USER_INFO_SUCCESS, payload: user });
    dispatch({ type: UPDATE_USER_INFO_SUCCESS, payload: user });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    localStorage.setItem('user-info', JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: UPDATE_USER_INFO_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getAllUsers =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    dispatch({ type: GET_ALL_USERS_REQUEST });

    try {
      const {
        loginUser: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users/?pageNumber=${pageNumber}`, config);

      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_USERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_USER_REQUEST });

  try {
    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: DELETE_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateUser = (updatedUser) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {
      data: { user },
    } = await axios.put(`/api/users/${updatedUser._id}`, updatedUser, config);

    dispatch({ type: UPDATE_USER_SUCCESS });
    dispatch({ type: GET_USER_INFO_SUCCESS, payload: user });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
