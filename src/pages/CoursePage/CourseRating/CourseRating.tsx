import React from "react";
import { IRating } from "src/types/course";
import "./CourseRating.scss";
import CourseRatingItem from "./CourseRatingItem/CourseRatingItem";

interface CourseRatingProps {
  ratingComents?: IRating[];
}

const CourseRating: React.FC<CourseRatingProps> = ({ ratingComents = [] }) => {
  // console.log("sdasdasdas", ratingComents);

  const redenderCourseRating = (ratingComments: IRating[]) => {
    return (
      ratingComments.length > 0 &&
      ratingComments.map((ratingComment, index) => (
        <CourseRatingItem key={index} data={ratingComment} />
      ))
    );
  };

  return (
    <div className="course-rating">
      <span className="title">
        Đánh giá của học viên ({ratingComents.length} người)
      </span>
      <div className="course-content">
        {redenderCourseRating(ratingComents)}
      </div>
    </div>
  );
};

export default CourseRating;
