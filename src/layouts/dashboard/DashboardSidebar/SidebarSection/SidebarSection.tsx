import { matchPath, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem/SidebarItem";
import "./SidebarSection.scss";

interface SidebarSectionProps {
  navConfig: Array<any>;
  other?: any;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  navConfig,
  ...other
}) => {
  const { pathname } = useLocation();

  const match = (path: any) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <div className="nav-section">
      {navConfig.map((item, index) => (
        <SidebarItem key={index} item={item} active={match} />
      ))}
    </div>
  );
};
export default SidebarSection;
