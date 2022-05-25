import { IGetCourse } from "src/types/course";
import axiosClient from "./axiosClient";

const COURSE_API = "/courses";

const courseApi = {
  getCourses: (params?: IGetCourse) => {
    const url = COURSE_API;
    return axiosClient.get(url, { params });
  },
  getCoursesHot: (params?: any) => {
    const url = COURSE_API + "/hot";
    return axiosClient.get(url, { params });
  },
  getCoursesSuggest: (limit: Object) => {
    const url = COURSE_API + "/suggest";
    return axiosClient.get(url);
  },
  getCoursesRelated: (id: string) => {
    const url = COURSE_API + id + "/related";
    return axiosClient.get(url);
  },
  getCourseDetail: (id: string) => {
    const url = COURSE_API + "/" + id;
    return axiosClient.get(url);
  },
  getCourseRatingList: (id: string) => {
    const url = COURSE_API + "/" + id + "/rate";
    return axiosClient.get(url);
  },
  createNewCourse: (course_info: Object) => {
    const url = COURSE_API;
    return axiosClient.post(url, course_info);
  },
  updateCourse: (id: string, course_info: Object) => {
    const url = COURSE_API + "/" + id;
    return axiosClient.put(url, course_info);
  },
};

export default courseApi;
