import React from "react";
import { linkHeader, linkUserProfile } from "src/data/sidebar";
import AccountPopover from "../AccountPopover/AccountPopover";
import NavLinks from "../NavLinks/NavLinks";
import Notification from "../Notification/Notification";

import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header-img"></div>
      <div className="header-links">
        <NavLinks links={linkHeader} />
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
