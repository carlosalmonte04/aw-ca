import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ConfigureStore from "./store/ConfigureStore";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const { store, persistor } = ConfigureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate loading={null} persistor={persistor}>
        <Route path="/" component={App} />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
