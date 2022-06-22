import { IUser } from ".";

export interface IGetCourse {
  page?: number;
  limit: number;
  sort?: string;
  name?: string;
  category?: string;
  tags?: string;
  price?: string;
  publish?: boolean;
}

export interface IRating {
  _id?: string;
  rate?: number;
  createdAt?: string;
  updatedAt?: string;
  content?: string;
  author?: IUser;
}
