import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

import axios from "axios";

//LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//REGISTER
export const register = (Form) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    for (var key of Form.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/register`,
      Form,
      config
    );

    console.log(data);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//loaduser
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/me`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//logout

export const logOut = () => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/logout`,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    console.log(data.success);

    if (data.success === true) {
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "token=token; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
    }

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

export const updateProfile = (userdata) => async (dispatch) => {
  for (var key of userdata.entries()) {
    console.log(key[0] + ", " + key[1]);
  }

  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/me/update`,
      userdata,
      config
    );

    console.log(data);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const updatePassword = (password) => async (dispatch) => {

  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/password/update`,
      password,
      config
    );

    console.log(data);

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {

  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/password/forgot`,
      email,
      config
    );

    console.log(data);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Reset password
export const resetPassword = (token,passwords) => async (dispatch) => {

  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/password/reset/${token}`,
      passwords,
      config
    );

    console.log(data);

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
