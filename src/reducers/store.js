import types from "../constants/actionTypes";
import initialState from "./initialState";

export default function reducer(state = initialState.store, { type, payload }) {
  switch (type) {
    case types.CREATE_STORE:
      return state;
    default:
      return state;
  }
}
