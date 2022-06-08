import { Outlet, Route } from "react-router-dom";
import { AuthRoute } from "./AuthRoute";
import { NonAuthRoute } from "./NonAuthRoute";

const mainRoute = (routes: Array<any>) => {
  return routes.map((route, index) => {
    return <Route key={index} path={route.path} element={route.element} />;
  });
};
const authRoute = (routes: Array<any>) => {
  return routes.map((route, index) => {
    return (
      <Route
        key={index}
        path={route.path}
        element={<NonAuthRoute>{route.element}</NonAuthRoute>}
      />
    );
  });
};
const privateRoute = (routes: Array<any>) => {
  return routes.map((route, index) => {
    return (
      <Route
        key={index}
        path={route.path}
        element={<AuthRoute roles={route.role}>{route.element}</AuthRoute>}
      >
        {route.children &&
          route.children.map((subLink: any, index: number) => (
            <Route
              key={index}
              path={subLink.path}
              element={subLink.children ? <Outlet /> : subLink.element}
            >
              {subLink.children &&
                subLink.children.map((subLinkItem: any, index: number) => (
                  <Route
                    key={index}
                    path={subLinkItem.path}
                    element={subLinkItem.element}
                  ></Route>
                ))}
            </Route>
          ))}
      </Route>
    );
  });
};

export { mainRoute, privateRoute, authRoute };
