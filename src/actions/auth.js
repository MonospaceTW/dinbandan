import types from "../constants/actionTypes";

export const LoginAction = payload => ({
  type: types.LOGIN,
  payload
});

export const LogoutAction = () => ({
  type: types.LOGOUT
});
