import { IAccount } from "src/types";
import axiosClient from "./axiosClient";

const AUTH_API = "/login";

const authApi = {
  postLogin: (account: IAccount) => {
    const url = AUTH_API;
    return axiosClient.post(url, account);
  },
};

export default authApi;
