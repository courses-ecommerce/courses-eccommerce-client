import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "src/types";

const initialState: IAuth = {
  isLoading: false,
  isAuth: JSON.parse(localStorage.getItem("role") || "{}") ? true : false,
  isRole: JSON.parse(localStorage.getItem("role") || "{}")
    ? JSON.parse(localStorage.getItem("role") || "{}")
    : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    isPending(state) {
      state.isLoading = true;
    },
    isLogin(state, action) {
      state.isLoading = false;
      state.isAuth = true;
      state.isRole = action.payload;
    },
    isSuccess(state) {
      state.isAuth = true;
      state.isLoading = false;
    },
    isLogout(state) {
      state.isAuth = false;
      state.isRole = "";
    },
  },
});

const { actions, reducer } = authSlice;

export const { isPending, isLogin, isSuccess, isLogout } = actions;

export const selectAuthorization = (state: { auth: any }) => state.auth;

export default reducer;
