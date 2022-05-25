import React from "react";
import { ICourse } from "src/types";
import CourseItem from "../CourseItem/CourseItem";
import "./CourseContainer.scss";

interface CourseContainerProps {
  title: string;
  courses: ICourse[];
}

const CourseContainer: React.FC<CourseContainerProps> = ({
  title,
  courses,
}) => {
  const renderCourses = (courses: ICourse[]) => {
    return (
      courses.length > 0 &&
      courses.map((course: ICourse, index) => (
        <CourseItem key={index} data={course} />
      ))
    );
  };

  return (
    <div className="course-container">
      <span className="title">{title}</span>
      <div className="courses">{renderCourses(courses)}</div>
    </div>
  );
};
export default CourseContainer;
