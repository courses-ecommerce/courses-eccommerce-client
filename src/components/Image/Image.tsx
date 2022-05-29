import classNames from "classnames";
import React, { FC } from "react";
import { defaultIMG } from "src/assets";
import "./Image.scss";

interface ImageProps {
  src?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  borderRadius?: number | string;
}

const Image: FC<ImageProps> = ({
  src,
  width,
  height,
  borderRadius,
  className,
  ...rest
}) => {
  return (
    <img
      className={classNames("image-content", className)}
      src={src || defaultIMG}
      alt="img alt"
      style={{ width, height, borderRadius }}
      {...rest}
    />
  );
};

export default Image;
