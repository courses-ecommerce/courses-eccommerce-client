import React, { ReactNode } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./LayoutContainer.scss";

interface LayoutContainerProps {
  children: ReactNode;
  titleShow?: boolean;
  footerShow?: boolean;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({
  children,
  titleShow = true,
  footerShow = true,
}) => {
  return (
    <div className="layout-container">
      <Header titleShow={titleShow} />
      <div className="body-container">{children}</div>
      {footerShow && <Footer />}
    </div>
  );
};

export default LayoutContainer;
