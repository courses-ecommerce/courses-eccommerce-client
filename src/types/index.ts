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
