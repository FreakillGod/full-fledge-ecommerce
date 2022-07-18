import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
} from "../constants/orderConstants";
import { CLEAR_ERRORS } from "../constants/productConstants";

const initailState = {
  loading: false,
  order: null,
  error: null,
};

export const newOrderReducer = (state = initailState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: null }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case MY_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
