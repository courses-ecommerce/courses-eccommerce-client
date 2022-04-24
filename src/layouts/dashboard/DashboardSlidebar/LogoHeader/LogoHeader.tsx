// @mui
import React from "react";
import "./LogoHeader.scss";

interface LogoProps {
  disabledLink?: boolean;
}

const LogoHeader: React.FC<LogoProps> = ({ disabledLink = false }) => {
  if (disabledLink) {
    return (
      <div className="logo-disable">
        <img
          src="https://i.pinimg.com/originals/7f/8e/79/7f8e798aac0af47ea7a2111463716094.jpg"
          alt="avt"
        />
      </div>
    );
  }

  return (
    <div className="logo-active">
      <img
        src="https://i.pinimg.com/originals/7f/8e/79/7f8e798aac0af47ea7a2111463716094.jpg"
        alt="avt"
      />
    </div>
  );
};

export default LogoHeader;
