// material
import { Popover } from "@mui/material";

// ----------------------------------------------------------------------

interface MenuPopoverProps {
  children: any;
  open?: boolean;
  anchorEl?: boolean | null;
  sx?: any;
  onClose?: Function;
  other?: any;
}

const MenuPopover: React.FC<MenuPopoverProps> = ({
  children,
  sx,
  open = false,
  anchorEl = false,
  onClose,
  ...other
}) => {
  return (
    <Popover
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
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
