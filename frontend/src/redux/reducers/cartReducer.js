import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import { GET_STRIPE_KEY_REQ } from "../constants/orderConstants";

const initailState = {
  cartItems: [],
  shippingInfo: [],
};
export const cartReducer = (state = initailState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (el) => el.product === item.product
      );
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.product === isItemExist.product ? item : el
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    //remove item from state
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    //shipping
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case GET_STRIPE_KEY_REQ:
      return {
        ...state,
        key: action.payload,
      };
    default:
      return state;
  }
};
