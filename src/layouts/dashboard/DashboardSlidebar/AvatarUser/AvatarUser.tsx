import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAuthorization } from "src/reducers/authSlice";
import "./AvatarUser.scss";

const AvatarUser = () => {
  const { isRole } = useSelector(selectAuthorization);

  return (
    <Link className="user" to={`/${isRole}/dashboard`}>
      <Avatar
        className="user-avatar"
        src="https://th.bing.com/th/id/OIP.8t1WtYLAPVB189hu7pCP3gHaHa?pid=ImgDet&rs=1"
        alt="photoURL"
      />
      <div className="user-info">
        <span className="name">Nguyễn Thế Luân</span>

        <span className="role">
          Chức vụ:
          {/* {isRole && <span>{isRole}</span>} */}
          <span> admin</span>
        </span>
      </div>
    </Link>
  );
};

export default AvatarUser;
