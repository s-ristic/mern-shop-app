import axios from 'axios';
import { RESET_CART_ITEM } from '../constants/cart-constants';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ORDER_INFO_FAIL,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_REQUEST,
  PAY_ORDER_FAIL,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_REQUEST,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAIL,
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_REQUEST,
  DELIVER_ORDER_FAIL,
  DELIVER_ORDER_SUCCESS,
  DELIVER_ORDER_REQUEST,
} from '../constants/order-constants';
import { logout } from './user-actions';

export const createOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

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
      data: { order },
    } = await axios.post(`/api/orders`, orderData, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: order,
    });
    dispatch({
      type: RESET_CART_ITEM,
      payload: order,
    });
    localStorage.removeItem('cart-items');
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'You are not authorized. Token failed.') {
      dispatch(logout());
    }
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: message,
    });
  }
};

export const getOrderInfo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ORDER_INFO_REQUEST,
    });

    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {
      data: { order },
    } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: GET_ORDER_INFO_SUCCESS,
      payload: order,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'You are not authorized. Token failed.') {
      dispatch(logout());
    }
    dispatch({
      type: GET_ORDER_INFO_FAIL,
      payload: message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAY_ORDER_REQUEST,
    });

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
      data: { order },
    } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

    dispatch({
      type: PAY_ORDER_SUCCESS,
      payload: order,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'You are not authorized. Token failed.') {
      dispatch(logout());
    }
    dispatch({
      type: PAY_ORDER_FAIL,
      payload: message,
    });
  }
};

export const deliverOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELIVER_ORDER_REQUEST,
    });

    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {
      data: { order },
    } = await axios.put(`/api/orders/${orderData._id}/deliver`, {}, config);

    dispatch({
      type: DELIVER_ORDER_SUCCESS,
      payload: order,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'You are not authorized. Token failed.') {
      dispatch(logout());
    }
    dispatch({
      type: DELIVER_ORDER_FAIL,
      payload: message,
    });
  }
};

export const getUserOrders =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_USER_ORDERS_REQUEST,
      });

      const {
        loginUser: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/myorders/?pageNumber=${pageNumber}`, config);

      dispatch({
        type: GET_USER_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message ? error.response.data.message : error.message;
      if (message === 'You are not authorized. Token failed.') {
        dispatch(logout());
      }
      dispatch({
        type: GET_USER_ORDERS_FAIL,
        payload: message,
      });
    }
  };

export const getAllOrders =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_ORDERS_REQUEST,
      });

      const {
        loginUser: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/?pageNumber=${pageNumber}`, config);

      dispatch({
        type: GET_ALL_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message ? error.response.data.message : error.message;
      if (message === 'You are not authorized. Token failed.') {
        dispatch(logout());
      }
      dispatch({
        type: GET_ALL_ORDERS_FAIL,
        payload: message,
      });
    }
  };
