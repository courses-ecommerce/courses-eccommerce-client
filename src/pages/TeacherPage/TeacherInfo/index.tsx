import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import teacherApi from "src/apis/teacherApi";
import { selectAuthorization } from "src/reducers/authSlice";
import { IUser } from "src/types";
import "./TeacherInfo.scss";

const TeacherInfo: React.FC = () => {
  const { userInfo } = useSelector(selectAuthorization);

  const [teacherInfo, setteacherInfo] = useState<IUser>();

  useEffect(() => {
    getTeacherInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo._id]);

  const getTeacherInfo = async () => {
    console.log("id là", userInfo._id);

    try {
      const response = await teacherApi.getTeacherInfoById(userInfo._id);
      // console.log("response", response);
      const { user }: any = response;
      console.log("user", user);
      setteacherInfo(user);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="teacher-info">
      <h3>Thông tin chi tiết giảng viên</h3>
      <div>ádasd</div>
    </div>
  );
};

export default TeacherInfo;
