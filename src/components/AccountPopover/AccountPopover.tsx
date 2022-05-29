import { Avatar, IconButton, MenuItem, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import useClickOutSide from "src/hooks/useClickOutSide";
import Logout from "src/pages/AuthPage/Logout/Logout";
import { selectAuthorization } from "src/reducers/authSlice";
import { IRoute } from "src/types";
import "./AccountPopover.scss";

interface AccountPopoverProps {
  routes: IRoute[];
}

const AccountPopover: React.FC<AccountPopoverProps> = ({ routes }) => {
  const { nodeRef, show, setShow } = useClickOutSide();

  const { isRole } = useSelector(selectAuthorization);

  return (
    <div className="account-popup">
      <Tooltip title="Thông tin cá nhân">
        <IconButton ref={nodeRef} onClick={() => setShow(!show)}>
          <Avatar
            src="https://th.bing.com/th/id/OIP.8t1WtYLAPVB189hu7pCP3gHaHa?pid=ImgDet&rs=1"
            alt="photoURL"
          />
        </IconButton>
      </Tooltip>

      {show && (
        <div className="account-popover">
          <div className="menu-list">
            {routes?.map((route: IRoute) => (
              <MenuItem
                key={route.name}
                to={
                  route.role === "account"
                    ? isRole
                      ? `/${isRole}/${route.path}`
                      : "/login"
                    : `${route.path}`
                }
                component={RouterLink}
                onClick={() => setShow(false)}
              >
                {route.name}
              </MenuItem>
            ))}
          </div>
          <div className="devider" />
          <div className="btns">
            <Logout />
          </div>
        </div>
      )}
    </div>
  );
};
export default AccountPopover;
