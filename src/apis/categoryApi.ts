import axiosClient from "./axiosClient";

const CATEGORY_API = "/categories";

const categoryApi = {
  getCategories: () => {
    const url = CATEGORY_API;
    return axiosClient.get(url);
  },
};

export default categoryApi;
