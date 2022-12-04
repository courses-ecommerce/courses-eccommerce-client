import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import UserList from "src/pages/AdminPage/AccountsManage/AccountList";
import AdminPage from "src/pages/AdminPage/AdminPage";
import CategoryList from "src/pages/AdminPage/CategoriesManage/CategoryList";
import CouponList from "src/pages/AdminPage/CouponManage/CouponList";
import CourseList from "src/pages/AdminPage/CoursesManage/CourseList";
import StatisticCourses from "src/pages/AdminPage/StatisticManage/CourseStatistic/CoursesStatistic";
import RevenueStatistic from "src/pages/AdminPage/StatisticManage/RevenueStatistic/RevenueStatistic";
import RevenueTeacherDetail from "src/pages/AdminPage/StatisticManage/RevenueTeacherStatistic/RevenueTeacherDetail";
import RevenueTeacherStatistic from "src/pages/AdminPage/StatisticManage/RevenueTeacherStatistic/RevenueTeacherStatistic";
import StatisticManage from "src/pages/AdminPage/StatisticManage/StatisticViews";
import UserStatistic from "src/pages/AdminPage/StatisticManage/UserStatistic/UserStatistic";
import ForgotPassword from "src/pages/AuthPage/ForgotPassword/ForgotPassword";
import Login from "src/pages/AuthPage/Login/Login";
import Register from "src/pages/AuthPage/Register/Register";
import CourseDetail from "src/pages/CoursePage/CourseDetail/CourseDetail";
import NotFound from "src/pages/MainPage/ErrorPage/NotFound";
import UnauthorizedPage from "src/pages/MainPage/ErrorPage/UnauthorizedPage";
import MainPage from "src/pages/MainPage/MainPage";
import PortfolioPage from "src/pages/MainPage/PortfolioPage/PortfolioPage";
import Message from "src/pages/Message/Message";
import ProfilePage from "src/pages/ProfilePage/ProfilePage";
import HistoryPayment from "src/pages/StudentPage/HistoryPayment/HistoryPayment";
import PaymentDetail from "src/pages/StudentPage/HistoryPayment/PaymentDetail/PaymentDetail";
import CartList from "src/pages/StudentPage/ManageCart/CartList";
import MyCourse from "src/pages/StudentPage/MyCourse/MyCourse";
import MyCourseDetail from "src/pages/StudentPage/MyCourse/MyCourseDetail/MyCourseDetail";
import StudentPage from "src/pages/StudentPage/StudentPage";
import TeacherInfo from "src/pages/TeacherPage/ManageProfile/TeacherInfo";
import TeacherRevenue from "src/pages/TeacherPage/ManageProfile/TeacherRevenue/TeacherRevenue";
import OverviewSystem from "src/pages/DirectorPage/OverviewSystem/OverviewSystem";
import InvoiceList from "src/pages/AdminPage/InvoiceManage/InvoiceList";
import TeacherCourse from "src/pages/TeacherPage/ManageCourses/TeacherCourse";
import TeacherCourseDetail from "src/pages/TeacherPage/ManageCourses/TeacherCourseDetail";

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
  {
    role: "page",
    path: "invoice/:id",
    element: <PaymentDetail />,
  },
  {
    role: "page",
    path: "user/:id",
    element: <PortfolioPage />,
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
const ADMIN_ROUTE = [
  { role: "admin", path: "/admin", element: <AdminPage /> },
  {
    role: "admin",
    path: "/admin/dashboard/statistic/revenue-teachers/:id",
    element: <RevenueTeacherDetail />,
  },
  {
    role: "admin",
    path: "/admin/dashboard/invoices/:id",
    element: <PaymentDetail />,
  },
  {
    role: "admin",
    path: "admin/dashboard/courses/:id",
    element: <MyCourseDetail />,
  },
];

// Student route
const STUDENT_ROUTE = [
  { role: "student", path: "/student", element: <StudentPage /> },
  {
    role: "student",
    path: "/student/history-payment/:id",
    element: <PaymentDetail />,
  },
  {
    role: "student",
    path: "/student/my-course/:id",
    element: <MyCourseDetail />,
  },
];

// director route
const DIRECTOR_ROUTE = [
  { role: "director", path: "/director", element: <StudentPage /> },
  {
    role: "director",
    path: "/director/revenue-teachers/:id",
    element: <RevenueTeacherDetail />,
  },
];

// Teacher route
const TEACHER_ROUTE = [
  // {
  //   role: "teacher",
  //   path: "/teacher/info",
  //   element: <TeacherInfo />,
  // },
  {
    role: "teacher",
    path: "/teacher/course",
    element: <TeacherCourse />,
  },
  {
    role: "teacher",
    path: "/teacher/course/:id",
    element: <TeacherCourseDetail />,
  },
  {
    role: "teacher",
    path: "teacher/course/preview-course/:id",
    element: <MyCourseDetail />,
  },
];

//Dash board routes
const DASHBOARD_ROUTE = [
  // admin routes
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
      // {
      //   path: "over-view",
      //   href: "/admin/over-view",
      //   element: <OverviewSystem />,
      //   title: "Tổng quan hệ thống",
      //   icon: "gears",
      // },
      {
        path: "dashboard/user",
        href: "/admin/dashboard/user",
        element: <UserList />,
        title: "Quản lý người dùng",
        icon: "user",
      },
      {
        path: "dashboard/categories",
        href: "/admin/dashboard/categories",
        element: <CategoryList />,
        title: "Quản lý danh mục",
        icon: "newspaper-o",
      },
      {
        path: "dashboard/courses",
        title: "Quản lý khoá học",
        href: "/admin/dashboard/courses",
        element: <CourseList />,
        icon: "book",
      },
      {
        path: "dashboard/invoices",
        title: "Quản lý hoá đơn",
        href: "/admin/dashboard/invoices",
        element: <InvoiceList />,
        icon: "file-text-o",
      },
      {
        path: "dashboard/coupons",
        href: "/admin/dashboard/coupons",
        element: <CouponList />,
        title: "Quản lý khuyến mãi",
        icon: "barcode",
      },

      {
        path: "dashboard/statistic/",
        href: "/admin/dashboard/statistic",
        element: <StatisticManage />,
        title: "Biểu đồ thống kê",
        icon: "bar-chart",
        children: [
          {
            path: "users",
            href: "/admin/dashboard/statistic/users",
            title: "Thống kê người dùng",
            element: <UserStatistic />,
            // icon: "info",
          },
          {
            path: "revenues",
            href: "/admin/dashboard/statistic/revenues",
            title: "Thống kê doanh thu",
            element: <RevenueStatistic />,
            // icon: "money",
          },
          {
            path: "revenue-teachers",
            href: "/admin/dashboard/statistic/revenue-teachers",
            title: "Doanh thu giảng viên",
            element: <RevenueTeacherStatistic />,
            // icon: "money",
          },
          {
            path: "courses",
            href: "/admin/dashboard/statistic/courses",
            title: "Thống kê khoá học",
            element: <StatisticCourses />,
            // icon: "money",
          },
          // {
          //   path: "coupons",
          //   href: "/admin/dashboard/statistic/coupons",
          //   title: "Thống kê mã khuyến mãi",
          //   element: <CouponStatistic />,
          //   // icon: "money",
          // },
        ],
      },
      {
        path: "message",
        href: "/admin/message",
        element: <Message />,
        title: "Trò chuyện trực tuyến",
        icon: "wechat",
      },
    ],
  },
  // student routes
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
        path: "cart",
        href: "/student/cart",
        element: <CartList />,
        title: "Quản lý giỏ hàng",
        icon: "shopping-cart",
      },
      {
        path: "my-course",
        href: "/student/my-course",
        element: <MyCourse />,
        title: "Khoá học của tôi",
        icon: "film",
      },
      {
        path: "history-payment",
        href: "/student/history-payment",
        element: <HistoryPayment />,
        title: "Lịch sử thanh toán",
        icon: "file-text-o",
      },
      {
        path: "message",
        href: "/student/message",
        element: <Message />,
        title: "Trò chuyện trực tuyến",
        icon: "wechat",
      },
    ],
  },
  // teacher routes
  {
    role: "teacher",
    path: "/teacher",
    element: <DashboardLayout />,
    children: [
      {
        path: "info",
        href: "/teacher/info",
        element: <ProfilePage />,
        title: "Thông tin cá nhân",
        icon: "info-circle",
      },
      {
        path: "banking_info",
        href: "/teacher/banking_info",
        element: <TeacherInfo />,
        title: "Thông tin ngân hàng",
        icon: "id-card",
      },
      {
        path: "revenue",
        href: "/teacher/revenue",
        element: <TeacherRevenue />,
        title: "Doanh thu cá nhân",
        icon: "cc-paypal",
      },
      {
        path: "dashboard/coupon",
        href: "/teacher/dashboard/coupon",
        element: <CouponList />,
        title: "Quản lý khuyến mãi",
        icon: "barcode",
      },
      {
        path: "message",
        href: "/teacher/message",
        element: <Message />,
        title: "Trò chuyện trực tuyến",
        icon: "wechat",
      },
    ],
  },
  // director routes
  {
    role: "director",
    path: "/director",
    element: <DashboardLayout />,
    children: [
      {
        path: "info",
        href: "/director/info",
        element: <ProfilePage />,
        title: "Thông tin cá nhân",
        icon: "info-circle",
      },
      {
        path: "over-view",
        href: "/director/over-view",
        element: <OverviewSystem />,
        title: "Tổng quan hệ thống",
        icon: "gears",
      },
      {
        path: "revenue-teachers",
        href: "/director/revenue-teachers",
        element: <RevenueTeacherStatistic />,
        title: "Doanh thu giảng viên",
        icon: "money",
      },
      {
        path: "users",
        href: "/director/users",
        title: "Tài khoản người dùng",
        element: <UserStatistic />,
        icon: "users",
      },
      {
        path: "revenues",
        href: "/director/revenues",
        title: "Doanh thu hệ thống",
        element: <RevenueStatistic />,
        icon: "rocket",
      },
      {
        path: "courses",
        href: "/director/courses",
        title: "Khoá học bán chạy",
        element: <StatisticCourses />,
        icon: "cart-plus",
      },
    ],
  },
];

export {
  MAIN_ROUTE,
  AUTH_ROUTE,
  ADMIN_ROUTE,
  DIRECTOR_ROUTE,
  TEACHER_ROUTE,
  STUDENT_ROUTE,
  DASHBOARD_ROUTE,
};
