import React, { useEffect, useState } from "react";
import courseApi from "src/apis/courseApi";
import { ICourse } from "src/types";
import CourseContainer from "./CourseContainer/CourseContainer";
import "./CoursePage.scss";

const CoursePage = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await courseApi.getCourses();
      const { courses, total }: any = response;
      setCourses(courses);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="course-page">
      <span className="title">Danh sách các khoá học</span>
      <CourseContainer title="Khoá Học Thông Thường" courses={courses} />
    </div>
  );
};
export default CoursePage;
