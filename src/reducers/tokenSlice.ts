import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  refreshToken: "",
  accessToken: {},
};

const tokenSlice = createSlice({
  name: "token",
  initialState: initialState,
  reducers: {
    getAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    getRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    clearToken(state) {
      state.refreshToken = "";
      state.accessToken = {};
    },
  },
});

const { actions, reducer } = tokenSlice;

export const { getAccessToken, getRefreshToken, clearToken } = actions;
export const selectTokens = (state: { token: any }) => state.token;

export default reducer;
