const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: "info-circle",
  },
  {
    title: "Quản lý người dùng",
    path: "/dashboard/user",
    icon: "user",
    children: [
      {
        title: "Xem người dùng",
        path: "/dashboard/user",
        // icon: "info",
      },
      {
        title: "Thêm người dùng",
        path: "add",
        //  icon: "plus"
      },
      {
        title: "Xoá người dùng",
        path: "delete",
        //icon: "trash-o"
      },
      {
        title: "Sửa người dùng",
        path: "modify", //icon: "pencil"
      },
    ],
  },
  // {
  //   title: "Quản lý khoá học",
  //   path: "/dashboard/user",
  //   icon: "book",
  // },

  // {
  //   title: "Quản lý danh mục",
  //   path: "/dashboard/user",
  //   icon: "user",
  // },

  // {
  //   title: "Thống kê",
  //   path: "/dashboard/user",
  //   icon: "list-alt",
  // },
];

export default navConfig;
