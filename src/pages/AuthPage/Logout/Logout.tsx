import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isLogout, selectAuthorization } from "src/reducers/authSlice";

interface LogoutProps {
  style?: React.CSSProperties;
}

const Logout: React.FC<LogoutProps> = ({ style }) => {
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
      <Button
        variant="contained"
        color="warning"
        onClick={handleLogout}
        style={style}
      >
        Đăng xuất
      </Button>
    );
  }
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate("/login")}
      style={style}
    >
      Đăng nhập
    </Button>
  );
};

export default Logout;
