import Notification from "src/components/Notification/Notification";
import AccountPopover from "../AccountPopover/AccountPopover";
import "./DashboardHeader.scss";

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <Notification type="notify" />
      <Notification type="message" />
      <AccountPopover />
    </div>
  );
};
export default DashboardHeader;
