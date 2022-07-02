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
  // console.log("receiver: ", receiver);
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
            userInfo._id !== message?.sender && !message?.seen
              ? "unseen"
              : "seen"
          )}
        >
          {userInfo._id === message?.sender ? "Bạn: " : ""}
          {message?.text}
        </span>
      </div>
    </div>
  );
};
export default MessageUser;
