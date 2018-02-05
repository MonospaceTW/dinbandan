import types from "../constants/actionTypes";
import initialState from "./initialState";

export default function reducer(state = initialState.auth, { type, payload }) {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return state.update("user", () => payload.user);
    case types.LOGIN:
      return state.update("isFetching", () => true);
    default:
      return state;
  }
}
