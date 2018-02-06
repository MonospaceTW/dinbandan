import types from "../constants/actionTypes";
import Immutable from "immutable";
import initialState from "./initialState";

export default function reducer(state = initialState.auth, { type, payload }) {
  switch (type) {
    case types.LOGIN_SUCCESS:
      const newState1 = Immutable.fromJS({
        user: payload.user,
        isFetching: false,
        isAuth: true
      });
      return state.merge(newState);
    case types.LOGIN:
      return state.update("isFetching", () => true);
    case types.LOGIN_ERROR:
      const newState = Immutable.fromJS({
        isFetching: false,
        isAuth: false,
        errorMessage: ""
      });
      return state.merge(newState);
    default:
      return state;
  }
}
