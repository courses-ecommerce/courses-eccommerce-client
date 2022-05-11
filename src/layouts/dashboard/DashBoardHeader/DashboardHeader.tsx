import Icon from "src/components/Icon/Icon";
import Notification from "src/components/Notification/Notification";
import AccountPopover from "../AccountPopover/AccountPopover";
import "./DashboardHeader.scss";

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <div className="toggle">
        <Icon icon="bars" size={20} />
      </div>
      <div className="content">
        <Notification type="notify" />
        <Notification type="message" />
        <AccountPopover />
      </div>
    </div>
  );
};
export default DashboardHeader;
