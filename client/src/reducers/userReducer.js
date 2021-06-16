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

const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, register: action.payload };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, result: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userAuthReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_AUTH_REQUEST:
      return { loading: true };
    case USER_AUTH_SUCCESS:
      return { loading: false, userData: action.payload };
    case USER_AUTH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { userSignupReducer, userSigninReducer, userAuthReducer };
