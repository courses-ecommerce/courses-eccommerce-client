import React from "react";
import iconSet from "./selection.json";
import IcomoonReact from "icomoon-react";

interface IconProps {
  icon: string;
  color?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = (props) => {
  const { color, size, icon, className, ...rest } = props;
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      color={color ?? "#444"}
      size={size ?? 100}
      icon={icon}
      {...rest}
    />
  );
};

export default Icon;
