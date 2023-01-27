import React from "react";

export interface SideBarItem {
  sideBarId?: string | number;
  className?: string;
  onClick?: () => void;
  title?: string;
}
export interface CourseDetailSideBarProps {
  sideBarContent: SideBarItem[];
  getSideBarId?: (sideBarId: number | string) => void;
  children?: React.ReactNode;
}
