import { ICreateNewUser, IGetUser } from "src/types/user";
import axiosClient from "./axiosClient";

const ADMIN_API = "/admin";

const adminApi = {
  getUsers: (params?: IGetUser) => {
    const url = ADMIN_API + "/users";
    return axiosClient.get(url, { params });
  },
  getUserDetail: (id: string) => {
    const url = ADMIN_API + "/users/" + id;
    return axiosClient.get(url);
  },
  createNewUser: (userInfo: ICreateNewUser) => {
    const url = ADMIN_API + "/users";
    return axiosClient.post(url, userInfo);
  },
  updateUserInfo: (userInfo: ICreateNewUser, id: string) => {
    const url = ADMIN_API + "/users/" + id;
    return axiosClient.post(url, userInfo);
  },
  deleteUser: (id: string) => {
    const url = ADMIN_API + "/users/" + id;
    return axiosClient.delete(url);
  },
};

export default adminApi;
