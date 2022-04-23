import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import AccessDenied from "src/pages/MainPage/AccessDenied";
import { selectAuthorization } from "src/reducers/authSlice";

/**
 * A wrapper around the element which checks if the user is authenticated
 * If authenticated, renders the passed element
 * If not authenticated, redirects the user to Login page.
 */
export const AuthRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: string;
  // roles: Array<Role>;
}) => {
  let location = useLocation();

  const { isAuth, isLoading, isRole } = useSelector(selectAuthorization);

  // if (status === "idle" || status === "pending")
  //   return (
  //     <div className="body-center container">
  //       <Spin size="large" tip="Checking in.." />
  //     </div>
  //   );

  const userHasRequiredRole = roles.includes(isRole) ? true : false;

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isAuth && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return children;
};
