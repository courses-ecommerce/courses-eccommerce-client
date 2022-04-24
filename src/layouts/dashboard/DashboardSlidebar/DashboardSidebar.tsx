import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
import useResponsive from "src/hooks/useResponsive";
import ContentInfo from "./ContentInfo/ContentInfo";

import "./DashboardSidebar.scss";

const DRAWER_WIDTH = 280;

interface DashboardSidebarProps {
  isOpenSidebar: boolean;
  onCloseSidebar: Function;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpenSidebar,
  onCloseSidebar,
}) => {
  return (
    <Drawer
      open
      variant="persistent"
      PaperProps={{
        sx: {
          width: DRAWER_WIDTH,
          bgcolor: "background.default",
          borderRightStyle: "dashed",
        },
      }}
    >
      <ContentInfo />
    </Drawer>
  );
};

export default DashboardSidebar;
