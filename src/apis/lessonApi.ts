import { DocumentType, VideoInfo } from "src/types";
import { notificationMessage } from "src/utils";
import axiosClient from "./axiosClient";

const LESSON_API = "/lessons";

const lessonApi = {
  getLessons: (idChapter?: string) => {
    const url = LESSON_API;
    return axiosClient.get(url, {
      params: {
        chapter: idChapter,
      },
    });
  },
  addLesson: (
    idChapter?: string,
    number?: number,
    title: string = "",
    description: string = ""
  ) => {
    const url = LESSON_API;
    const lesson_information = {
      chapter: idChapter,
      number,
      title: title.trim(),
      description: description.trim(),
    };
    return axiosClient.post(url, lesson_information);
  },
  updateLesson: async (
    idLesson?: string,
    number?: number,
    title?: string,
    description?: string,
    file_url?: string | string[],
    type?: DocumentType,
    videoInfo?: VideoInfo
  ) => {
    const url = LESSON_API + "/" + idLesson;

    let lesson_information;
    if (type === "video") {
      lesson_information = {
        number,
        title,
        description,
        file: file_url,
        type,
        videoInfo,
      };
      console.log("lesson_information", lesson_information);
    }
    if (type === "slide") {
      lesson_information = {
        number,
        title,
        description,
        slide: file_url,
        type,
      };
    }
    if (type === "quiz") {
      lesson_information = { number, title, description, type };
    }

    try {
      const response = await axiosClient.put(url, lesson_information);
      console.log(response);

      notificationMessage("success", "Cập nhật thông tin lesson thành công");
    } catch (error) {
      notificationMessage("error", error as string);
    }
  },
  deleteLesson: (idLesson: string) => {
    const url = LESSON_API + "/" + idLesson;
    return axiosClient.delete(url);
  },
};

export default lessonApi;
