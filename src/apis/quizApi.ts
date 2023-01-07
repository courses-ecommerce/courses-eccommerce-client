import { Quizzes } from "src/types";
import axiosClient from "./axiosClient";

const QUIZ_API = "/quiz";
const quizApi = {
  createNewQuiz: (params: Quizzes) => {
    const url = QUIZ_API + "/create-bulk";
    return axiosClient.post(url, params);
  },
  updateQuiz: (params: Quizzes, id: string) => {
    const url = QUIZ_API + "/" + id;
    return axiosClient.put(url, params);
  },
  deleteQuiz: (id: string) => {
    const url = QUIZ_API + "/" + id;
    return axiosClient.delete(url);
  },
  getQuizLesson: (params: string) => {
    const url = QUIZ_API;
    return axiosClient.get(url, { params });
  },
};
export default quizApi;
