import { IRoute } from "src/types";

export const linkHeader: IRoute[] = [
  { name: "Trang chủ", path: "/", href: "" },
  { name: "Khoá học", path: "/course", href: "course" },
  { name: "Hỗ trợ", path: "/support", href: "contact" },
];

export const linkUserProfile: IRoute[] = [
  { name: "Trang chủ", path: "/", role: "page" },
  { name: "Thông tin cá nhân", path: "dashboard", role: "account" },
  // { name: "Đổi mật khẩu", path: "#" },
];
