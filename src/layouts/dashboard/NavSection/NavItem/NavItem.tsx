import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import Icon from "src/components/Icon/Icon";
import useClickOutSide from "src/hooks/useClickOutSide";
import useHover from "src/hooks/useHover";
import "./NavItem.scss";

interface ItemProps {
  title: string;
  path: string;
  icon: string;
  info: string;
  href: string;
  children?: Array<any>;
}

interface NavItemProps {
  item: ItemProps;
  active: any;
}

const NavItem: React.FC<NavItemProps> = ({ item, active }) => {
  const { title, path, href, icon, info, children } = item;
  const { pathname } = useLocation();

  const { nodeRef, show, setShow } = useClickOutSide();
  const { nodeRef: hoverRef, show: showHover } = useHover();

  const renderChildrenNav = (navs: ItemProps[]) => {
    return (
      navs.length > 0 &&
      navs.map((nav: ItemProps, index) => {
        const { title, path, icon, info, children } = nav;

        return (
          <Link
            key={index}
            className={path === pathname ? "active" : ""}
            to={path}
          >
            {icon && (
              <Icon
                color={path === pathname || showHover ? "#2065d1" : "#637381"}
                size={14}
                icon={icon}
              />
            )}
            <span className="title-item">{title}</span>
          </Link>
        );
      })
    );
  };

  return (
    <>
      {!children ? (
        <Link
          ref={hoverRef}
          className={href === pathname ? "active" : ""}
          to={href}
        >
          {icon && (
            <Icon
              color={href === pathname || showHover ? "#2065d1" : "#637381"}
              size={20}
              icon={icon}
            />
          )}
          <span className="title-list">{title}</span>
        </Link>
      ) : (
        <>
          <div
            className={classNames(
              "nav-list",
              href === pathname ? "active" : ""
            )}
            ref={hoverRef}
            onClick={() => setShow(!show)}
          >
            <div className="nav-list-item">
              {icon && (
                <Icon
                  color={href === pathname || showHover ? "#2065d1" : "#637381"}
                  size={20}
                  icon={icon}
                />
              )}
              <span>{title}</span>
              {show ? (
                <Icon
                  icon="chevron-down"
                  color={href === pathname || showHover ? "#2065d1" : "#637381"}
                  size={12}
                />
              ) : (
                <Icon
                  icon="chevron-right"
                  color={href === pathname || showHover ? "#2065d1" : "#637381"}
                  size={12}
                />
              )}
            </div>
          </div>
          {show && (
            <div className="nav-item">{renderChildrenNav(children)}</div>
          )}
        </>
      )}
    </>
  );
};

export default NavItem;
