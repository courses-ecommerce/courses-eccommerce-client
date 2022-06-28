import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationHeader.scss";

export default function NavigationHeader() {
  const navigate = useNavigate();
  return (
    <div className="navs">
      <span onClick={() => navigate(-1)}>Quay lại trang trước</span>
      <Link to="/"></Link>
    </div>
  );
}
