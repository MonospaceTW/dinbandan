import { takeLatest } from "redux-saga/effects";
import { LoginSaga } from "./auth";
import {createStoreSaga} from "./store";
import types from "../constants/actionTypes";

export function* watchCreateStoreSaga() {
  yield takeLatest(types.CREATE_STORE, createStoreSaga);
}

export function* watchLoginSaga() {
  yield takeLatest(types.LOGIN, LoginSaga);
}
