import types from "../constants/actionTypes";
import initialState from "./initialState";

export default function reducer(state = initialState.store, { type, payload }) {
  switch (type) {
    case types.CREATE_STORE:
      return state.update("isFetching", () => true);
    case types.CREATE_STORE_SUCCESS:
      return state.update("isFetching", () => false);
    case types.CREATE_STORE_ERROR:
      return state.update("isFetching", () => false);
    default:
      return state;
  }
}
