import { ICounpon } from "src/types";
import axiosClient from "./axiosClient";

const COUPON_API = "/coupons";

const couponApi = {
  getCoupons: (params: any) => {
    const url = COUPON_API;
    return axiosClient.get(url, { params });
  },
  getCouponDetail: (id: string) => {
    const url = COUPON_API + "/" + id;
    return axiosClient.get(url);
  },

  createNewCoupon: (params: ICounpon) => {
    const url = COUPON_API;
    return axiosClient.post(url, params);
  },
  updateCoupon: (id: string | number, params: any) => {
    const url = COUPON_API + "/" + id;
    return axiosClient.put(url, params);
  },
  multiDeleteCoupon: (ids: any) => {
    const url = COUPON_API;
    return axiosClient.delete(url, { data: ids });
  },
  // postAllCouponCodes: (data: any) => {
  //   return axios.post(
  //     "https://sheet.best/api/sheets/c556a984-9703-4956-bfaf-5decb4ed3fd9?",
  //     { data, Headers: { "Content-Type": "application/json" } }
  //   );
  // },
};
export default couponApi;
