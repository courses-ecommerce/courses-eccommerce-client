import axios from "axios";
// import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  //   paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  // Handle token here ...
  config.params = config.params || {};

  const { accessToken }: any = JSON.parse(
    localStorage?.getItem("access_token") || "null"
  );

  // console.log("đá", accessToken);

  // const access_token = JSON.parse(
  //   localStorage?.getItem("access_token")?.accessToken
  // );

  config.headers["Authorization"] = ` Bearer ${accessToken}`;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },

  async (error) => {
    // Handle errors

    if (error.response) {
      //Call request token, access token expires
      if (error.request.status === 401) {
        try {
        } catch (error: any) {
          if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
          }
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(
      error.response.data.message || {
        error: "Response Error sever dont correct",
      }
    );
  }
);
export default axiosClient;
