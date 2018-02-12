import types from "../constants/actionTypes";
import Immutable from "immutable";
import initialState from "./initialState";
import { storeKeys } from "../configs/initialConfig";

function LoginSuccess(state, payload) {
  const newState = Immutable.fromJS({
    user: payload.user,
    isFetching: false,
    isAuth: true
  });
  return state.merge(newState);
}

function Login(state) {
  return state.update("isFetching", () => true);
}

function LoginError(state) {
  const newState = Immutable.fromJS({
    isFetching: false,
    isAuth: false,
    errorMessage: ""
  });
  return state.merge(newState);
}

export default function reducer(state = initialState.auth, { type, payload }) {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return LoginSuccess(state, payload);
    case types.LOGIN:
      return Login(state);
    case types.LOGIN_ERROR:
      return LoginError(state, payload);
    case types.LOGOUT:
      global.localStorage.removeItem(storeKeys.auth);
      return initialState.initAuth;
    default:
      return state;
  }
}
