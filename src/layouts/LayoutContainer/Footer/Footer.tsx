import React from "react";
import { Link } from "react-router-dom";
import { listFooter } from "src/data/mainPageInfo";
import "./Footer.scss";

interface FooterProps {
  info?: any;
}

const Footer: React.FC<FooterProps> = ({ info = listFooter }) => {
  return (
    <div className="footer">
      <h3>Thông tin liên hệ</h3>
      <div>
        <div className="footer-introduction">
          {info.communication.map((communicate: any, index: number) => (
            <Link to={communicate.href} key={index}>
              {communicate.name}
            </Link>
          ))}
        </div>
        <div className="footer-contact">
          {info.contact.map((communicate: any, index: number) => (
            <Link to={communicate.href} key={index}>
              {communicate.name}
            </Link>
          ))}
        </div>
        <div className="footer-contact">
          {info.contact.map((communicate: any, index: number) => (
            <Link to={communicate.href} key={index}>
              {communicate.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Footer;
