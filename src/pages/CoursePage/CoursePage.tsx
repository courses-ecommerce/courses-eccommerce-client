import { Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import courseApi from "src/apis/courseApi";
import Pagination from "src/components/Pagination/Pagination";
import { selectAuthorization } from "src/reducers/authSlice";
import { ICourse } from "src/types";
import { numberRound } from "src/utils";
import CourseContainer from "./CourseContainer/CourseContainer";
import "./CoursePage.scss";

const CoursePage = () => {
  const { isRole } = useSelector(selectAuthorization);

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>();
  const [limit, setLimit] = useState<number>(8);

  const limitCourse = 4;

  //courses hot
  const [coursesHot, setCoursesHot] = useState<ICourse[]>([]);
  const [pageHot, setPageHot] = useState(1);
  const [totalHot, setTotalHot] = useState<number>();
  //courses suggest
  const [coursesSuggest, setCoursesSuggest] = useState<ICourse[]>([]);
  const [pageSuggest, setPageSuggest] = useState(1);
  const [totalSuggest, setTotalSuggest] = useState<number>();

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page]);

  useEffect(() => {
    getCoursesHot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageHot]);

  useEffect(() => {
    isRole === "student" && getCoursesSuggest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSuggest]);

  const getCourses = async () => {
    const params = { limit, page };
    try {
      const response = await courseApi.getCourses(params);
      const { courses, total }: any = response;
      // console.log("courses", courses);
      setCourses(courses);
      setTotal(numberRound(total / limit));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };
  const getCoursesHot = async () => {
    const params = { limit: limitCourse, page: pageHot };

    try {
      const response = await courseApi.getCoursesHot(params);
      const { courses, total }: any = response;
      // console.log("courses hot", courses);
      setCoursesHot(courses);
      setTotalHot(numberRound(total / limitCourse));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };
  const getCoursesSuggest = async () => {
    const params = { limit: limitCourse, page: pageSuggest };

    try {
      const response = await courseApi.getCoursesSuggest(params);
      const { courses, total }: any = response;
      console.log("courses hot", courses);
      setCoursesSuggest(courses);
      setTotalSuggest(numberRound(total / total));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="course-page">
      <span className="title">Danh sách các khoá học</span>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <CourseContainer title="Khoá Học Thông Thường" courses={courses} />
          <Pagination
            pageActive={page}
            total={total}
            onChangeValue={(value: any) => setPage(value)}
          />
        </Box>

        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <CourseContainer title="Khoá Học Đang Hot" courses={coursesHot} />
          <Pagination
            pageActive={pageHot}
            total={totalHot}
            onChangeValue={(value: any) => setPageHot(value)}
          />
        </Box>

        {/* suggestion course */}
        {isRole === "student" && (
          <>
            <Divider />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <CourseContainer
                title="Khoá Học Gợi Ý"
                courses={coursesSuggest}
              />
              <Pagination
                pageActive={pageSuggest}
                total={totalSuggest}
                onChangeValue={(value: any) => setPageSuggest(value)}
              />
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};
export default CoursePage;
