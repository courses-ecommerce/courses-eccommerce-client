import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import usertApi from "src/apis/userApi";
import Loading from "src/components/Loading/Loading";
import ModalContainer from "src/components/ModalContainer";
import { checkGender } from "src/utils";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const [info, setinfo] = useState<any>({});
  const [showModal, setShowModal] = useState(false);

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
            <div className="item">
              <span className="title">Tên:</span>
              <span className="value">{info.fullName}</span>
            </div>
            <div className="item">
              <span className="title">Chức vụ:</span>
              <span className="value">{info.account.role}</span>
            </div>
            <div className="item">
              <span className="title">Email:</span>
              <span className="value">{info.account.email}</span>
            </div>
            <div className="item">
              <span className="title">Giới tính:</span>
              <span className="value">{checkGender(info.gender)}</span>
            </div>
            <div className="item">
              <span className="title">Số điện thoại:</span>
              <span className="value">{info.phone}</span>
            </div>
            <div className="item">
              <span className="title">Ngày sinh:</span>
              <span className="value">{info.birthday}</span>
            </div>
          </div>
        </div>

        <div>
          <Button
            variant="contained"
            color="success"
            onClick={() => setShowModal(true)}
          >
            Thay đổi thông tin
          </Button>
          <ModalContainer
            title="Thông tin người dùng"
            open={showModal}
            onClose={() => setShowModal(false)}
          >
            <div>Đăng nhập</div>
            <div>Đăng nhập</div>
            <div>Đăng nhập</div>
            <div>Đăng nhập</div>
            <div>Đăng nhập</div>
            <div>Đăng nhập</div>
          </ModalContainer>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
