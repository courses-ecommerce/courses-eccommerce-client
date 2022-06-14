import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "src/components/Rating/Rating";
import useHover from "src/hooks/useHover";
import { ICourse } from "src/types";
import CourseModal from "../CourseModal/CourseModal";
import "./CourseItem.scss";

interface CourseItemProps {
  data: ICourse;
}
const CourseItem: React.FC<CourseItemProps> = ({ data }) => {
  const navigate = useNavigate();

  // console.log(data);

  const { nodeRef, show } = useHover();

  return (
    <div className="course-item">
      <div className="img" ref={nodeRef}>
        <img
          src={data.thumbnail}
          alt="img"
          onClick={() => navigate(`/courses/${data._id}`)}
        />
        {show && <CourseModal course={data} />}
      </div>
      <div className="content">
        <span className="name">{data.name}</span>
        <span className="author">
          <b>Tác giả: </b>
          {data.author?.fullName}
        </span>
        <span className="level">
          <b>Mức độ: </b>
          {data.level}
        </span>
        <span
          className="level"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <b>Đánh giá: </b>
          <Rating
            average_rating={data.rating?.rate}
            total_rating={data.rating?.numOfRate}
          />
        </span>
        {(data.currentPrice || 0) > 0 ? (
          <span className="current_price">
            <b>Giá: </b> {data.currentPrice}
          </span>
        ) : (
          <span className="free">Miễn phí</span>
        )}
        <Button variant="contained" color="warning">
          Mua ngay
        </Button>
      </div>
    </div>
  );
};

export default CourseItem;
