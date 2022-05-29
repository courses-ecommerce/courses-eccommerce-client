// import { Rating } from "@mui/material";
import { Rating } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useHover from "src/hooks/useHover";
import { ICourse } from "src/types";
import CourseModal from "../CourseModal/CourseModal";
import "./CourseItem.scss";

interface CourseItemProps {
  data: ICourse;
}
const CourseItem: React.FC<CourseItemProps> = ({ data }) => {
  const navigate = useNavigate();

  // console.log("sdadsa", data._id);

  console.log(data);

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
        <span className="author">{data.author?.fullName}</span>
        <span className="level">{data.level}</span>
        <Rating value={data.rating?.length || 0} readOnly precision={0.5} />
        {(data.currentPrice || 0) > 0 ? (
          <span className="current_price">{data.currentPrice}</span>
        ) : (
          <span className="free">Miễn phí</span>
        )}
      </div>
    </div>
  );
};

export default CourseItem;
