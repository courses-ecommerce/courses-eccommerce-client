import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";
const NotFound = () => {
  return (
    <div className="notfound-page">
      <Link to="/">Quay lại trang chủ?</Link>
    </div>
  );
};
export default NotFound;
