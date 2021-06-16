import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise";

import {
  userSignupReducer,
  userSigninReducer,
  userAuthReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  user: userAuthReducer,
  userRegister: userSignupReducer,
  userSignIn: userSigninReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(promiseMiddleware, thunk))
);

export default store;
