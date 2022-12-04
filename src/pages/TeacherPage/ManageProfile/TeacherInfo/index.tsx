import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import teacherApi from "src/apis/teacherApi";
import { selectAuthorization } from "src/reducers/authSlice";
import { IUser } from "src/types";
import UpdateBankingCard from "./UpdateBankingCard";
import "./TeacherInfo.scss";

const TeacherInfo: React.FC = () => {
  document.title = "Thông tin thẻ ngân hàng";

  const { userInfo } = useSelector(selectAuthorization);

  const [teacherInfo, setTeacherInfo] = useState<IUser>();

  const [showUpdateBanking, setShowUpdateBanking] = useState<boolean>(false);
  const [isUpdateBankingCompleted, setIsUpdateBankingCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    getTeacherInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isUpdateBankingCompleted) {
      getTeacherInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo._id, isUpdateBankingCompleted]);

  const getTeacherInfo = async () => {
    // console.log("id là", userInfo._id);

    try {
      const response = await teacherApi.getTeacherInfoById(userInfo._id);
      // console.log("response", response);
      const { user }: any = response;
      // console.log("user", user);
      setTeacherInfo(user);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <>
      <div className="teacher-info">
        <h3>Thông tin tài khoản ngân hàng</h3>
        <div className="banking_info">
          <span>
            <b>Mã số tài khoản: </b>
            {teacherInfo?.teacher?.payments?.accountNumber}
          </span>
          <span>
            <b>Tên ngân hàng: </b>
            {teacherInfo?.teacher?.payments?.bankName}
          </span>
          <span>
            <b>Tên chủ sở hữu : </b>
            {teacherInfo?.teacher?.payments?.name}
          </span>
        </div>
        <Button variant="contained" onClick={() => setShowUpdateBanking(true)}>
          Cập nhật thông tin tài khoản ngân hàng
        </Button>
      </div>
      <UpdateBankingCard
        bankingCard={teacherInfo?.teacher?.payments}
        id={teacherInfo?._id}
        show={showUpdateBanking}
        isUpdate={(status) => setIsUpdateBankingCompleted(status)}
        onClose={() => setShowUpdateBanking(false)}
        setShow={setShowUpdateBanking}
      />
    </>
  );
};

export default TeacherInfo;
