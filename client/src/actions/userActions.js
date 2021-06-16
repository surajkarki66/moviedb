import axios from "../axios-url";

import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAIL,
} from "../constants/userConstants";
import { USER_SERVER } from "../configs";
import { authenticate } from "../helpers/auth";

const registerUser = (dataToSubmit) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: dataToSubmit });
  try {
    const response = await axios.post(`${USER_SERVER}/register`, dataToSubmit);
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error });
  }
};

const signInUser = (dataToSubmit) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: dataToSubmit });
  try {
    const response = await axios.post(`${USER_SERVER}/login`, dataToSubmit);
    authenticate(response);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error });
  }
};

const me = (token) => async (dispatch) => {
  dispatch({ type: USER_AUTH_REQUEST });
  try {
    const response = await axios.get(`${USER_SERVER}/me`, {
      headers: { Authorization: "Bearer " + token },
    });
    dispatch({ type: USER_AUTH_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: USER_AUTH_FAIL, payload: error });
  }
};

export { registerUser, signInUser, me };
