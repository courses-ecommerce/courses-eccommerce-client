import { Box, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import "./InfoContent.scss";

interface InfoContentProps {
  title: string;
  value?: string | number | Array<any>;
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
    <Box maxWidth={250} className={classNames("item", className)}>
      <Typography className="title" component="span">
        {title}
        {hyphen_type}
      </Typography>
      <Typography variant="subtitle2" className="value" component="span">
        {value}
      </Typography>
    </Box>
  );
};
export default InfoContent;
