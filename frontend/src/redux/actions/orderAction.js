import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/order/new`,
      order,
      config
    );

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const myOrders = (orders) => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/orders/me`,
      config
    );

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: MY_ORDERS_FAIL, payload: error.response.data.message });
  }
};
