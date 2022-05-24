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

export interface ICourse {
  name: string;
  thumbnail: string;
  categories?: string[];
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

export interface IUser {
  account?: IAccount;
  fullName?: string;
  birthday?: string;
  gender?: boolean;
  phone?: string;
  avatar?: any;
}

// for popover
export interface INotify {
  image: string;
  title?: string;
  isRead?: boolean;
  content: string;
  time: string;
}

export interface IMessage {
  image: string;
  title?: string;
  isRead?: boolean;
  content: string;
  time: string;
}
