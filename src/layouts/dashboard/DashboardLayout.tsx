import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashBoardHeader/DashboardHeader";

import DashboardSidebar from "./DashboardSlidebar/DashboardSidebar";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* dashboard menu */}
      <DashboardHeader />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />

      {/* content here */}

      <div>
        <Outlet />
        {/* dfasfsd */}
      </div>
    </>
  );
};

export default DashboardLayout;
