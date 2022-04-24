import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import AdminPage from "src/pages/AdminPage/AdminPage";
import ForgotPassword from "src/pages/AuthPage/ForgotPassword/ForgotPassword";
import Login from "src/pages/AuthPage/Login/Login";
import Register from "src/pages/AuthPage/Register/Register";
import CourseDetail from "src/pages/CoursePage/CourseDetail";
import CoursePage from "src/pages/CoursePage/CoursePage";
import HomePage from "src/pages/MainPage/HomePage";
import NotFound from "src/pages/MainPage/NotFound";
import StudentPage from "src/pages/StudentPage/StudentPage";
import TeacherPage from "src/pages/TeacherPage/TeacherPage";

// main route
const MAIN_ROUTE = [
  {
    role: "page",
    path: "/",
    element: <HomePage />,
  },

  {
    role: "page",
    path: "/courses",
    element: <CoursePage />,
  },
  {
    role: "page",
    path: "/courses/:id",
    element: <CourseDetail />,
  },
  {
    role: "page",
    path: "/dashboard",
    element: <DashboardLayout />,
  },
  {
    role: "page",
    path: "/dashboard/user",
    element: <DashboardLayout />,
  },

  { role: "page", path: "/*", element: <NotFound /> },
];

//auth route
const AUTH_ROUTE = [
  { role: "auth", path: "/login", element: <Login /> },
  { role: "auth", path: "/register", element: <Register /> },
  { role: "auth", path: "/forgot_password", element: <ForgotPassword /> },
];

// admin route
const ADMIN_ROUTE = [
  { role: "admin", path: "/admin", element: <AdminPage /> },
  //   { role: "admin", path: "/admin/profile", element: <AdminProfile /> },
];

// Student route
const STUDENT_ROUTE = [
  { role: "student", path: "/student", element: <StudentPage /> },
  //   { role: "student", path: "/student/profile", element: <StudentProfile /> },
];

// Teacher route
const TEACHER_ROUTE = [
  { role: "teacher", path: "/teacher", element: <TeacherPage /> },
  //   { role: "teacher", path: "/teacher/profile", element: <TeacherProfile /> },
];

//Dash board routes
const DASHBOARD_ROUTE = [
  {
    role: "admin",
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        href: "/dashboard",
        element: () => "chưa lamf",
        title: "dashboard",
        icon: "info-circle",
      },
      {
        path: "dashboard/user",
        href: "/dashboard/user",
        element: () => "chưa lamf",
        title: "Quản lý người dùng",
        icon: "user",
        children: [
          {
            title: "Xem người dùng",
            path: "/dashboard/user",
            // icon: "info",
          },
          {
            title: "Thêm người dùng",
            path: "/dashboard/user/add",
            //  icon: "plus"
          },
          {
            title: "Xoá người dùng",
            path: "/dashboard/user/delete",
            //icon: "trash-o"
          },
          {
            title: "Sửa người dùng",
            path: "/dashboard/user/modify", //icon: "pencil"
          },
        ],
      },
      {
        path: "dashboard/course",
        title: "Quản lý khoá học",
        href: "/admin/dashboard/course",
        icon: "book",
      },
      {
        path: "dashboard/categories",
        href: "/admin/dashboard/categories",
        element: () => "chưa lamf",
        title: "Quản lý danh mục",
        icon: "user",
      },

      {
        path: "dashboard/export",
        href: "/admin/dashboard/export",
        element: () => "chưa lamf",
        title: "Thống kê",
        icon: "list-alt",
      },
    ],
  },
  // {
  //   role: "teacher",
  //   path: "/teacher",
  //   element: <DashboardLayout />,
  //   children: [
  //     { path: "theme/colors", element: () => "chưa lamf" },
  //     { path: "theme/typography", element: () => "chưa lamf" },
  //     { path: "base/accordion", element: () => "chưa lamf" },
  //     { path: "base/breadcrumbs", element: () => "chưa lamf" },
  //   ],
  // },
];

export {
  MAIN_ROUTE,
  AUTH_ROUTE,
  ADMIN_ROUTE,
  TEACHER_ROUTE,
  STUDENT_ROUTE,
  DASHBOARD_ROUTE,
};
