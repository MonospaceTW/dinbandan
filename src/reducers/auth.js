import types from "../constants/actionTypes";
import initialState from "./initialState";

export default function reducer(state = initialState.auth, { type }) {
  switch (type) {
    default:
      return state;
  }
}
