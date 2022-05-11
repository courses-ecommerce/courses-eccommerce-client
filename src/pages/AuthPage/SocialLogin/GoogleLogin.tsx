import { Button } from "@mui/material";
import React from "react";
import Icon from "src/components/Icon/Icon";
import "./SocialLogin.scss";

const GoogleLogin = () => {
  return (
    <div className="social-login">
      <Button variant="contained" color="inherit">
        <Icon icon="google" size={25} />
        <span>Đăng nhập bằng Google</span>
      </Button>
    </div>
  );
};

export default GoogleLogin;
