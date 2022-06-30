import { toast } from "react-toastify";
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
  updateLesson: async (
    idLesson?: string,
    number?: number,
    title?: string,
    description?: string,
    file?: File
  ) => {
    const url = LESSON_API + "/" + idLesson;
    const formData = new FormData();
    title && formData.append("title", title);
    number && formData.append("number", number.toString());
    description && formData.append("description", description);
    file && formData.append("file", file);
    file && formData.append("type", "video");

    try {
      const res: any = await axiosClient.put(url, formData);
      if (res) {
        if (file) {
          toast.success("Upload successfully, video is in progress", {
            position: "bottom-right",
          });
        } else {
          toast.success(res.message, {
            position: "bottom-right",
          });
        }
        return res;
      }

      return undefined;
    } catch (error) {
      return undefined;
    }
  },
  deleteLesson: (idLesson: string) => {
    const url = LESSON_API + "/" + idLesson;
    return axiosClient.delete(url);
  },
};

export default lessonApi;
