import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import courseApi from "src/apis/courseApi";
import { ICourse } from "src/types";
import CourseContainer from "./CourseContainer/CourseContainer";
import "./CoursePage.scss";

const CoursePage = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [coursesHot, setCoursesHot] = useState<ICourse[]>([]);
  const [limit, setLimit] = useState<number>(8);

  useEffect(() => {
    getCourses();
    getCoursesHot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const getCourses = async () => {
    const params = { limit };
    try {
      const response = await courseApi.getCourses(params);
      const { courses, total }: any = response;
      // console.log("courses", courses);
      setCourses(courses);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };
  const getCoursesHot = async () => {
    const params = { limit };

    try {
      const response = await courseApi.getCoursesHot(params);
      const { courses, total }: any = response;
      // console.log("courses hot", courses);
      setCoursesHot(courses);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="course-page">
      <span className="title">Danh sách các khoá học</span>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <CourseContainer title="Khoá Học Thông Thường" courses={courses} />
        <CourseContainer title="Khoá Học Đang Hot" courses={coursesHot} />
      </Box>
    </div>
  );
};
export default CoursePage;
