import React, { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface LayoutContainerProps {
  children: ReactNode;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutContainer;
