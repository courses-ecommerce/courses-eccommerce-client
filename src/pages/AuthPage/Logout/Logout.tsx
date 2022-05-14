import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthorization } from "src/reducers/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector(selectAuthorization);

  if (isAuth) {
    return (
      <Button variant="contained" color="warning">
        Đăng xuất
      </Button>
    );
  }
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate("/login")}
    >
      Đăng nhập
    </Button>
  );
};

export default Logout;
