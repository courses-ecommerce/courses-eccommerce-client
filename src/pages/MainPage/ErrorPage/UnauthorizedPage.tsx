import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLogout } from "src/reducers/authSlice";
import "./ErrorPage.scss";

const UnauthorizedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    clearData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearData = () => {
    localStorage.clear();
    dispatch(isLogout());
  };

  return (
    <div className="error-page">
      <div className="warning">
        <span>Cảnh báo đăng nhập</span>
        <p>
          Tài khoản của bạn đã bị đăng nhập từ một thiết bị khác. Nếu đó là bạn,
          hay bỏ qua thông báo này. Còn nếu không phải là bạn, xin vui lòng thay
          đổi mật khẩu.
          <br />
          Chỉ có thể đăng nhập duy nhất trên 1 thiết bị.
        </p>
      </div>
      <div className="btns">
        <Button variant="contained">
          <Link to="/">Quay về trang chủ?</Link>
        </Button>
        <Button variant="text">
          <Link to="/login">Quay trở lại đăng nhập?</Link>
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
