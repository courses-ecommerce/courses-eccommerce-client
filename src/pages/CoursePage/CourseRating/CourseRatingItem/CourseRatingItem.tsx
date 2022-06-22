import { Divider } from "@mui/material";
import React from "react";
import Rating from "src/components/Rating/Rating";
import { IRating } from "src/types/course";
import formatDate from "src/utils/formatDay";
import "./CourseRatingItem.scss";

interface CourseRatingItemProps {
  data?: IRating;
}

const CourseRatingItem: React.FC<CourseRatingItemProps> = ({ data }) => {
  console.log("đã lấy được course rating item là", data);

  return (
    <div className="course-rating-item">
      <div className="info">
        <div>
          <span className="name">{data?.author?.fullName}</span>
          <Rating isShowTotalRating={false} average_rating={data?.rate} />
        </div>
        <span className="date">
          Vào lúc: {formatDate(data?.createdAt, "dd-MM-yyyy mm:HH")}
        </span>
      </div>
      <Divider />
      <b>Nội dung:</b>
      <span className="content">{data?.content}</span>
    </div>
  );
};
export default CourseRatingItem;
