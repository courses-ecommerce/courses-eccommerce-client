export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// export const isEmail = (value: string) =>
//   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const translateVi = (name?: string) => {
  switch (name) {
    //role
    case "student":
      return "Học viên";
    case "teacher":
      return "Giảng viên";

    //user
    case "fullName":
      return "Họ và tên";
    case "birthday":
      return "Ngày sinh nhật";
    case "gender":
      return "Giới tính";
    case "phone":
      return "Số điện thoại";
    case "avatar":
      return "Ảnh đại diện";
    //level
    case "all":
      return "Tất cả";
    case "beginer":
      return "Người bắt đầu";
    case "intermediate":
      return "Người có kiến thức";
    case "expert":
      return "Chuyên gia";
    //payment
    case "Paid":
      return "Đã thanh toán";
    //status course
    case "draft":
      return "Đang nháp";
    case "pending":
      return "Đang chờ";
    case "approved":
      return "Đã duyệt";
    // category
    case "name":
      return "Tên";
    case "publish":
      return "Xuất bản";
    //statistic, chart
    case "publishCourse":
      return "Được công bố";
    case "pendingCourse":
      return "Đang chờ duyệt";

    default:
      return name;
  }
};

//check value
export const checkGender = (name: any) => (name ? "Nam" : "Nữ");
//number locale
export const numberLocale = (number?: number, unit_name: string = "") => {
  if (!number) return 0;
  return number?.toLocaleString() + unit_name;
};
export const numberRound = (number?: number) => {
  if (!number) return 0;
  return Math.round(number);
  // return number.toString().substring(0, 5);
};
