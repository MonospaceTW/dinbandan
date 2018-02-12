import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import auth from "./auth";
import store from "./store";

const appReducer = combineReducers({
  auth,
  store,
  router: routerReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
