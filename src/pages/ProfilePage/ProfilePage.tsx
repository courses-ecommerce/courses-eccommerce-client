import { Avatar, Box, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userApi from "src/apis/userApi";
import InfoContent from "src/components/InfoContent";
import LoadingContent from "src/components/LoadingContent";
import { selectAuthorization } from "src/reducers";
import { IUser } from "src/types";
import formatDate from "src/utils/formatDate";
import isVerifyCharacter from "src/utils/isVerifyCharacter";
import translateVi from "src/utils/translateVi";
import GoToTeacherPortfolio from "./GoToTeacherPortfolio";
import UpdatePassword from "./UpdatePassword";
import UpdateProfile from "./UpdateProfile";

const ProfilePage = () => {
  document.title = "Thông tin chi tiết cá nhân";

  const { isRole } = useSelector(selectAuthorization);

  const [info, setInfo] = useState<IUser>({});
  const [isUpdate, setIsUpdate] = useState<boolean>(true);

  useEffect(() => {
    isUpdate && getMyInformation();
  }, [isUpdate]);

  const getMyInformation = async () => {
    try {
      const response = await userApi.getMe();
      const { user }: any = response;

      // console.log(user);

      setInfo(user);
    } catch (error) {
      console.log("lỗi r", { error });
    }
  };

  if (_.isEmpty(info)) {
    return <LoadingContent.Loading />;
  }

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" gap={30}>
        <Typography variant="h6" component="span" fontWeight={600}>
          Thông tin chi tiết cá nhân
        </Typography>
        <Box className="profile-page-info" display="flex" gap={80}>
          <Avatar
            alt={info.fullName}
            src={info.avatar}
            sx={{ width: 120, height: 120 }}
          />

          <Box
            className="content"
            display="flex"
            flexDirection="column"
            gap={8}
          >
            <InfoContent hyphen_type=":" title="Tên" value={info.fullName} />
            <InfoContent
              hyphen_type=":"
              title="Chức vụ"
              value={translateVi(info.account?.role)}
            />
            <InfoContent
              hyphen_type=":"
              title="Email"
              value={info.account?.email}
            />
            <InfoContent
              hyphen_type=":"
              title="Giới tính"
              value={isVerifyCharacter.isGender(info.gender)}
            />
            <InfoContent
              hyphen_type=":"
              title="Số điện thoại"
              value={info.phone}
            />
            <InfoContent
              hyphen_type=":"
              title="Ngày sinh"
              value={formatDate.getDate(info.birthday, "dd-MM-yyyy")}
            />
          </Box>
        </Box>

        <Box display="flex" gap={8}>
          <UpdateProfile
            data={info}
            onUpdate={(status) => setIsUpdate(status)}
          />
          <UpdatePassword />
        </Box>

        {isRole === "teacher" && <GoToTeacherPortfolio user_id={info._id} />}
      </Box>
    </React.Fragment>
  );
};

export default ProfilePage;
