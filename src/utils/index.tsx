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

export const translateVi = (name: string) => {
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
    // category
    case "name":
      return "Tên";
    case "publish":
      return "Xuất bản";
    default:
      return name;
  }
};
