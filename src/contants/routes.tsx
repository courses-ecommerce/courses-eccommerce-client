import AdminPage from "src/pages/AdminPage/AdminPage";
import ForgotPassword from "src/pages/AuthPage/ForgotPassword";
import Login from "src/pages/AuthPage/Login";
import Register from "src/pages/AuthPage/Register";
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

export { MAIN_ROUTE, AUTH_ROUTE, ADMIN_ROUTE, TEACHER_ROUTE, STUDENT_ROUTE };
