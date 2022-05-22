import { Dialog } from "@mui/material";

import * as React from "react";
import Icon from "../Icon/Icon";
import "./ModalContainer.scss";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  onClose?: () => void;
}

const ModalContainer: React.FC<ModalProps> = ({
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
        },
      }}
    >
      <div className="modal-container">
        <div className="modal-container-header">
          {title && <span className="title">{title}</span>}
          <Icon
            className="icon"
            icon="close"
            size={15}
            color=""
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </Dialog>
  );
};

export default ModalContainer;
