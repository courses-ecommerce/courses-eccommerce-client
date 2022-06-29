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
    title?: string,
    description?: string
  ) => {
    const url = LESSON_API;
    return axiosClient.post(url, {
      chapter: idChapter,
      number,
      title: title?.trim() || "",
      description: description?.trim() || "",
    });
  },
  updateLesson: (
    idLesson?: string,
    number?: number,
    title?: string,
    description?: string,
    file?: FormData
  ) => {
    const url = LESSON_API + "/" + idLesson;
    return axiosClient.put(url, {
      number,
      title: title?.trim() || "",
      description: description?.trim() || "",
      file,
    });
  },
  deleteLesson: (idLesson: string) => {
    const url = LESSON_API + "/" + idLesson;
    return axiosClient.delete(url);
  },
};

export default lessonApi;
