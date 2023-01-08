import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import toggleShow from "./toggleSlice";

const reducers = combineReducers({
  auth: authReducer,
  toggle: toggleShow,
});

export default reducers;
