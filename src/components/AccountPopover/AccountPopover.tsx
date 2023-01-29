import { Avatar, IconButton, MenuItem, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { avatarNone } from "src/assets";
import { useClickOutSide } from "src/hooks";
import Logout from "src/pages/AuthPage/Logout";
import { selectAuthorization } from "src/reducers";
import { Router } from "src/types";
import "./AccountPopover.scss";

interface AccountPopoverProps {
  routes: Router[];
}

const AccountPopover: React.FC<AccountPopoverProps> = ({ routes }) => {
  const { nodeRef, show, setShow } = useClickOutSide();

  const { isRole, userInfo } = useSelector(selectAuthorization);

  return (
    <div className="account-popup">
      <Tooltip title="Thông tin cá nhân">
        <IconButton ref={nodeRef} onClick={() => setShow(!show)}>
          <Avatar src={userInfo.avatar || avatarNone} alt="avatar user" />
        </IconButton>
      </Tooltip>

      {show && (
        <div className="account-popover">
          <div className="menu-list">
            {routes.map(
              (route: Router) =>
                (route.role === isRole || route.role === "user") && (
                  <MenuItem
                    key={route.name}
                    to={route.path}
                    component={RouterLink}
                    onClick={() => setShow(false)}
                  >
                    {route.name}
                  </MenuItem>
                )
            )}
          </div>
          <div className="divider" />
          <div className="btns">
            <Logout />
          </div>
        </div>
      )}
    </div>
  );
};
export default AccountPopover;
