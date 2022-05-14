import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import useClickOutSide from "src/hooks/useClickOutSide";

import { IMessage, INotify } from "src/types";
import MenuPopover from "../MenuPopover/MenuPopover";
import Icon from "../Icon/Icon";

interface NotificationProps {
  type: "notify" | "message";
  sticky?: boolean;
  notifications?: INotify[];
  messages?: IMessage[];
}

const Notification: React.FC<NotificationProps> = ({
  type,
  notifications,
  messages,
  sticky = false,
}) => {
  const { nodeRef, show, setShow } = useClickOutSide();
  return (
    <div>
      {type === "notify" ? (
        <div>
          <Tooltip title="Thông báo">
            <IconButton ref={nodeRef} onClick={() => setShow(true)}>
              <Icon icon="envelope-open" size={28} color="#3265b7" />
            </IconButton>
          </Tooltip>
          <MenuPopover
            open={Boolean(show)}
            anchorEl={show}
            onClose={() => setShow(false)}
          >
            <div>Hệ thống sẽ cập nhật thêm chức năng notify</div>
          </MenuPopover>
        </div>
      ) : (
        <div>
          <Tooltip title="Tin nhắn">
            <IconButton ref={nodeRef} onClick={() => setShow(true)}>
              <Icon icon="commenting-o" size={28} color="#3265b7" />
            </IconButton>
          </Tooltip>
          <MenuPopover
            open={Boolean(show)}
            anchorEl={show}
            onClose={() => setShow(false)}
          >
            <div>Hệ thống sẽ cập nhật thêm chức năng message</div>
          </MenuPopover>
        </div>
      )}
    </div>
  );
};
export default Notification;
