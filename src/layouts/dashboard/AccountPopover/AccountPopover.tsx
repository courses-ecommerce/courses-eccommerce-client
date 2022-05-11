import {
  Avatar,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useClickOutSide from "src/hooks/useClickOutSide";
import MenuPopover from "src/layouts/dashboard/AccountPopover/MenuPopover/MenuPopover";
import "./AccountPopover.scss";

const MENU_OPTIONS = [
  {
    label: "Trang chủ",
    icon: "eva:home-fill",
    linkTo: "/",
  },
  // {
  //   label: "Thông tin cá nhân",
  //   icon: "eva:person-fill",
  //   linkTo: "#",
  // },
  // {
  //   label: "Giỏ hàng",
  //   icon: "eva:settings-2-fill",
  //   linkTo: "#",
  // },
];

const AccountPopover = () => {
  const { nodeRef, show, setShow } = useClickOutSide();

  return (
    <div className="account-popover">
      <Tooltip title="Thông tin cá nhân">
        <IconButton ref={nodeRef} onClick={() => setShow(true)}>
          <Avatar
            src="https://th.bing.com/th/id/OIP.8t1WtYLAPVB189hu7pCP3gHaHa?pid=ImgDet&rs=1"
            alt="photoURL"
          />
        </IconButton>
      </Tooltip>

      <MenuPopover
        open={Boolean(show)}
        anchorEl={show}
        onClose={() => setShow(false)}
      >
        <div className="account-popover-menu">
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={() => setShow(false)}
            >
              {option.label}
            </MenuItem>
          ))}
        </div>

        <Divider sx={{ borderStyle: "groove" }} />

        <div className="account-popover-handle">
          <Button variant="contained" color="warning">
            Đăng xuất
          </Button>
        </div>
      </MenuPopover>
    </div>
  );
};
export default AccountPopover;
