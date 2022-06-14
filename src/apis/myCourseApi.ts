import axiosClient from "./axiosClient";

const MYCOURSE_APi = "/my-courses";

const myCourseApi = {
  getMyCourse: () => {
    const url = MYCOURSE_APi;
    return axiosClient.get(url);
  },
  getMyCourseDetail: (id: string) => {
    const url = MYCOURSE_APi + "/" + id;
    return axiosClient.get(url);
  },
  updateTimeLineVideoCourse: (id: string) => {
    const url = MYCOURSE_APi + "/" + id;
    return axiosClient.put(url);
  },
};

export default myCourseApi;
