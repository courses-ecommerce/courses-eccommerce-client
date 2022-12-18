import { useNavigate } from "react-router-dom";
import AccountPopover from "src/components/AccountPopover/AccountPopover";
import Icon from "src/components/Icon/Icon";
import Notification from "src/components/Notification/Notification";
import { linkUserProfile } from "src/data/sidebar";
import "./DashboardHeader.scss";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-header">
      {/* <div className="toggle">
        <Icon icon="bars" size={20} />
      </div> */}
      <div className="logo" onClick={() => navigate("/")}></div>

      <div className="content">
        <AccountPopover routes={linkUserProfile} />
      </div>
    </div>
  );
};
export default DashboardHeader;
