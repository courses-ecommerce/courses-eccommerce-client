import React from "react";
import "./AuthLayout.scss";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-title">
          <span>{title}</span>
        </div>
        <div className="auth-form">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
