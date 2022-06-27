import { Avatar, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import teacherApi from "src/apis/teacherApi";
import { ITeacherPorfolio } from "src/types/statistic";
import { ICourse } from "src/types";
import { checkGender } from "src/utils";
import "./PorfolioPage.scss";
import CourseItem from "src/pages/CoursePage/CourseItem/CourseItem";

const PorfolioPage = () => {
  document.title = "Thông tin chi tiết giảng viên";
  const navigate = useNavigate();
  const { id } = useParams();

  const [teacherInfo, setTeacherInfo] = useState<ITeacherPorfolio>();

  useEffect(() => {
    getInfoTeacher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getInfoTeacher = async () => {
    try {
      const response = await teacherApi.getTeacherInfoById(id);
      // console.log("response", response);
      const { user, userCourse }: any = response;
      setTeacherInfo({ user, userCourse });
    } catch (error) {
      console.log("lỗi rỗi", { error });
    }
  };

  // console.log("teacherInfo", teacherInfo);

  const renderTeacherCourse = (courses: ICourse[]) => {
    return (
      courses.length > 0 &&
      courses.map((course, index) => <CourseItem data={course} key={index} />)
    );
  };

  return (
    <>
      <div className="navs">
        <span onClick={() => navigate(-1)}>Quay lại trang trước</span>
      </div>
      <div className="porfolio-page">
        <div className="teacher-info">
          <h3>Thông tin chi tiết giảng viên</h3>
          <div className="info">
            <Avatar
              alt={teacherInfo?.user?.fullName}
              src={teacherInfo?.user?.avatar}
              sx={{ width: 200, height: 200 }}
            />
            <div className="content">
              <span>
                <b>Tên giảng viên: </b>
                {teacherInfo?.user?.fullName}
              </span>
              <span>
                <b>Giới tính: </b>
                {teacherInfo?.user?.gender &&
                  checkGender(teacherInfo?.user?.gender)}
              </span>
              {!teacherInfo?.user?.teacher?.isVerified && (
                <span className="is-verify">Giảng viên chính thức</span>
              )}
              <Divider />
              <h3>Thông tin sơ lược</h3>
              <span>
                {teacherInfo?.user?.teacher?.description ||
                  "Không có thông tin hiển thị"}
              </span>
            </div>
          </div>
        </div>
        <Divider />
        <div className="teacher-course">
          <h3>Các khoá học hiện đang bán</h3>
          <div className="content">
            {renderTeacherCourse(teacherInfo?.userCourse || [])}
          </div>
        </div>
      </div>
    </>
  );
};

export default PorfolioPage;
