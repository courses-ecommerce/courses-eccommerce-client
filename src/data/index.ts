export const genderTypes = [
  { value: false, name: "Nữ" },
  { value: true, name: "Nam" },
];
export const accountTypes = [
  { value: "student", name: "Học sinh" },
  { value: "teacher", name: "Giáo viên" },
  { value: "admin", name: "Quản trị viên" },
];
export const statusTypes = [
  { value: false, name: "Đang khoá" },
  { value: true, name: "Hoạt động" },
  // { value: , name: "Tất cả" },
];

export const discountTypes = [
  { value: "percent", name: "Phần trăm" },
  { value: "money", name: "VNĐ" },
];
export const discountApplyTypes = [
  { value: "all", name: "Tất cả" },
  { value: "author", name: "Tác giả" },
  // { value: "category", name: "Mã danh mục" },
  // { value: "new user", name: "Người dùng mới" },
];
export const categoryTypes = [
  { value: false, name: "Đã duyệt" },
  { value: true, name: "Đang chờ duyệt" },
];
export const categoryStatusTypes = [
  { value: true, name: "Đang sử dụng" },
  { value: false, name: "Đang trống" },
];

// statistic
export const topAmountTypes = [
  { value: 5, name: "5 khoá hot nhất" },
  { value: 10, name: "10 khoá hot nhất" },
  { value: 15, name: "15 khoá hot nhất" },
];
export const dateTypes = [
  { value: "day", name: "Theo ngày" },
  { value: "month", name: "Theo tháng" },
  // { value: "year", name: "Theo năm" },
];

export const revenueSortTypes = [
  { value: "revenue-desc", name: "Lương giảm dần" },
  { value: "revenue-asc", name: "Lương tăng dần" },
];

export const numberRangeTypes = [
  { value: 3, name: "Hiển thị 3" },
  { value: 5, name: "Hiển thị 5" },
  // { value: 10, name: "Hiển thị 10" },
  // { value: 20, name: "Hiển thị 20" },
];
