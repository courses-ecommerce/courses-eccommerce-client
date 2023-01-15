import { Button } from "@mui/material";
import React from "react";
import MediaContent from "src/components/MediaContent";
import "./SocialLogin.scss";

const FacebookLogin = () => {
  return (
    <div className="social-login">
      <Button variant="contained" color="secondary">
        <MediaContent.Icon icon="facebook" size={25} color="white" />
        <span>Đăng nhập bằng Facebook</span>
      </Button>
    </div>
  );
};
export default FacebookLogin;
