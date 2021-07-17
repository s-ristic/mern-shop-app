import axios from 'axios';

import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_PRODUCT_INFO_REQUEST,
  GET_PRODUCT_INFO_SUCCESS,
  GET_PRODUCT_INFO_FAIL,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  GET_TOP_PRODUCTS_REQUEST,
  GET_TOP_PRODUCTS_SUCCESS,
  GET_TOP_PRODUCTS_FAIL,
} from '../constants/product-constants';
import { logout } from './user-actions';

export const getAllProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });

    try {
      const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);

      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getProductInfo = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_INFO_REQUEST });

  try {
    const {
      data: { product },
    } = await axios.get(`/api/products/${id}`);
    dispatch({ type: GET_PRODUCT_INFO_SUCCESS, payload: product });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_INFO_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REVIEW_REQUEST,
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

    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({
      type: CREATE_PRODUCT_REVIEW_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: CREATE_PRODUCT_REVIEW_FAIL,
      payload: message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
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
      data: { product },
    } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: message,
    });
  }
};

export const updateProduct = (updatedProduct) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
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
      data: { product },
    } = await axios.put(`/api/products/${updatedProduct._id}`, updatedProduct, config);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: product,
    });
    dispatch({ type: GET_PRODUCT_INFO_SUCCESS, payload: product });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: message,
    });
  }
};

export const getTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TOP_PRODUCTS_REQUEST });

    const {
      data: { products },
    } = await axios.get(`/api/products/toprated`);

    dispatch({
      type: GET_TOP_PRODUCTS_SUCCESS,
      payload: products,
    });
  } catch (error) {
    dispatch({
      type: GET_TOP_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
