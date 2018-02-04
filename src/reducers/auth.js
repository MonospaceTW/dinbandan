import types from "../constants/actionTypes";
import initialState from "./initialState";

export default function reducer(state = initialState.auth, { type }) {
  console.log(type);
  switch (type) {
    case types.LOGIN:
      return state.update("isFetching", () => true);
    default:
      return state;
  }
}
