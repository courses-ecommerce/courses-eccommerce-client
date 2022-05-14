import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";
import { IRoute } from "src/types";
import "./NavLinks.scss";

interface NavLinksProps {
  links: IRoute[];
  className?: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ links, className }) => {
  const renderLinks = (links: IRoute[]) => {
    return (
      links.length > 0 &&
      links.map((link: IRoute, index) => (
        <NavLink to={link.path}>{link.name}</NavLink>
      ))
    );
  };

  return (
    <div className={classNames("link-navigate", className)}>
      {renderLinks(links)}
    </div>
  );
};

export default NavLinks;
