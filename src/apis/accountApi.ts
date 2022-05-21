import axiosClient from "./axiosClient";

const ACCOUNT_API = "/users";

const accountApi = {
  getMe: () => {
    const url = ACCOUNT_API;
    return axiosClient.get(url);
  },
  updateInfo: () => {
    const url = ACCOUNT_API;
    return axiosClient.put(url);
  },
  getHistory: () => {
    const url = ACCOUNT_API + "/history";
    return axiosClient.get(url);
  },
};

export default accountApi;
