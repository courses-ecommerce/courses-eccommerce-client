import { IGetCourse } from "src/types/course";
import axiosClient from "./axiosClient";

const COURSE_API = "/courses";

const courseApi = {
  getCours: (params: IGetCourse) => {
    const url = COURSE_API;
    return axiosClient.get(url, { params });
  },
};

export default courseApi;
