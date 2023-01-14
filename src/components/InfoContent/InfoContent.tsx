import { Box, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import "./InfoContent.scss";

interface InfoContentProps {
  title: string;
  value?: string | number;
  hyphen_type?: string;
  className?: string;
}

const InfoContent: React.FC<InfoContentProps> = ({
  title,
  value = "Chưa có thông tin",
  className,
  hyphen_type = "",
}) => {
  return (
    <Box className={classNames("item", className)}>
      <Typography
        className="title"
        component="span"
        variant="body2"
        fontWeight={600}
      >
        {title}
        {hyphen_type}
      </Typography>
      <Typography
        variant="subtitle2"
        className="value"
        component="span"
        fontWeight={400}
      >
        {value}
      </Typography>
    </Box>
  );
};
export default InfoContent;
