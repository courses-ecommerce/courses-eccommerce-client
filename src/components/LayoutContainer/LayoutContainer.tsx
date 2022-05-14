import React, { ReactNode } from "react";
import Header from "../Header/Header";

interface LayoutContainerProps {
  children: ReactNode;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default LayoutContainer;
