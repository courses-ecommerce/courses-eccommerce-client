import { Avatar, Tooltip } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAuthorization } from "src/reducers/authSlice";
import { translateVi } from "src/utils";
import "./AvatarUser.scss";

const AvatarUser = () => {
  const { isRole } = useSelector(selectAuthorization);

  return (
    <Tooltip title="Trang chủ">
      <Link className="user" to="/">
        <Avatar
          className="user-avatar"
          src="https://th.bing.com/th/id/OIP.8t1WtYLAPVB189hu7pCP3gHaHa?pid=ImgDet&rs=1"
          alt="photoURL"
        />
        <div className="user-info">
          <span className="name">Nguyễn Thế Luân</span>

          <span className="role">
            Chức vụ:
            {isRole && <span> {translateVi(isRole)}</span>}
          </span>
        </div>
      </Link>
    </Tooltip>
  );
};

export default AvatarUser;
