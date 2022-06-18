import { ICounpon } from "src/types/cart";
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
  // couponLoginGoogle: () => {
  //   const url = COUPON_API + "/login-with-google";
  //   return axiosClient.get(url);
  // },
  // couponGoogleCallBack: (code: any) => {
  //   const url = COUPON_API + "/google/callback";
  //   return axiosClient.get(url, { params: code });
  // },
  postCouponToGoogleSheet: (data: any) => {
    const url = COUPON_API + "/export-sheet";
    return axiosClient.post(url, data);
  },
};
export default couponApi;
