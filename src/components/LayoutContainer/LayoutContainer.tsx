import React, { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

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
    <div>
      <Header titleShow={titleShow} />
      <div>{children}</div>
      {footerShow && <Footer />}
    </div>
  );
};

export default LayoutContainer;
