import { Avatar, Button, Divider } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "src/apis/userApi";
import Loading from "src/components/Loading/Loading";
import { selectAuthorization } from "src/reducers/authSlice";
import { IUser } from "src/types";
import { checkGender, translateVi } from "src/utils";
import formatDate from "src/utils/formatDay";
import ItemInfo from "../../components/ItemInfo/ItemInfo";
import UpdateDescription from "./UpdateDescription/UpdateDescription";
import UpdatePassword from "./UpdatePassword/UpdatePassword";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import "./ProfilePage.scss";

const ProfilePage = () => {
  document.title = "Thông tin chi tiết cá nhân";

  const { isRole } = useSelector(selectAuthorization);

  const [info, setInfo] = useState<IUser>({});
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getMe();
  }, [isUpdate]);

  const getMe = async () => {
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
    return <Loading />;
  } else {
    return (
      <>
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
              <ItemInfo
                title="Chức vụ:"
                value={translateVi(info.account?.role)}
              />
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
          {isRole === "teacher" && (
            <>
              <Divider />
              <h3>Phần dành riêng cho giảng viên</h3>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/user/${info._id}`)}
                sx={{ width: 300 }}
              >
                Xem thử trang portfolio
              </Button>
            </>
          )}
        </div>
        <UpdateDescription
          id={info._id}
          show={showDescription}
          onClose={() => setShowDescription(false)}
          setShow={setShowDescription}
        />
      </>
    );
  }
};

export default ProfilePage;
