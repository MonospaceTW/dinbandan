import FirebaseManager from "../utils/FirebaseManager";
import types from "../constants/actionTypes";

import { put } from "redux-saga/effects";
import {push} from "react-router-redux";
export function* createStoreSaga({payload}) {
  const {data} = payload;
  try {
    yield FirebaseManager.addNewData("stores/", data);
    yield put({
      type: types.CREATE_STORE_SUCCESS,
      payload: {
        message: "建立商店成功"
      }
    });
    yield put(push("/"));
  } catch (error) {
    yield put({
      type: types.CREATE_STORE_ERROR,
      payload: {
        message: "建立商店失敗"
      }
    });
  }
}
