import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthorization } from "src/reducers/authSlice";
import { DASHBOARD_ROUTE } from "src/routes";
import { Router } from "src/types";
import SidebarLargeScreen from "./SidebarLargeScreen";
import SidebarMobile from "./SidebarMobile";
import "./DashboardSidebar.scss";

const DashboardSidebar = () => {
  const { isRole } = useSelector(selectAuthorization);
  const [dashboard, setDashboard] = useState<Router[]>([]);

  useEffect(() => {
    const dashboardRoleIndex = DASHBOARD_ROUTE.findIndex(
      (dashboard) => dashboard.role === isRole
    );
    setDashboard(DASHBOARD_ROUTE[dashboardRoleIndex].children as Router[]);
  }, [isRole]);

  if (window.screen.width <= 837) {
    return <SidebarMobile dashboard={dashboard} />;
  }

  return <SidebarLargeScreen dashboard={dashboard} />;
};

export default DashboardSidebar;
