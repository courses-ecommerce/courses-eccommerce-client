type StatusProgress = "pending" | "success";

export interface IVideoUpload {
  name: string;
  size: string;
  createdAt: string;
  type: string;
  status: StatusProgress;
  url: string;
}

export interface ILessonUpload {
  _id: string;
  title: string;
  description: string;
  videoInfo: IVideoUpload;
  publish: boolean;
}

export interface LessonUploadProps {
  lesson: ILessonUpload;
  index: number;
  handleUpdateLesson: (
    name: string,
    order: number,
    lessonId: string,
    description?: string,
    file?: File
  ) => void;
  handleDeleteLesson: (id: string) => void;
}
