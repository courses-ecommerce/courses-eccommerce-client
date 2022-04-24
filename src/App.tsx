import { useEffect } from "react";
import { Navigate, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  AUTH_ROUTE,
  MAIN_ROUTE,
  STUDENT_ROUTE,
  TEACHER_ROUTE,
} from "./contants/routes";
import { authRoute, mainRoute, privateRoute } from "./routes/Router";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, []);

  return (
    <Routes>
      {mainRoute(MAIN_ROUTE)}
      {authRoute(AUTH_ROUTE)}
      {privateRoute(ADMIN_ROUTE)}
      {privateRoute(TEACHER_ROUTE)}
      {privateRoute(STUDENT_ROUTE)}
    </Routes>
  );
}

export default App;
