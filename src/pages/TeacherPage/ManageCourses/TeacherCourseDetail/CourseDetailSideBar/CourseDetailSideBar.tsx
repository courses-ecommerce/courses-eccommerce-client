import React, { useEffect, useState } from "react";
import TextContent from "src/components/TextContent";
import "./CourseDetailSideBar.scss";
import { CourseDetailSideBarProps } from "./CourseDetailSideBar.type";

const CourseDetailSideBar: React.FC<CourseDetailSideBarProps> = ({
  defaultSideBarId = 0,
  sideBarContent,
  getSideBarId,
  children,
}) => {
  const [navBar, setNavbar] = useState(defaultSideBarId);

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
