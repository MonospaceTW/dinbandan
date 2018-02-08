import types from "../constants/actionTypes";

export const LoginAction = payload => ({
  type: types.LOGIN,
  payload
});

export const LOGOUTAction = () => ({
  type: types.LOGOUT
});
