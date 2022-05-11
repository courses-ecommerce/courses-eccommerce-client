import { Drawer } from "@mui/material";
import ContentInfo from "./ContentInfo/ContentInfo";
import "./DashboardSidebar.scss";

const DashboardSidebar = () => {
  return (
    <div className="dashboard-sidebar">
      <Drawer open variant="persistent">
        <ContentInfo />
      </Drawer>
    </div>
  );
};

export default DashboardSidebar;
