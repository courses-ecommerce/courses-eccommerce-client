import { IAccount } from "./auth";
import { ITeacherStatus } from "./teacher";

export interface IGetUser {
  page?: string | number;
  limit?: string | number;
  email?: string;
  role?: string;
  sort?: string;
}
export interface ICreateNewUser {
  email: string;
  password: string;
  fullName: string;
  birthday?: string;
  gender?: boolean | string;
  phone?: string;
}

export interface IUser {
  _id?: string;
  account?: IAccount;
  fullName?: string;
  birthday?: string;
  gender?: boolean;
  phone?: string;
  avatar?: any;
  createdAt?: string;
  updatedAt?: string;
  teacher?: ITeacherStatus;
}

export type Role = "admin" | "user" | "teacher" | "student" | "director";
