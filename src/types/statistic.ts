import { IAccount, ICourse, IUser } from ".";
import { IDetailInvoice, IPayMent } from "./invoice";

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

export interface ITeacher {
  _id?: string;
  account?: IAccount;
  count?: number;
  fullName?: string;
  birthday?: string;
  phone?: string;
  teacherInfo?: ITeacherInfo;
  total?: number;
  revenue?: number;
  numOfDetailInvoice?: number;
  detailInvoices?: IDetailInvoice[];
  gender?: boolean;
}

export interface ITeacherPortfolio {
  user?: IUser;
  userCourse?: ICourse[];
}
