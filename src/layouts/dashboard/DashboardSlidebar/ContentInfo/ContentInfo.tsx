import { useSelector } from "react-redux";
import { DASHBOARD_ROUTE } from "src/contants/routes";
import LogoHeader from "src/layouts/dashboard/DashboardSlidebar/LogoHeader/LogoHeader";
import { selectAuthorization } from "src/reducers/authSlice";
import NavSection from "../../NavSection/NavSection";
import AvatarUser from "../AvatarUser/AvatarUser";
import "./ContentInfo.scss";

const ContentInfo = () => {
  const { isRole } = useSelector(selectAuthorization);

  const renderDashBoard = (dashboards: Array<any>) => {
    return (
      dashboards.length > 0 &&
      dashboards.map(
        (dashboard, index) =>
          dashboard.role === isRole && (
            <NavSection key={index} navConfig={dashboard.children} />
          )
      )
    );
  };

  return (
    <div className="content-info">
      <div className="content-info-logo">
        <LogoHeader />
      </div>
      <div className="content-info-user">
        <AvatarUser />
      </div>
      {/* link dashboard here */}
      <div className="content-info-nav">{renderDashBoard(DASHBOARD_ROUTE)}</div>
    </div>
  );
};

export default ContentInfo;
