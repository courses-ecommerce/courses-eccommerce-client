import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isLogout, selectAuthorization } from "src/reducers/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector(selectAuthorization);

  const handleLogout = () => {
    dispatch(isLogout());

    toast.success("Đăng xuất thành công, chúc bạn có 1 ngày tốt lành ^^", {
      position: "bottom-right",
    });
    localStorage.clear();
    navigate("/login");
  };

  if (isAuth) {
    return (
      <Button variant="contained" color="warning" onClick={handleLogout}>
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
