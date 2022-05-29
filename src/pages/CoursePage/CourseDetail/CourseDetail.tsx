import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import courseApi from "src/apis/courseApi";
import "./CourseDetail.scss";

const CourseDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    getCourseDetail();
  }, []);

  const getCourseDetail = async () => {
    try {
      const response = await courseApi.getCourseDetail(id);
      console.log(response);
    } catch (error) {
      console.log("lỗi", { error });
    }
  };

  return (
    <div className="coures-detail">
      <div className="navs">
        <Link to="/">Quay lại trang chủ</Link>
      </div>
      <div className="content">CourseDetail</div>
    </div>
  );
};
export default CourseDetail;
