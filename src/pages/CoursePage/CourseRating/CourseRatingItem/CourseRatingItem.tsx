import { Divider } from "@mui/material";
import React from "react";
import Rating from "src/components/Rating/Rating";
import { IRating } from "src/types/myCourse";

import formatDate from "src/utils/formatDay";
import "./CourseRatingItem.scss";

interface CourseRatingItemProps {
  data?: IRating;
}

const CourseRatingItem: React.FC<CourseRatingItemProps> = ({ data }) => {
  //   console.log("đã lấy được course rating item là", data);

  return (
    <div className="course-rating-item">
      <div className="info">
        <span className="name">Học viên: {data?.author?.fullName}</span>
        <span className="date">
          {formatDate(data?.createdAt, "dd-MM-yyyy HH:mm")}
        </span>
      </div>
      <Divider />
      <span className="rating-info">
        <b>Đánh giá:</b>
        <Rating isShowTotalRating={false} average_rating={data?.rate} />
      </span>

      <span className="content">
        <b>Nội dung:</b>
        {data?.content}
      </span>
    </div>
  );
};
export default CourseRatingItem;
