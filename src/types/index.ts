import { ReactNode } from "react";

export interface IRoute {
  name: string;
  path: string;
  href?: string;
  role?: "account" | "page";
}

export interface IComponent {
  id: string;
  component: ReactNode;
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
}
export interface ChaptersProps {
  _id?: string;
  name?: string;
  number?: number;
  lessons?: LessonProps[];
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
  saleOff?: string;
  sellNumber?: string;
  slug?: string;
  targets?: string[];
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

// // for popover
// export interface INotify {
//   image: string;
//   title?: string;
//   isRead?: boolean;
//   content: string;
//   time: string;
// }

// export interface IMessage {
//   image: string;
//   title?: string;
//   isRead?: boolean;
//   content: string;
//   time: string;
// }
