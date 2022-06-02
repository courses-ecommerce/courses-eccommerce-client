import { createSlice } from "@reduxjs/toolkit";
import { IAuthSlice } from "src/types/slice";

// export const postLogin = createAsyncThunk(
//   "auth/login",
//   async (params: ILogin, thunkApi) => {
//     // thunkAPI.dispatch(...)

//     console.log("ádasdas", params);

//     const response = await authApi.postLogin(params);
//     return response;
//   }
// );

const initialState: IAuthSlice = {
  isLoading: false,
  isAuth: false,
  isRole: "",
  userInfo: {},
  // isAuth: JSON.parse(localStorage.getItem("role") || "false") ? true : false,
  // isRole: JSON.parse(localStorage.getItem("role") || "{}")
  //   ? JSON.parse(localStorage.getItem("role") || "null")
  //   : "",
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
    getUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    isSuccess(state) {
      // state.isAuth = true;
      state.isLoading = false;
    },
    isLogout(state) {
      state.isAuth = false;
      state.isRole = "";
    },
  },
  extraReducers: {},
});

const { actions, reducer } = authSlice;

export const { isPending, isLogin, getUserInfo, isSuccess, isLogout } = actions;

export const selectAuthorization = (state: { auth: IAuthSlice }) => state.auth;

export default reducer;
