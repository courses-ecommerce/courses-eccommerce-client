import axiosClient from "./axiosClient";

const RATE_API = "rate";

const rateApi = {
  postRate: () => {
    const url = RATE_API;
    return axiosClient.post(url);
  },
  updateRate: (id: string) => {
    const url = RATE_API + "/" + id;
    return axiosClient.put(url);
  },
};

export default rateApi;
