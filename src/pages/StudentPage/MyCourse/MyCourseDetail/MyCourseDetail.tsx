import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MyCourseDetail.scss";

const MyCourseDetail = () => {
  // document.title = "Khoá học của tôi";
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <div className="navs">
        <span onClick={() => navigate(-1)}>Quay lại khoá học của tôi</span>
      </div>
      <div className="">ád</div>
    </>
  );
};
export default MyCourseDetail;
