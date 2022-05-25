// material
import { Popover } from "@mui/material";
import React from "react";
import "./MenuPopover.scss";
interface MenuPopoverProps {
  children: any;
  open?: boolean;
  // anchorEl?: boolean;
  sx?: any;
  onClose?: Function;
  other?: any;
}

const MenuPopover: React.FC<MenuPopoverProps> = ({
  children,
  sx,
  open = false,
  // anchorEl = false,
  onClose,
  ...other
}) => {
  return (
    <Popover
      // anchorEl={anchorEl}
      open={open}
      anchorOrigin={{
        vertical: 70,
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          p: 1,
          width: 180,
          overflow: "inherit",
          ...sx,
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  );
};

export default MenuPopover;
