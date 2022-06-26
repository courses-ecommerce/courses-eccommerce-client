import { IAccount } from ".";
import { IPayMent } from "./invoice";

export interface IYearStatistic {
  value?: number;
  year?: number;
}

export interface IUserStatistic {
  activating?: number;
  file?: string;
  message?: string;
  newUsers?: IYearStatistic[];
  notActivating?: number;
  raise?: number;
}

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
