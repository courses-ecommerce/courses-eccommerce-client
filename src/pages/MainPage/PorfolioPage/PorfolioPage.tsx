import { Avatar, Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import courseApi from "src/apis/courseApi";
import teacherApi from "src/apis/teacherApi";
import NavigationHeader from "src/components/NavigationHeader/NavigationHeader";
import Pagination from "src/components/Pagination/Pagination";
import CourseContainer from "src/pages/CoursePage/CourseContainer/CourseContainer";
import UpdateDescription from "src/pages/ProfilePage/UpdateDescription/UpdateDescription";
import { selectAuthorization } from "src/reducers/authSlice";
import { ICourse } from "src/types";
import { ITeacherPorfolio } from "src/types/statistic";
import { checkGender, numberRound } from "src/utils";
import "./PorfolioPage.scss";

const PorfolioPage = () => {
  document.title = "Thông tin chi tiết giảng viên";

  const { id } = useParams();

  const { isRole } = useSelector(selectAuthorization);

  const [teacherInfo, setTeacherInfo] = useState<ITeacherPorfolio>();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>();
  const [limitCourse, setLimitCourse] = useState<number>(4);

  useLayoutEffect(() => {
    window.scroll(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //call page
  useEffect(() => {
    window.screen.width <= 430 && setLimitCourse(1);
  }, []);

  useEffect(() => {
    if (!showDescription) {
      getInfoTeacher();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, showDescription]);

  useEffect(() => {
    id && getCourseTeacher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page, limitCourse]);

  const getInfoTeacher = async () => {
    try {
      const response = await teacherApi.getTeacherInfoById(id);
      // console.log("response", response);
      const { user }: any = response;
      // console.log("thông tin giảng viên", user);
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
              className="avatar-porfolio"
              alt={teacherInfo?.user?.fullName}
              src={teacherInfo?.user?.avatar}
              // sx={{ width: 200, height: 200 }}
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
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    teacherInfo?.user?.teacher?.description ||
                    "Không có thông tin hiển thị",
                }}
              ></span>
              {isRole === "teacher" && (
                <Button
                  variant="contained"
                  onClick={() => setShowDescription(true)}
                >
                  Chỉnh sửa mô tả
                </Button>
              )}
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
      <UpdateDescription
        value={teacherInfo?.user?.teacher?.description}
        id={id}
        show={showDescription}
        onClose={() => setShowDescription(false)}
        setShow={setShowDescription}
      />
    </>
  );
};

export default PorfolioPage;
