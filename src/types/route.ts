import { Role } from "./user";

export interface IRoute {
  name: string;
  path: string;
  href?: string;
  role?: Role;
}
