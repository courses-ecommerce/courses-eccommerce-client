import React from "react";
import { Link } from "react-router-dom";
import "./AccessDenied.scss";

const AccessDenied = () => {
  return (
    <div className="access-denied-page">
      <Link to="/">Quay lại trang chủ?</Link>
    </div>
  );
};

export default AccessDenied;
