import React from "react";
import { useNavigate } from "react-router-dom";
import { linkUserProfile } from "src/data/sidebar";
import AccountPopover from "../AccountPopover/AccountPopover";
import "./NavigationHeader.scss";

export default function NavigationHeader() {
  const navigate = useNavigate();
  return (
    <div className="navs">
      <div className="navLinks">
        <span onClick={() => navigate(-1)}>Quay lại trang trước</span>
        {/* <Link to="/"></Link> */}
      </div>
      <AccountPopover routes={linkUserProfile} />
    </div>
  );
}
