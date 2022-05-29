import { Dialog, Divider } from "@mui/material";

import * as React from "react";
import Icon from "../Icon/Icon";
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
  width,
  height,
  children,
  title,
  onClose,
  open = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "max-content",
          maxHeight: "fit-content",
        },
      }}
    >
      <div className="modal-container" style={{ width, height }}>
        <div className="modal-container-header">
          {title && <span className="title">{title}</span>}
          <Icon
            className="icon"
            icon="close"
            size={20}
            color=""
            onClick={onClose}
          />
        </div>
        <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
        {children}
      </div>
    </Dialog>
  );
};

export default ModalContainer;
