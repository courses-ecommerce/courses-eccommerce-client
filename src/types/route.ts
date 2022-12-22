import { Role } from "./user";

export interface Router {
  path: string;
  element?: JSX.Element;
  children?: Router[];
  name?: string;
  href?: string;
  role?: Role | string;
}
