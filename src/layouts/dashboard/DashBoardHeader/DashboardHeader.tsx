import Icon from "src/components/Icon/Icon";
import AccountPopover from "../AccountPopover/AccountPopover";
import "./DashboardHeader.scss";

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <div title="chưa làm">
        <Icon icon="envelope-open" size={28} color="#3265b7" />
      </div>
      <div title="để cho đẹp thôi">
        <Icon icon="commenting-o" size={28} color="#3265b7" />
      </div>
      <AccountPopover />
    </div>
  );
};
export default DashboardHeader;
