import Immutable from "immutable";

const auth = Immutable.fromJS({
  isFetching: false,
  isAuth: false,
  info: {},
  token: ""
});

export { auth };
