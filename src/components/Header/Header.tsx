import React from "react";
import { Link } from "react-scroll";
import { linkHeader, linkUserProfile } from "src/data/sidebar";
import { IRoute } from "src/types";
import AccountPopover from "../AccountPopover/AccountPopover";
import Notification from "../Notification/Notification";
import "./Header.scss";

const Header = () => {
  const renderSmoothLinks = (links: IRoute[]) => {
    return (
      links.length > 0 &&
      links.map((link: IRoute, index) => (
        <Link
          key={index}
          activeClass="active"
          to={link.href || ""}
          spy={true}
          smooth={true}
          duration={250}
          // containerId="containerElement"
        >
          {link.name}
        </Link>
      ))
    );
  };

  return (
    <div className="header">
      <div className="header-img"></div>
      <div className="header-links">
        {/* <NavLinks links={linkHeader} /> */}
        {renderSmoothLinks(linkHeader)}
      </div>
      <div className="header-profile">
        <Notification type="message" />
        <Notification type="notify" />
        <AccountPopover routes={linkUserProfile} />
      </div>
    </div>
  );
};

export default Header;
