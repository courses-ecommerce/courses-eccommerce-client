import { useSelector } from "react-redux";
import { selectAuthorization } from "src/reducers/authSlice";
import { DASHBOARD_ROUTE } from "src/routes";
import AvatarUser from "../AvatarUser";
import SidebarSection from "./SidebarSection";
import { Router } from "src/types";
import "./DashboardSidebar.scss";

const DashboardSidebar = () => {
  const { isRole } = useSelector(selectAuthorization);

  const renderDashBoard = (dashboards: Router[]) => {
    const dashboardRoleIndex = dashboards.findIndex(
      (dashboard) => dashboard.role === isRole
    );
    return (
      <SidebarSection
        sidebarSection={dashboards[dashboardRoleIndex].children as Router[]}
      />
    );
  };

  return (
    <div className="dashboard-sidebar">
      <div className="content-info">
        <div className="content-info-user">
          <AvatarUser />
        </div>
        <div className="content-info-nav">
          {renderDashBoard(DASHBOARD_ROUTE)}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
