import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import SetDefaultHeader from "./components/etc/SetDefaultHeader";
import { getUser, logout } from "./actions/user";

if (localStorage.token) {
  SetDefaultHeader(localStorage.token);
  store.dispatch(getUser());
} else {
  store.dispatch(logout());
}

localStorage.removeItem("persist:root");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
