export interface IRoute {
  name: string;
  path: string;
  href?: string;
  role?: "admin" | "user" | "teacher" | "student" | "director";
}
