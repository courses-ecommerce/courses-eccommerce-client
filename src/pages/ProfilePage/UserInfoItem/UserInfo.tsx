import React from "react";

interface UserInfoItemProps {
  title: string;
  value?: string;
}

const UserInfoItem: React.FC<UserInfoItemProps> = ({
  title,
  value = "Chưa có thông tin",
}) => {
  return (
    <div className="item">
      <span className="title">{title}</span>
      <span className="value">{value}</span>
    </div>
  );
};
export default UserInfoItem;
