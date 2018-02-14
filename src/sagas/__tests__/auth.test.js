import { testSaga } from "redux-saga-test-plan";
import { push } from "react-router-redux";
import userData from "./__mocks__/user";
import types from "../../constants/actionTypes";
import * as AuthSaga from "../auth";
import FirebaseManager from "../../utils/FirebaseManager";

const { describe, it } = global;

describe("Auth unitest", () => {
  it("should 會員登入", () => {
    const user = userData.user;
    const payload = {
      account: user.account,
      password: user.password
    };
    
    testSaga(AuthSaga.LoginSaga, { payload })
      .next()
      .call(
        FirebaseManager.signInWithEmailAndPassword,
        payload.account,
        payload.password
      )
      .next(user)
      .put(push("/store"))
      .next()
      .put({
        type: types.LOGIN_SUCCESS,
        payload: {
          user
        }
      });
  });

  it("should 帳號為空會員登入失敗", () => {
    const user = userData.user;
    const payload = {
      account: "",
      password: user.password
    };

    testSaga(AuthSaga.LoginSaga, {payload})
      .next()
      .call(
        FirebaseManager.signInWithEmailAndPassword,
        payload.account,
        payload.password
      ).next().put({
        type: types.LOGIN_ERROR,
        payload: {
          message: "登入失敗"
        }
      });
  });

  it("should 密碼為空會員登入失敗", () => {
    const user = userData.user;
    const payload = {
      account: user.account,
      password: ""
    };

    testSaga(AuthSaga.LoginSaga, {payload})
      .next()
      .call(
        FirebaseManager.signInWithEmailAndPassword,
        payload.account,
        payload.password
      ).next().put({
        type: types.LOGIN_ERROR,
        payload: {
          message: "登入失敗"
        }
      });
  });
});
