import classNames from "classnames";
import React from "react";
import "./ItemInfo.scss";

interface ItemInfoProps {
  title: string;
  value?: string | number | Array<any>;
  className?: string;
}

const ItemInfo: React.FC<ItemInfoProps> = ({
  title,
  value = "Chưa có thông tin",
  className,
}) => {
  return (
    <div className={classNames("item", className)}>
      <span className="title">{title}</span>
      <span className="value">{value}</span>
    </div>
  );
};
export default ItemInfo;
