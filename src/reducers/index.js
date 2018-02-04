import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

const appReducer = combineReducers({
  router: routerReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
