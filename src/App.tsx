import { Routes } from "react-router-dom";
import { authRoute, mainRoute, privateRoute } from "./routes/Router";
import {
  ADMIN_ROUTE,
  AUTH_ROUTE,
  DASHBOARD_ROUTE,
  MAIN_ROUTE,
  STUDENT_ROUTE,
  TEACHER_ROUTE,
} from "./routes/routes";

function App() {
  return (
    <Routes>
      {mainRoute(MAIN_ROUTE)}
      {authRoute(AUTH_ROUTE)}
      {privateRoute(ADMIN_ROUTE)}
      {privateRoute(TEACHER_ROUTE)}
      {privateRoute(STUDENT_ROUTE)}
      {/* Dashboard routes */}
      {privateRoute(DASHBOARD_ROUTE)}
    </Routes>
  );
}

export default App;
