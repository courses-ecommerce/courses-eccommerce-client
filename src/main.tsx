import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
// redux, redux toolkit
import { Provider } from "react-redux";
// import configureStore from "./reducers/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./reducers/store";

//For react toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <App />
          <ToastContainer />
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
