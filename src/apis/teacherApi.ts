import axiosClient from "./axiosClient";

const TEACHER_API = "/teacher";
const teacherApi = {
  getCourses: (params?: any) => {
    const url = TEACHER_API + "/courses";
    return axiosClient.get(url, { params });
  },
  getTeacherInfo: () => {
    const url = TEACHER_API + "/info";
    return axiosClient.get(url);
  },
};
export default teacherApi;
