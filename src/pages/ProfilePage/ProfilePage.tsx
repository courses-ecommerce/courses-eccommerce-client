import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import usertApi from "src/apis/userApi";
import Loading from "src/components/Loading/Loading";
import { IUser } from "src/types";
import { checkGender } from "src/utils";
import formatDate from "src/utils/formatDay";
import "./ProfilePage.scss";
import UpdatePassword from "./UpdatePassword/UpdatePassword";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import UserInfoItem from "./UserInfoItem/UserInfo";
import _ from "lodash";
const ProfilePage = () => {
  const [info, setinfo] = useState<IUser>({});

  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const response = await usertApi.getMe();
      const { user }: any = response;
      console.log(user);

      setinfo(user);
    } catch (error) {
      console.log("lỗi r", { error });
    }
  };
  if (_.isEmpty(info)) {
    return <Loading />;
  } else {
    return (
      <div className="profile-page">
        <h3 className="profile-page-title">Thông tin chi tiết cá nhân</h3>
        <div className="profile-page-info">
          <div className="avatar">
            <Avatar
              alt={info.fullName}
              src={info.avatar}
              sx={{ width: 120, height: 120 }}
            />
          </div>
          <div className="content">
            <UserInfoItem title="Tên:" value={info.fullName} />
            <UserInfoItem title="Chức vụ:" value={info.account?.role} />
            <UserInfoItem title="Email:" value={info.account?.email} />
            <UserInfoItem title="Giới tính:" value={checkGender(info.gender)} />
            <UserInfoItem title="Số điện thoại:" value={info.phone} />
            <UserInfoItem
              title="Ngày sinh:"
              value={formatDate(info.birthday, "dd-MM-yyyy")}
            />
          </div>
        </div>

        <div className="btns">
          <UpdateProfile data={info} />
          <UpdatePassword />
        </div>
      </div>
    );
  }
};

export default ProfilePage;
