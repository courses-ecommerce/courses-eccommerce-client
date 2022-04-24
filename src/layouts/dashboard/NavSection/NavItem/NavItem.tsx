import { NavLink, useLocation } from "react-router-dom";
import Icon from "src/components/Icon/Icon";
import "./NavItem.scss";

interface ItemProps {
  title: string;
  path: string;
  icon: string;
  info: string;
  children: any;
}

interface NavItemProps {
  item: ItemProps;
  active: any;
}

const NavItem: React.FC<NavItemProps> = ({ item, active }) => {
  const { title, path, icon, info, children } = item;
  const { pathname } = useLocation();

  return (
    <NavLink to={path}>
      {icon && (
        <Icon
          color={path === pathname ? "#2065d1" : "#637381"}
          size={30}
          icon={icon}
        />
      )}
      <span>{title}</span>
    </NavLink>
  );
};

export default NavItem;
