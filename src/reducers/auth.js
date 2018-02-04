import types from "../constants/ActionTypes";
import initialState from "./initialState";

export default function reducer(state = initialState.auth, { type }) {
  switch (type) {
    default:
      return state;
  }
}
