import { IRoute } from "src/types";

export const linkHeader: IRoute[] = [
  { name: "Trang chủ", path: "/" },
  { name: "Khoá học", path: "/course" },
  { name: "Hỗ trợ", path: "/support" },
];

export const linkUserProfile: IRoute[] = [
  { name: "Trang chủ", path: "/" },
  { name: "Thông tin cá nhân", path: "dashboard" },
  { name: "Đổi mật khẩu", path: "#" },
];
