import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import usertApi from "src/apis/userApi";

const ProfilePage = () => {
  const [info, setinfo] = useState<any>({});

  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const response = await usertApi.getMe();

      console.log("dsfds", response);
      const { user }: any = response;
      setinfo(user);
    } catch (error) {
      console.log("lỗi r", { error });
    }
  };
  if (Object.keys(info).length === 0 && info.constructor === Object) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h3>Thông tin chi tiết cá nhân</h3>
        <div>
          <Avatar alt={info.fullName} src={info.avatar} />
          <div>
            <span>Tên</span>
            <span>{info.fullName}</span>
          </div>
          <div>
            <span>Chức vụ</span>
            <span>{info.account.role}</span>
          </div>
          <div>
            <span>Email</span>
            <span>{info.account.email}</span>
          </div>
          <div>
            <span>Giới tính</span>
            <span>{info.gender}</span>
          </div>
          <div>
            <span>Số điện thoại</span>
            <span>{info.phone}</span>
          </div>
          <div>
            <span>Ngày sinh</span>
            <span>{info.birthday}</span>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
