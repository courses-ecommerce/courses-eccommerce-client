import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { Routes } from "react-router-dom";
import { selectAuthorization } from "./reducers/authSlice";
import { authRoute, mainRoute, privateRoute } from "./routes/Router";
import {
  ADMIN_ROUTE,
  AUTH_ROUTE,
  DASHBOARD_ROUTE,
  DIRECTOR_ROUTE,
  MAIN_ROUTE,
  STUDENT_ROUTE,
  TEACHER_ROUTE,
} from "./routes/routes";

function App() {
  const { isLoading } = useSelector(selectAuthorization);

  return (
    <>
      <Routes>
        {mainRoute(MAIN_ROUTE)}
        {authRoute(AUTH_ROUTE)}
        {privateRoute(ADMIN_ROUTE)}
        {privateRoute(TEACHER_ROUTE)}
        {privateRoute(STUDENT_ROUTE)}
        {privateRoute(DIRECTOR_ROUTE)}
        {/* Dashboard routes */}
        {privateRoute(DASHBOARD_ROUTE)}
      </Routes>

      <Backdrop
        // sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        sx={{ color: "#fff", zIndex: 99999 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default App;
