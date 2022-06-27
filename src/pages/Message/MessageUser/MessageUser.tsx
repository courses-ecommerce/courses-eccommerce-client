import { Avatar } from "@mui/material";
import React from "react";
import { avatarNone } from "src/assets";
import "./MessageUser.scss";

interface MessageUserProps {
  avatar?: string;
  name?: string;
  status?: string;
}

const MessageUser: React.FC<MessageUserProps> = ({
  avatar = avatarNone,
  name = "No Name",
  status = "Đang ngủ",
}) => {
  return (
    <div className="user-item">
      <Avatar className="avatar" alt="Remy Sharp" src={avatar} />
      <div className="user-info">
        <span className="name">{name}</span>
        <span className="status">{status}</span>
      </div>
    </div>
  );
};
export default MessageUser;
