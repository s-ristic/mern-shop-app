import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_RESET,
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_FAIL,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_RESET,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAIL,
  GET_USER_ORDERS_RESET,
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_REQUEST,
  DELIVER_ORDER_FAIL,
  DELIVER_ORDER_SUCCESS,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_RESET,
} from '../constants/order-constants';

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const getOrderInfoReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case GET_ORDER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDER_INFO_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case GET_ORDER_INFO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const payOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case PAY_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case PAY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PAY_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const deliverOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELIVER_ORDER_REQUEST:
      return {
        loading: true,
      };
    case DELIVER_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELIVER_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELIVER_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const getUserOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case GET_USER_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_USER_ORDERS_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const getAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case GET_ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
