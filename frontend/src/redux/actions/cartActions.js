import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/product/${id}`
    );
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.Stock,
        image: data.product.images[0].url,
        quantity,
      },
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.log(error);
  }
};

//Remove items from cart
export const removeItemsfromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
