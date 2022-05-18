import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import authReducer from "./authSlice";
import tokenReducer from "./tokenSlice";

// export default configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

const reducers = combineReducers({
  auth: authReducer,
  token: tokenReducer,
});

const persistConfig = {
  key: "root",
  storage,

  // blacklist: [""], // navigation will not be persisted
  whitelist: ["auth", "token"], // only navigation will be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
