import { ICreateNewUser, IGetUser } from "src/types/user";
import axiosClient from "./axiosClient";

const ADMIN_API = "/admin";

const adminApi = {
  getUsers: (params?: IGetUser) => {
    const url = ADMIN_API + "/users";
    return axiosClient.get(url, { params });
  },
  createNewUser: (userInfo: ICreateNewUser) => {
    const url = ADMIN_API + "/users";
    return axiosClient.post(url, userInfo);
  },
  updateUserInfo: (userInfo: ICreateNewUser) => {
    const url = ADMIN_API + "/users";
    return axiosClient.post(url, userInfo);
  },
  deleteUser: (id: Object) => {
    const url = ADMIN_API + "/users";
    return axiosClient.delete(url, id);
  },
};

export default adminApi;
