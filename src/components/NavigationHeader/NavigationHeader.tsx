import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { linkUserProfile } from "src/data";
import { selectAuthorization } from "src/reducers";
import AccountPopover from "../AccountPopover";
import BoxContent from "../BoxContent";
import CartIcon from "../CartIcon";
import TextContent from "../TextContent";

const HeaderNavigationStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  borderRadius: 0,
  padding: "0 24px",
  background: "white",

  position: "sticky",
  top: 0,
  left: 0,

  zIndex: 3,
};

interface NavigationHeaderProps {
  title?: string;
  userAction?: boolean;
}

export default function NavigationHeader(props: NavigationHeaderProps) {
  const { title, userAction = true } = props;

  const navigate = useNavigate();
  const { isRole } = useSelector(selectAuthorization);

  return (
    <BoxContent.BoxShadow shadow="type2" style={HeaderNavigationStyle}>
      <Box flex={1} display="flex" gap={20} padding="12px 0">
        <span onClick={() => navigate(-1)}>
          <TextContent.NormalText
            content="Quay lại trang trước"
            style={{ cursor: "pointer" }}
          />
        </span>
        {title && <TextContent.NormalText content={title} />}
      </Box>
      {userAction && (
        <Box className="user-actions" display="flex" alignItems="center">
          {isRole === "student" && <CartIcon />}
          <AccountPopover routes={linkUserProfile} />
        </Box>
      )}
    </BoxContent.BoxShadow>
  );
}
