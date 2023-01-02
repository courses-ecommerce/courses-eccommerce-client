import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountPopover from "src/components/AccountPopover";
import Icon from "src/components/Icon";
import { linkUserProfile } from "src/data/sidebar";
import useClickOutSide from "src/hooks/useClickOutSide";
import { setToggleStatus } from "src/reducers/toggleSlice";
import "./DashboardHeader.scss";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nodeRef, show, setShow } = useClickOutSide("div");

  useEffect(() => {
    dispatch(setToggleStatus(show));
  }, [dispatch, show]);

  return (
    <div className="dashboard-header">
      <div className="toggle">
        <div className="logo-large-screen" onClick={() => navigate("/")}></div>
        <div
          className="logo-small-screen"
          ref={nodeRef}
          onClick={() => setShow(!show)}
        >
          <Icon icon={!show ? "bars" : "close"} size={20} />
        </div>
      </div>
      <div className="content">
        <AccountPopover routes={linkUserProfile} />
      </div>
    </div>
  );
};
export default DashboardHeader;
