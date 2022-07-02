import React, { useEffect, useState } from "react";
import { IRating } from "src/types/myCourse";

import CourseRatingItem from "./CourseRatingItem/CourseRatingItem";
import "./CourseRating.scss";

interface CourseRatingProps {
  ratingComents?: IRating[];
}

const CourseRating: React.FC<CourseRatingProps> = ({ ratingComents = [] }) => {
  // console.log("sdasdasdas", ratingComents);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  //call page
  useEffect(() => {
    window.screen.width <= 430 && setIsMobile(true);
  }, []);

  const redenderCourseRating = (ratingComments: IRating[]) => {
    return (
      ratingComments.length > 0 &&
      ratingComments.map((ratingComment, index) => (
        <CourseRatingItem
          key={index}
          isMobile={isMobile}
          data={ratingComment}
        />
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
