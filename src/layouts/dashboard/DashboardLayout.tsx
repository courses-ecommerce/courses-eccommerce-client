import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashBoardHeader/DashboardHeader";
import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";

import "./DashboardLayout.scss";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <div className="header">
        <DashboardHeader />
      </div>
      <div className="body">
        <div className="sidebar">
          <DashboardSidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
