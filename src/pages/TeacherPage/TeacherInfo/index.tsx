import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import teacherApi from "src/apis/teacherApi";
import { selectAuthorization } from "src/reducers/authSlice";
import { IUser } from "src/types";
import "./TeacherInfo.scss";
import UpdateBankingCard from "./UpdateBankingCard";

const TeacherInfo: React.FC = () => {
  document.title = "Thông tin thẻ ngân hàng";

  const { userInfo } = useSelector(selectAuthorization);

  const [teacherInfo, setTeacherInfo] = useState<IUser>();

  const [showUpdateBanking, setShowUpdateBanking] = useState<boolean>(false);

  useEffect(() => {
    if (!showUpdateBanking) {
      getTeacherInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo._id, showUpdateBanking]);

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
        <h3>Thông tin ngân hàng</h3>
        <div className="banking_info">
          <span>
            <b>Mã số tài khoản: </b>
            {teacherInfo?.teacher?.payments?.accountNumber}
          </span>
          <span>
            <b>Tên ngân hàng: </b>
            {teacherInfo?.teacher?.payments?.bankName}
          </span>
          {/* <span>
          <b>Mã số thẻ(được ghi trên thẻ atm) : </b>
          {teacherInfo?.teacher?.payments?.cardNumber}
        </span> */}
          <span>
            <b>Tên chủ sở hữu : </b>
            {teacherInfo?.teacher?.payments?.name}
          </span>
        </div>
        <Button variant="contained" onClick={() => setShowUpdateBanking(true)}>
          Cập nhật thẻ ngân hàng
        </Button>
      </div>
      <UpdateBankingCard
        bankingCard={teacherInfo?.teacher?.payments}
        id={teacherInfo?._id}
        show={showUpdateBanking}
        onClose={() => setShowUpdateBanking(false)}
        setShow={setShowUpdateBanking}
      />
    </>
  );
};

export default TeacherInfo;
