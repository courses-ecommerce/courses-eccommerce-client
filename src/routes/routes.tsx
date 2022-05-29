import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import AdminPage from "src/pages/AdminPage/AdminPage";
import CategoryList from "src/pages/AdminPage/CategoriesManage/CategoryList";
import CourseList from "src/pages/AdminPage/CoursesManage/CourseList";
import UserList from "src/pages/AdminPage/UsersManage/UserList";
import ForgotPassword from "src/pages/AuthPage/ForgotPassword/ForgotPassword";
import Login from "src/pages/AuthPage/Login/Login";
import Register from "src/pages/AuthPage/Register/Register";
import CourseDetail from "src/pages/CoursePage/CourseDetail/CourseDetail";
// import CoursePage from "src/pages/CoursePage/CoursePage";
import MainPage from "src/pages/MainPage/MainPage";
import NotFound from "src/pages/MainPage/ErrorPage/NotFound";
import UnauthorizedPage from "src/pages/MainPage/ErrorPage/UnauthorizedPage";
import HistoryPayment from "src/pages/ProfilePage/HistoryPayment/HistoryPayment";
import ProfilePage from "src/pages/ProfilePage/ProfilePage";
import RegisterInstructor from "src/pages/ProfilePage/RegisterInstructor/RegisterInstructor";
import StudentPage from "src/pages/StudentPage/StudentPage";
import TeacherPage from "src/pages/TeacherPage/TeacherPage";

// main route
const MAIN_ROUTE = [
  {
    role: "page",
    path: "/",
    element: <MainPage />,
  },

  // {
  //   role: "page",
  //   path: "/courses",
  //   element: <CoursePage />,
  // },
  {
    role: "page",
    path: "/courses/:id",
    element: <CourseDetail />,
  },
  { role: "page", path: "/unauthorized", element: <UnauthorizedPage /> },
  { role: "page", path: "/*", element: <NotFound /> },
];

//auth route
const AUTH_ROUTE = [
  { role: "auth", path: "/login", element: <Login /> },
  { role: "auth", path: "/register", element: <Register /> },
  { role: "auth", path: "/forgot_password", element: <ForgotPassword /> },
];

// admin route
const ADMIN_ROUTE = [{ role: "admin", path: "/admin", element: <AdminPage /> }];

// Student route
const STUDENT_ROUTE = [
  { role: "student", path: "/student", element: <StudentPage /> },
];

// Teacher route
const TEACHER_ROUTE = [
  { role: "teacher", path: "/teacher", element: <TeacherPage /> },
];

//Dash board routes
const DASHBOARD_ROUTE = [
  {
    role: "admin",
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "info",
        href: "/admin/info",
        element: <ProfilePage />,
        title: "Thông tin cá nhân",
        icon: "info-circle",
      },
      {
        path: "dashboard/user",
        href: "/admin/dashboard/user",
        element: <UserList />,
        title: "Quản lý người dùng",
        icon: "user",
        // children: [
        //   {
        //     title: "Xem người dùng",
        //     path: "/admin/dashboard/user",
        //     element: <UserList />,
        //     // icon: "info",
        //   },
        // ],
      },
      {
        path: "dashboard/course",
        title: "Quản lý khoá học",
        href: "/admin/dashboard/course",
        element: <CourseList />,
        icon: "book",
      },
      {
        path: "dashboard/categories",
        href: "/admin/dashboard/categories",
        element: <CategoryList />,
        title: "Quản lý danh mục",
        icon: "user",
      },
      {
        path: "dashboard/coupon",
        href: "/admin/dashboard/coupon",
        element: () => "chưa lamf",
        title: "Quản lý khuyến mãi",
        icon: "barcode",
      },

      {
        path: "dashboard/export",
        href: "/admin/dashboard/export",
        element: () => "chưa lamf",
        title: "Thống kê",
        icon: "bar-chart",
      },
    ],
  },

  {
    role: "student",
    path: "/student",
    element: <DashboardLayout />,
    children: [
      {
        path: "info",
        href: "/student/info",
        element: <ProfilePage />,
        title: "Thông tin cá nhân",
        icon: "info-circle",
      },
      {
        path: "history-payment",
        href: "/student/history-payment",
        element: <HistoryPayment />,
        title: "Lịch sử thanh toán",
        icon: "file-text-o",
      },
      {
        path: "register-instructor",
        href: "/student/register-instructor",
        element: <RegisterInstructor />,
        title: "Đăng ký bán khoá học",
        icon: "usd",
      },
    ],
  },
];

export {
  MAIN_ROUTE,
  AUTH_ROUTE,
  ADMIN_ROUTE,
  TEACHER_ROUTE,
  STUDENT_ROUTE,
  DASHBOARD_ROUTE,
};
