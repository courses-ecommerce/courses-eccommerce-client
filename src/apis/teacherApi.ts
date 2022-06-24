import axiosClient from "./axiosClient";

const TEACHER_API = "/teacher";
const teacherApi = {
  getCourses: (params?: any) => {
    const url = TEACHER_API + "/courses";
    return axiosClient.get(url, { params });
  },
  getCourseDetails: (id: string) => {
    const url = TEACHER_API + "/courses/" + id;
    return axiosClient.get(url);
  },
  getTeacherInfo: () => {
    const url = TEACHER_API + "/info";
    return axiosClient.get(url);
  },
};
export default teacherApi;
