import { put } from "redux-saga/effects";
import { push } from "react-router-redux";
import { storeKeys } from "../configs/initialConfig";
import _ from "lodash";
import types from "../constants/actionTypes";
import FirebaseManager from "../utils/FirebaseManager";
console.log(storeKeys);
export function* LoginSaga({ payload }) {
  const { account, password } = payload;
  try {
    let userData = yield FirebaseManager.signInWithEmailAndPassword(
      account,
      password
    );

    const user = _.pick(
      userData,
      "email",
      "displayName",
      "phoneNumber",
      "photoURL"
    );

    user.photoURL =
      userData.photoURL ||
      "http://nwesports.org/wp-content/uploads/2017/07/default_user.png";
    localStorage.setItem(storeKeys.auth, JSON.stringify(user));
    yield put(push("/store"));
    yield put({
      type: types.LOGIN_SUCCESS,
      payload: {
        user
      }
    });
  } catch (error) {
    yield put({
      type: types.LOGIN_ERROR,
      payload: {
        message: "登入失敗"
      }
    });
  }
}
