import { Button } from "@mui/material";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import courseApi from "src/apis/courseApi";
import ArticalReadMore from "src/components/ArticalReadMore/ArticalReadMore";
import Image from "src/components/Image/Image";
import Rating from "src/components/Rating/Rating";
import { ICourse } from "src/types";
import CourseSummary from "../CourseSummary/CourseSummary";
import CourseTarget from "../CourseTarget/CourseTarget";
import "./CourseDetail.scss";

const CourseDetail = () => {
  const { id } = useParams();

  const [courseDetail, setCourseDetail] = useState<ICourse>({});

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    getCourseDetail();
  }, []);

  const getCourseDetail = async () => {
    try {
      const response = await courseApi.getCourseDetail(id);
      const { course }: any = response;
      setCourseDetail(course);
      console.log(response);
    } catch (error) {
      console.log("lỗi", { error });
    }
  };

  return (
    <>
      <div className="navs">
        <Link to="/">Quay lại trang chủ</Link>
      </div>
      <div className="coures-detail">
        <span className="title">Thông tin chi tiết khoá học</span>
        <div className="course-preview">
          <div className="info">
            <Image src={courseDetail.thumbnail} />
            <span className="name">{courseDetail.name}</span>
            <span className="description">
              <ArticalReadMore
                title="Mô tả khoá học"
                content={courseDetail.description}
              />
            </span>
          </div>
          <div className="content-detail">
            <div className="detail-info">
              <h3>Sơ lược thông tin khoá học</h3>
              <span>
                <b>Tác giả </b>
                {courseDetail.author?.fullName}
              </span>

              <span>
                <b>Giá hiện tại </b>
                {courseDetail.currentPrice}
              </span>

              <span>
                <b>Mức độ</b>
                {courseDetail.level}
              </span>
              <span>
                <b>Đối tượng học </b>
                {courseDetail.intendedLearners &&
                  courseDetail.intendedLearners.map((name, index) => (
                    <span key={index}>{name}</span>
                  ))}
              </span>
              <span style={{ display: "flex", flexDirection: "row" }}>
                <b>Đánh giá </b>
                <Rating
                  average_rating={courseDetail.rating?.rate}
                  total_rating={courseDetail.rating?.numOfRate}
                />
              </span>
              <Button variant="contained" color="warning">
                Mua khoá học ngay
              </Button>
            </div>

            <CourseSummary
              title="Thông tin chi tiết khoá học"
              chapters={courseDetail.chapters}
            />
            <CourseTarget
              title="Bạn sẽ học được gì?"
              content={courseDetail.targets}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default CourseDetail;
