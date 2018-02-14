import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import configureStore, { history } from "./store/configureStore";
import FirebaseManager from "./utils/FirebaseManager";
import { ConnectedRouter } from "react-router-redux";

import { Provider } from "react-redux";

const store = configureStore();
FirebaseManager.initialAdmin();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
