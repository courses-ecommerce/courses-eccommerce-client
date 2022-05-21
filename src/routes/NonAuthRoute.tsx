import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { selectAuthorization } from "src/reducers/authSlice";

export const NonAuthRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const { isAuth, isLoading, isRole } = useSelector(selectAuthorization);

  if (isAuth) {
    return <Navigate to={`/${isRole}/info`} state={{ from: location }} />;
  }

  return children;
};
