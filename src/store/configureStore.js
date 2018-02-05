import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

export const history = createHistory();
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware({});
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = routerMiddleware(history);
  return {
    ...createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(sagaMiddleware, middleware))
    ),
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

export default configureStore;
