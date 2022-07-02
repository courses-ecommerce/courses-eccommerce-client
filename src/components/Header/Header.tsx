import { Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";
import { linkHeader, linkUserProfile } from "src/data/sidebar";
import useClickOutSide from "src/hooks/useClickOutSide";
import Logout from "src/pages/AuthPage/Logout/Logout";
import { selectAuthorization } from "src/reducers/authSlice";
import { IRoute } from "src/types";
import AccountPopover from "../AccountPopover/AccountPopover";
import CartIcon from "../CartIcon/CartIcon";
import Icon from "../Icon/Icon";
import Notification from "../Notification/Notification";
import "./Header.scss";

const Header = () => {
  const { isRole } = useSelector(selectAuthorization);

  const { nodeRef, show, setShow } = useClickOutSide();

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
    <>
      {/* for website */}
      <div className="header">
        <div className="header-img"></div>

        <div className="header-links">
          {/* <NavLinks links={linkHeader} /> */}
          {renderSmoothLinks(linkHeader)}
        </div>
        <div className="header-profile">
          <Notification type="message" />
          <Notification type="notify" />
          {isRole === "student" && <CartIcon />}
          <AccountPopover routes={linkUserProfile} />
        </div>
      </div>
      {/* for mobile */}
      <div className="header-mobile">
        <div
          className="icon-toggle"
          ref={nodeRef}
          onClick={() => setShow(!show)}
        >
          {!show ? (
            <Icon icon="align-justify" size={30} />
          ) : (
            <Icon icon="close" size={30} />
          )}
        </div>

        {show && (
          <div className="header-mobile-links">
            {renderSmoothLinks(linkHeader)}
            <Divider />
            <Logout />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
