//documents ~ slide
export type DocumentType = "none" | "video" | "quiz" | "slide";
export enum DocumentENUM {
  VIDEO = "video",
  QUIZ = "quiz",
  DOCUMENTS = "slide",
}

export interface VideoInfo {
  name?: string;
  size?: string;
  createdAt?: string;
  status?: string;
  type?: string;
}

export interface Answer {
  answerID: string;
  key: string; //A, B, C, D,..
  value: string; //Description ...
  isCorrect: boolean; //Correct value
}

export interface Quiz {
  quizId: string;
  question: string;
  answers: Answer[];
}

export interface Quizzes {
  // quizzesId: string;
  lesson: string;
  quizzes: Quiz[];
}

export interface Exam {
  quizId: string;
  answeredId: string;
}
