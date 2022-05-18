import React, { ReactNode } from "react";
import { Element } from "react-scroll";
import Header from "../Header/Header";

interface LayoutContainerProps {
  children?: ReactNode;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>
        {/* <Element name="test7" className="element" id="containerElement"> */}
        <Element name="home" style={{ height: "800px", background: "red" }}>
          Trang home nè
        </Element>
        <Element name="course" style={{ height: "800px", background: "black" }}>
          Trang course
        </Element>
        {/* </Element> */}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default LayoutContainer;
