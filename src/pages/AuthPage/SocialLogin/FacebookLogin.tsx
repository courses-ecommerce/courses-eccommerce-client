import { Button } from "@mui/material";
import React from "react";
import Icon from "src/components/Icon/Icon";
import "./SocialLogin.scss";

const FacebookLogin = () => {
  return (
    <div className="social-login">
      <Button variant="contained" color="secondary">
        <Icon icon="facebook" size={25} color="white" />
        <span>Đăng nhập bằng Facebook</span>
      </Button>
    </div>
  );
};
export default FacebookLogin;
