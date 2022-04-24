import LogoHeader from "src/layouts/dashboard/DashboardSlidebar/LogoHeader/LogoHeader";
import navConfig from "../../NavSection/NavConfig";
import NavSection from "../../NavSection/NavSection";
import AvatarUser from "../AvatarUser/AvatarUser";
import "./ContentInfo.scss";

const ContentInfo = () => {
  return (
    <div className="content-info">
      <div className="content-info-logo">
        <LogoHeader />
      </div>
      <div className="content-info-user">
        <AvatarUser />
      </div>
      {/* link dashboard here */}
      <div className="content-info-nav">
        <NavSection navConfig={navConfig} />
      </div>
    </div>
  );
};

export default ContentInfo;
