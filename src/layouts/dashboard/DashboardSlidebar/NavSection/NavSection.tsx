import { matchPath, useLocation } from "react-router-dom";
import NavItem from "./NavItem/NavItem";
import "./NavSection.scss";

interface NavSectionProps {
  navConfig: Array<any>;
  other?: any;
}

const NavSection: React.FC<NavSectionProps> = ({ navConfig, ...other }) => {
  const { pathname } = useLocation();

  const match = (path: any) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <div className="nav-section">
      {navConfig.map((item, index) => (
        <NavItem key={index} item={item} active={match} />
      ))}
    </div>
  );
};
export default NavSection;
