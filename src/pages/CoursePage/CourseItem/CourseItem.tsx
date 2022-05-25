// import { Rating } from "@mui/material";
import React from "react";
import useHover from "src/hooks/useHover";
import { ICourse } from "src/types";
import CourseModal from "../CourseModal/CourseModal";
import "./CourseItem.scss";

interface CourseItemProps {
  data: ICourse;
}
const CourseItem: React.FC<CourseItemProps> = ({ data }) => {
  //   console.log("sdadsa", data);
  const { nodeRef, show } = useHover();
  return (
    <div className="course-item">
      <div className="img" ref={nodeRef}>
        <img src={data.thumbnail} alt="img" />
        {show && <CourseModal course={data} />}
      </div>
      <div className="content">
        <span className="name">{data.name}</span>
        <span className="description">{data.description}</span>
        {/* <span className="rating">{data.rating}</span> */}
        {/* <Rating value={data.rating} /> */}
        <span className="current_price">{data.currentPrice}</span>
      </div>
    </div>
  );
};

export default CourseItem;
