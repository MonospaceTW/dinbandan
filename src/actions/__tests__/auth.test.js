import * as AuthActions from "../../actions/auth";
import types from "../../constants/actionTypes";

const {describe, it, expect} = global;

describe("auth action unitest", () => {
  it("should test Login action", () => {
    const payload = {
      account: "test@gmail.com",
      password: "abc123"
    };
    const expectedAction = {
      type: types.LOGIN,
      payload
    };
    expect(AuthActions.LoginAction(payload)).toEqual(expectedAction);
  });

  it("should test Login action", () => {
    const expectedAction = {
      type: types.LOGOUT
    };
    expect(AuthActions.LogoutAction()).toEqual(expectedAction);
  });
});
