import { takeLatest } from "redux-saga/effects";
import { LoginSaga } from "./auth";
import types from "../constants/actionTypes";

export function* watchLoginSaga() {
  yield takeLatest(types.LOGIN, LoginSaga);
}
