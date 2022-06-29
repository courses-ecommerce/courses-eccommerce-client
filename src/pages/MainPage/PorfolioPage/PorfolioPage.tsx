import { Avatar, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import courseApi from "src/apis/courseApi";
import teacherApi from "src/apis/teacherApi";
import NavigationHeader from "src/components/NavigationHeader/NavigationHeader";
import Pagination from "src/components/Pagination/Pagination";
import CourseContainer from "src/pages/CoursePage/CourseContainer/CourseContainer";
import { ICourse } from "src/types";
import { ITeacherPorfolio } from "src/types/statistic";
import { checkGender, numberRound } from "src/utils";
import "./PorfolioPage.scss";

const PorfolioPage = () => {
  document.title = "Thông tin chi tiết giảng viên";

  const { id } = useParams();

  const [teacherInfo, setTeacherInfo] = useState<ITeacherPorfolio>();
  const [courses, setCourses] = useState<ICourse[]>([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>();
  const limitCourse = 4;

  useEffect(() => {
    getInfoTeacher();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    id && getCourseTeacher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  const getInfoTeacher = async () => {
    try {
      const response = await teacherApi.getTeacherInfoById(id);
      // console.log("response", response);
      const { user }: any = response;
      setTeacherInfo({ user });
    } catch (error) {
      console.log("lỗi rỗi", { error });
    }
  };

  const getCourseTeacher = async () => {
    const params = { publish: true, author: id, page, limit: limitCourse };
    try {
      const response = await courseApi.getCourses(params);
      // console.log("course teacher", response);
      const { courses, total }: any = response;
      setCourses(courses);
      setTotal(numberRound(total / limitCourse));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <>
      <NavigationHeader />
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <CourseContainer title="Các khoá học đang bán" courses={courses} />
          <Pagination
            pageActive={page}
            total={total}
            onChangeValue={(value: any) => setPage(value)}
          />
        </Box>
      </div>
    </>
  );
};

export default PorfolioPage;
