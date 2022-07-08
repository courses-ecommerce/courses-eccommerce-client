import { ReactNode } from "react";

export interface IRoute {
  name: string;
  path: string;
  href?: string;
  role?: "admin" | "user" | "teacher" | "student" | "director";
}

export interface IComponent {
  id: string;
  component: ReactNode;
}

export interface IPayment {
  accountNumber?: string;
  bankName?: string;
  cardNumber?: string;
  name?: string;
}

export interface ITeacherStatus {
  _id?: string;
  description?: string;
  isVerified?: boolean;
  payments?: IPayment;
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
export interface ICategory {
  _id?: string;
  name?: string;
  slug?: string;
  publish?: boolean;
  isPending?: boolean;
}

export interface RatingProps {
  numOfRate?: number;
  rate?: number;
}
export interface LessonProps {
  _id?: string;
  description?: string;
  number?: number;
  title?: number;
  video?: any;
}
export interface ChaptersProps {
  _id?: string;
  name?: string;
  number?: number;
  lessons?: LessonProps[];
}
export interface SearchKeyProps {
  original?: string;
  suggestion?: string;
}

export interface ICourse {
  _id?: string;
  author?: IUser;
  chapters?: ChaptersProps[];
  name?: string;
  thumbnail?: string;
  category?: ICategory;
  currentPrice?: number;
  originalPrice?: number;
  description?: string;
  hashtags?: string[];
  intendedLearners?: string[];
  requirements?: string[];
  rating?: RatingProps;
  language?: string;
  level?: string;
  saleOff?: number;
  sellNumber?: string;
  slug?: string;
  isBuyed?: boolean;
  targets?: string[];
  discount?: number;
  type?: string;
}

export interface IAccount {
  id: string;
  email: string;
  password: string;
  role: "student" | "admin" | "teacher";
  refreshToken: string;
  accessToken: string;
  isActive: boolean;
}
