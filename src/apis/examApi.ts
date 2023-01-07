import { Exam } from "src/types";
import axiosClient from "./axiosClient";

const EXAM_API = "/exam";

const examApi = {
  getReviewExam: (lesson: string) => {
    const url = EXAM_API;
    return axiosClient.get(url, {
      params: { lesson },
    });
  },
  submitExam: (lesson: string, exams: Exam[]) => {
    const url = EXAM_API;
    return axiosClient.post(url, { lesson, exams });
  },
};
export default examApi;
