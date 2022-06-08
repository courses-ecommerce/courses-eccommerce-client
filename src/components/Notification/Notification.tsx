import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import useClickOutSide from "src/hooks/useClickOutSide";
import Icon from "../Icon/Icon";
import "./Notification.scss";

interface NotificationProps {
  type: "notify" | "message";
  sticky?: boolean;

  unRead_total?: number;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  sticky = false,
  unRead_total = 0,
}) => {
  const { nodeRef, show, setShow } = useClickOutSide("p");
  return (
    <>
      {type === "notify" ? (
        <div className="notification">
          <Tooltip title="Thông báo">
            <IconButton ref={nodeRef} onClick={() => setShow(!show)}>
              <Icon icon="envelope-open" size={28} color="#3265b7" />
            </IconButton>
          </Tooltip>
          <span className="unread_amount">9</span>

          {show && (
            <p className="notification-popover">
              Hệ thống sẽ cập nhật thêm chức năng notify
            </p>
          )}
        </div>
      ) : (
        <div className="notification">
          <Tooltip title="Tin nhắn">
            <IconButton ref={nodeRef} onClick={() => setShow(!show)}>
              <Icon icon="commenting-o" size={28} color="#3265b7" />
            </IconButton>
          </Tooltip>
          {unRead_total > 0 && (
            <span className="unread_amount">{unRead_total}</span>
          )}
          {show && (
            <p className="notification-popover">
              Hệ thống sẽ cập nhật thêm chức năng message
            </p>
          )}
        </div>
      )}
    </>
  );
};
export default Notification;
