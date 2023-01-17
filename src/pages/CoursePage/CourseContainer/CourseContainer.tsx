import React from "react";
import LoadingContent from "src/components/LoadingContent";
import { ICourse } from "src/types";
import CourseItem from "../CourseItem";
import "./CourseContainer.scss";

interface CourseContainerProps {
  title: string;
  courses: ICourse[];
  isLoading?: boolean;
}

const CourseContainer: React.FC<CourseContainerProps> = ({
  title,
  courses,
  isLoading = false,
}) => {
  const renderCourses = (courses: ICourse[]) => {
    if (courses.length > 0) {
      return courses.map((course: ICourse, index) => (
        <CourseItem key={index} courseInfo={course} />
      ));
    }
    return <div className="none-courses">Hiện tại chưa có khoá học nào</div>;
  };

  return (
    <div className="course-container">
      <span className="title">{title}</span>
      <div className="courses">
        {!isLoading ? (
          renderCourses(courses)
        ) : (
          <LoadingContent.LoadingSkeleton
            width={300}
            height={160}
            amount={courses.length || 4}
          />
        )}
      </div>
    </div>
  );
};
export default CourseContainer;
