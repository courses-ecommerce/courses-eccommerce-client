import { IAccount } from ".";
import { IPayMent } from "./invoice";

export interface ITeacherInfo {
  payments?: IPayMent;
}

export interface ITopTeacher {
  _id?: string;
  account?: IAccount;
  count?: number;
  fullName?: string;
  phone?: string;
  teacherInfo?: ITeacherInfo;
  total?: number;
}
