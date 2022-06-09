import axiosClient from "./axiosClient";

const CHAPTER_API = "/chapter";

const chapterApi = {
  getChapters: (idCourse?: string) => {
    const url = CHAPTER_API;
    return axiosClient.get(url, {
      params: {
        course: idCourse,
      },
    });
  },
  addChapter: (idCourse?: string, order?: number, name?: string) => {
    const url = CHAPTER_API;
    return axiosClient.post(url, {
      data: {
        course: idCourse,
        number: order,
        name: name?.trim() || "",
      },
    });
  },
  updateChapter: (idChapter?: string, order?: number, name?: string) => {
    const url = CHAPTER_API + "/" + idChapter;
    return axiosClient.put(url, {
      data: {
        number: order,
        name: name?.trim() || "",
      },
    });
  },
  deleteChapter: (idChapter: string) => {
    const url = CHAPTER_API + "/" + idChapter;
    return axiosClient.delete(url);
  },
};

export default chapterApi;
