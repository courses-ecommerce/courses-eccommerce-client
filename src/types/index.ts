import { ReactNode } from "react";

export interface IRoute {
  name: string;
  path: string;
  href?: string;
}

export interface IComponent {
  id: string;
  component: ReactNode;
}

export interface IUser {
  email: string;
  password: string;
  fullName: string;
  birthday?: string;
  gender?: boolean;
  phone?: string;
}

export interface ICourse {
  name: string;
  thumbnail: string;
  categories?: string[];
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
