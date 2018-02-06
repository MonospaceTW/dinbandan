import Immutable from "immutable";

const auth = Immutable.fromJS({
  isFetching: false,
  isAuth: false,
  LOGON: "NONE",
  user: {},
  token: "",
  accountErrorText: "",
  passwordErrorText: "",
  errorMessage: ""
});

export default { auth };
