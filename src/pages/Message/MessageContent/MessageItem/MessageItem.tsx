import { Avatar, Tooltip } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { selectAuthorization } from "src/reducers/authSlice";
import { IMessage } from "src/types/chat";
import formatDate from "src/utils/formatDay";
import "./MessageItem.scss";

interface MessageItemProps {
  data?: IMessage;
}

const MessageItem: React.FC<MessageItemProps> = ({ data }) => {
  const { userInfo } = useSelector(selectAuthorization);

  console.log("thông tin message item", data);
  return (
    <div
      className={classNames(
        "chat-message-item",
        userInfo._id === data?.sender?._id ? "me" : "other"
      )}
    >
      {userInfo._id !== data?.sender?._id && (
        <Tooltip title={data?.sender?.fullName || ""}>
          <Avatar
            alt={data?.sender?.fullName}
            src={data?.sender?.avatar}
            sx={{ width: 40, height: 40 }}
          />
        </Tooltip>
      )}
      <Tooltip title={formatDate(data?.createdAt, "dd-MM-yyyy HH:mm:ss")}>
        <span className="chat-message-text">{data?.text}</span>
      </Tooltip>
    </div>
  );
};
export default MessageItem;
