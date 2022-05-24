import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import usertApi from "src/apis/userApi";
import Loading from "src/components/Loading/Loading";
import { IUser } from "src/types";
import { checkGender } from "src/utils";
import "./ProfilePage.scss";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import { default as UserInfoItem } from "./UserInfoItem/UserInfo";

const ProfilePage = () => {
  const [info, setinfo] = useState<IUser>({});

  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const response = await usertApi.getMe();

      // console.log("dsfds", response);
      const { user }: any = response;
      setinfo(user);
    } catch (error) {
      console.log("lỗi r", { error });
    }
  };
  if (Object.keys(info).length === 0 && info.constructor === Object) {
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
            <UserInfoItem title="Ngày sinh:" value={info.birthday} />
          </div>
        </div>

        <div>
          <UpdateProfile data={info} />
        </div>
      </div>
    );
  }
};

export default ProfilePage;
