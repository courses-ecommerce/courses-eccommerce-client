import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";
import { linkHeader, linkUserProfile } from "src/data/sidebar";
import { selectAuthorization } from "src/reducers/authSlice";
import { IRoute } from "src/types";
import AccountPopover from "../AccountPopover/AccountPopover";
import CartIcon from "../CartIcon/CartIcon";
import Notification from "../Notification/Notification";
import "./Header.scss";

const Header = () => {
  const { isRole } = useSelector(selectAuthorization);

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
          duration={400}
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
        <Notification type="message" unRead_total={5} />
        {/* <Notification type="notify" /> */}
        {isRole === "student" && <CartIcon />}
        <AccountPopover routes={linkUserProfile} />
      </div>
    </div>
  );
};

export default Header;
