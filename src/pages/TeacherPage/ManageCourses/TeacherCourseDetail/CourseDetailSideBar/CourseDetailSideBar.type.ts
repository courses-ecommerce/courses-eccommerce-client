import React from "react";

export interface SideBarItem {
  sideBarId?: string | number;
  className?: string;
  onClick?: () => void;
  title?: string;
}
export interface CourseDetailSideBarProps {
  defaultSideBarId?: string | number;
  sideBarContent: SideBarItem[];
  getSideBarId?: (sideBarId: number | string) => void;
  children?: React.ReactNode;
}
