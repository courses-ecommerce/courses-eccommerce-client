import { Avatar } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import usertApi from "src/apis/userApi";
import Loading from "src/components/Loading/Loading";
import { IUser } from "src/types";
import { checkGender } from "src/utils";
import formatDate from "src/utils/formatDay";
import ItemInfo from "../../components/ItemInfo/ItemInfo";
import UpdatePassword from "./UpdatePassword/UpdatePassword";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import "./ProfilePage.scss";

const ProfilePage = () => {
  document.title = "Thông tin chi tiết cá nhân";
  const [info, setinfo] = useState<IUser>({});
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    getMe();
  }, [isUpdate]);

  const getMe = async () => {
    try {
      const response = await usertApi.getMe();
      const { user }: any = response;
      // console.log(user);

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
            <ItemInfo title="Tên:" value={info.fullName} />
            <ItemInfo title="Chức vụ:" value={info.account?.role} />
            <ItemInfo title="Email:" value={info.account?.email} />
            <ItemInfo title="Giới tính:" value={checkGender(info.gender)} />
            <ItemInfo title="Số điện thoại:" value={info.phone} />
            <ItemInfo
              title="Ngày sinh:"
              value={formatDate(info.birthday, "dd-MM-yyyy")}
            />
          </div>
        </div>

        <div className="btns">
          <UpdateProfile
            data={info}
            onUpdate={(status) => setIsUpdate(status)}
          />
          <UpdatePassword />
        </div>
      </div>
    );
  }
};

export default ProfilePage;
