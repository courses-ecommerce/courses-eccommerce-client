import { Divider, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "src/components/Icon/Icon";
import "./AuthLayout.scss";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-title">
          <Tooltip title="Quay lại trang chủ">
            <span className="icon" onClick={() => navigate("/")}>
              <Icon icon="home" size={28} />
            </span>
          </Tooltip>
          <span>{title}</span>
        </div>
        <Divider />
        <div className="auth-form">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
