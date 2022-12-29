import { useNavigate } from "react-router-dom";
import AccountPopover from "src/components/AccountPopover";
import Icon from "src/components/Icon";
import { linkUserProfile } from "src/data/sidebar";
import "./DashboardHeader.scss";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-header">
      <div className="toggle">
        <div className="logo" onClick={() => navigate("/")}></div>
        <Icon icon="bars" size={20} />
      </div>

      <div className="content">
        <AccountPopover routes={linkUserProfile} />
      </div>
    </div>
  );
};
export default DashboardHeader;
