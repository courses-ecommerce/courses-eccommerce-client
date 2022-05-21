import axiosClient from "./axiosClient";

const CATEGORY_API = "/categories";

const categoryApi = {
  getCategories: () => {
    const url = CATEGORY_API;
    return axiosClient.get(url);
  },
  createNewCategory: (name: Object) => {
    const url = CATEGORY_API;
    return axiosClient.post(url, name);
  },
  updateCategory: (id: string, category_info: any) => {
    const url = CATEGORY_API + "/" + id;
    return axiosClient.put(url, category_info);
  },
  deleteCategory: (id: string) => {
    const url = CATEGORY_API + "/" + id;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
