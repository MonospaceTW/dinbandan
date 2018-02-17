import Immutable from "immutable";
import { storeKeys } from "../configs/initialConfig";
import _ from "lodash";

const initAuth = {
  isFetching: false,
  isAuth: false,
  LOGON: "NONE",
  user: {},
  token: "",
  accountErrorText: "",
  passwordErrorText: "",
  errorMessage: ""
};

function initialAuth() {
  const userCache = global.localStorage.getItem(storeKeys.auth);

  if (_.isNull(userCache) || _.isUndefined(userCache)) {
    return Immutable.fromJS(initAuth);
  } else {
    const user = JSON.parse(userCache);
    return Immutable.fromJS({
      isFetching: false,
      isAuth: true,
      LOGON: "LOGON",
      user,
      token: "",
      accountErrorText: "",
      passwordErrorText: "",
      errorMessage: ""
    });
  }
}

const auth = initialAuth();
const store = Immutable.fromJS({
  isFetching: false,
  stores: []
});

export default { store, auth, initAuth: Immutable.fromJS(initAuth) };
