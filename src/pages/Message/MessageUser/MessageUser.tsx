import { Avatar } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { selectAuthorization } from "src/reducers/authSlice";
import { IUser } from "src/types";
import { IMessage } from "src/types/chat";
import "./MessageUser.scss";

interface MessageUserProps {
  receiver?: IUser;
  message?: IMessage;
  onClick?: () => void;
}

const MessageUser: React.FC<MessageUserProps> = ({
  receiver,
  message,
  onClick,
}) => {
  // console.log("message: ", message);
  const { userInfo } = useSelector(selectAuthorization);

  return (
    <div className="user-item" onClick={onClick}>
      <Avatar
        className="avatar"
        alt={receiver?.fullName}
        src={receiver?.avatar}
      />
      <div className="user-info">
        <span className="name">{receiver?.fullName}</span>
        <span
          className={classNames(
            "last-message",
            !message?.seen ? "seen" : "unseen"
          )}
        >
          {userInfo._id === message?._id ? "Bạn: " : ""}
          {message?.text}
        </span>
      </div>
    </div>
  );
};
export default MessageUser;
