import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { linkUserProfile } from "src/data/sidebar";
import { selectAuthorization } from "src/reducers/authSlice";
import AccountPopover from "../AccountPopover/AccountPopover";
import CartIcon from "../CartIcon/CartIcon";
import "./NavigationHeader.scss";

export default function NavigationHeader() {
  const navigate = useNavigate();
  const { isRole } = useSelector(selectAuthorization);

  return (
    <div className="navs">
      <div className="navLinks">
        <span onClick={() => navigate(-1)}>Quay lại trang trước</span>
        {/* <Link to="/"></Link> */}
      </div>
      <div className="extraLinks">
        {isRole === "student" && <CartIcon />}
        <AccountPopover routes={linkUserProfile} />
      </div>
    </div>
  );
}
