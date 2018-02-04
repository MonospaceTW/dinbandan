import types from "../constants/actionTypes";
console.log(types);
export const LoginAction = payload => ({
  type: types.LOGIN,
  payload
});
