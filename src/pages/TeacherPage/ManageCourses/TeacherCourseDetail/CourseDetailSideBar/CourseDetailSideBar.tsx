import { CourseDetailSideBarProps } from "./CourseDetailSideBar.type";
import React, { useEffect, useState } from "react";
import "./CourseDetailSideBar.scss";
import TextContent from "src/components/TextContent";

const CourseDetailSideBar: React.FC<CourseDetailSideBarProps> = ({
  sideBarContent,
  getSideBarId,
  children,
}) => {
  const [navBar, setNavbar] = useState(0);

  useEffect(() => {
    getSideBarId?.(navBar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navBar]);

  return (
    <div className="sidebar">
      <TextContent.NormalText content="Danh sách các mục" />
      {sideBarContent.map((sideBarItem, index) => (
        <p
          className={sideBarItem.sideBarId === navBar ? "active" : ""}
          onClick={() => setNavbar(sideBarItem.sideBarId as number)}
          key={index}
        >
          {sideBarItem.title}
        </p>
      ))}
      <React.Fragment>{children}</React.Fragment>
    </div>
  );
};

export default CourseDetailSideBar;
