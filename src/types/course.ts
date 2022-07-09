export interface IGetCourse {
  page?: number;
  limit: number;
  sort?: string;
  name?: string;
  category?: string;
  tags?: string;
  price?: string;
  publish?: boolean;
  author?: string;
}

export type CourseType =
  | "draft"
  | "pending"
  | "approved"
  | "denied"
  | "updating";

export enum ICourseStatues {
  draft = "Bản nháp",
  pending = "Đang chờ duyệt",
  approved = "Đã duyệt",
  denied = "Từ chối",
  updating = "Đang update",
}
