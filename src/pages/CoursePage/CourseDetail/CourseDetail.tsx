import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import courseApi from "src/apis/courseApi";
import ArticalReadMore from "src/components/ArticalReadMore/ArticalReadMore";
import Image from "src/components/Image/Image";
import ItemInfo from "src/components/ItemInfo/ItemInfo";
import { ICourse } from "src/types";
import "./CourseDetail.scss";

const CourseDetail = () => {
  const { id } = useParams();

  const [courseDetail, setCourseDetail] = useState<ICourse>({});

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
              <ArticalReadMore content={courseDetail.description} />
            </span>
            {/* <ItemInfo
              title="Đối tượng học"
              value={courseDetail.intendedLearners[0]}
            /> */}
            <ItemInfo title="Tác giả" value={courseDetail.author?.fullName} />
            <ItemInfo title="Giá hiện tại" value={courseDetail.currentPrice} />
          </div>
          <div className="content">dsdf</div>
        </div>
      </div>
    </>
  );
};
export default CourseDetail;
