import { IRoute } from "src/types";

export const linkHeader: IRoute[] = [
  { name: "Trang chủ", path: "/", href: "home" },
  { name: "Khoá học", path: "/course", href: "course" },
  { name: "Hỗ trợ", path: "/support", href: "support" },
];

export const linkUserProfile: IRoute[] = [
  { name: "Trang chủ", path: "/" },
  { name: "Thông tin cá nhân", path: "dashboard" },
  { name: "Đổi mật khẩu", path: "#" },
];
