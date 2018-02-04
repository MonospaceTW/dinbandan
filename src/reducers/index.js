import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import auth from "./auth";

const appReducer = combineReducers({
  auth,
  router: routerReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
