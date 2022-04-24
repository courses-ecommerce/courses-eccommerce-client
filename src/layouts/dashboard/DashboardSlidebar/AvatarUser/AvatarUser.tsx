import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./AvatarUser.scss";

const AvatarUser = () => {
  return (
    <Link className="user" to="#">
      <Avatar
        className="user-avatar"
        src="https://th.bing.com/th/id/OIP.8t1WtYLAPVB189hu7pCP3gHaHa?pid=ImgDet&rs=1"
        alt="photoURL"
      />
      <div className="user-info">
        <span className="name">Nguyễn Thế Luân</span>

        <span className="role">
          Chức vụ:
          <span> Admin</span>
        </span>
      </div>
    </Link>
  );
};

export default AvatarUser;
