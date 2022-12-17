import { useSelector } from "react-redux";
import { selectAuthorization } from "src/reducers/authSlice";
import { DASHBOARD_ROUTE } from "src/routes/routes";
import AvatarUser from "../AvatarUser/AvatarUser";
import SidebarSection from "./SidebarSection/SidebarSection";
import "./DashboardSidebar.scss";

const DashboardSidebar = () => {
  const { isRole } = useSelector(selectAuthorization);

  const renderDashBoard = (dashboards: Array<any>) => {
    return (
      dashboards.length > 0 &&
      dashboards.map(
        (dashboard, index) =>
          dashboard.role === isRole && (
            <SidebarSection key={index} navConfig={dashboard.children} />
          )
      )
    );
  };

  return (
    <div className="dashboard-sidebar">
      <div className="content-info">
        <div className="content-info-user">
          <AvatarUser />
        </div>
        {/* link dashboard here */}
        <div className="content-info-nav">
          {renderDashBoard(DASHBOARD_ROUTE)}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
