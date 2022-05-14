import AccountPopover from "src/components/AccountPopover/AccountPopover";
import Icon from "src/components/Icon/Icon";
import Notification from "src/components/Notification/Notification";
import { linkUserProfile } from "src/data/sidebar";

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
        <AccountPopover routes={linkUserProfile} />
      </div>
    </div>
  );
};
export default DashboardHeader;
