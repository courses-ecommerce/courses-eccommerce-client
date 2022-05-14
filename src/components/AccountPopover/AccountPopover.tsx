import { Avatar, Divider, IconButton, MenuItem, Tooltip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useClickOutSide from "src/hooks/useClickOutSide";
import Logout from "src/pages/AuthPage/Logout/Logout";
import { IRoute } from "src/types";
import MenuPopover from "../MenuPopover/MenuPopover";
import "./AccountPopover.scss";

interface AccountPopoverProps {
  routes: IRoute[];
}

const AccountPopover: React.FC<AccountPopoverProps> = ({ routes }) => {
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
          {routes?.map((route: IRoute) => (
            <MenuItem
              key={route.name}
              to={route.path}
              component={RouterLink}
              onClick={() => setShow(false)}
            >
              {route.name}
            </MenuItem>
          ))}
        </div>

        <Divider sx={{ borderStyle: "groove" }} />

        <div className="account-popover-handle">
          <Logout />
        </div>
      </MenuPopover>
    </div>
  );
};
export default AccountPopover;
