import { IRoute } from "src/types";

export const linkHeader: IRoute[] = [
  { name: "Trang chủ", path: "/", href: "" },
  { name: "Danh sách khoá học", path: "/course", href: "course" },
  // { name: "Hỗ trợ", path: "/support", href: "contact" },
];

export const linkUserProfile: IRoute[] = [
  { name: "Trang chủ", path: "/", role: "user" },
  { name: "Quản lý admin", path: "/admin/info", role: "admin" },
  { name: "Quản lý khóa học", path: "/teacher/info", role: "teacher" },
  // { name: "Đổi mật khẩu", path: "#" },
];
