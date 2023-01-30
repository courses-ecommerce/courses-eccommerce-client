import axiosClient from "./axiosClient";

const COURSE_API = "/courses";
const LESSON_API = "/lessons";

const uploadDocumentApi = {
  uploadImage: (image: FormData) => {
    const url = COURSE_API + "/upload/image";
    return axiosClient.post(url, image);
  },
  uploadFile: (file: FormData) => {
    const url = LESSON_API + "upload-file";
    return axiosClient.post(url, file);
  },
  uploadVideo: (video: FormData) => {
    const url = LESSON_API + "upload-video";
    return axiosClient.post(url, video);
  },
};

export default uploadDocumentApi;
