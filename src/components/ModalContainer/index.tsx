import { Dialog, Divider } from "@mui/material";

import * as React from "react";
import Icon from "../Icon";
import "./ModalContainer.scss";

interface ModalProps {
  width?: number;
  height?: number;
  children: React.ReactNode;
  title?: string;
  open?: boolean;
  onClose?: () => void;
}

const ModalContainer: React.FC<ModalProps> = ({
  width = 900,
  height,
  children,
  title = "Chưa đặt tên tiêu đề",
  onClose,
  open = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      sx={{
        "& .MuiPaper-root": {
          width,
        },
      }}
    >
      <div className="modal-container" style={{ height }}>
        <div className="modal-container-header">
          <span className="title">{title}</span>
          <Icon
            className="icon"
            icon="close"
            size={20}
            color=""
            onClick={onClose}
          />
        </div>
        <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
        <div className="modal-container-children">{children}</div>
      </div>
    </Dialog>
  );
};

export default ModalContainer;
