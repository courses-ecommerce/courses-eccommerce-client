import { Button } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import cartApi from "src/apis/cartApi";
import courseApi from "src/apis/courseApi";
import ArticalReadMore from "src/components/ArticalReadMore/ArticalReadMore";
import Image from "src/components/Image/Image";
import Loading from "src/components/Loading/Loading";
import Rating from "src/components/Rating/Rating";
import { getTotalCart, selectAuthorization } from "src/reducers/authSlice";
import { ICourse } from "src/types";
import { numberLocale } from "src/utils";
import CourseSummary from "../CourseSummary/CourseSummary";
import CourseTarget from "../CourseTarget/CourseTarget";
import "./CourseDetail.scss";

const CourseDetail = () => {
  document.title = "Thông tin chi tiết khoá học";
  const { id } = useParams();
  const { isRole } = useSelector(selectAuthorization);

  const navigate = useNavigate();
  const { isAuth } = useSelector(selectAuthorization);
  const dispatch = useDispatch();

  const [courseDetail, setCourseDetail] = useState<ICourse>({});
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    getCourseDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCourseDetail = async () => {
    try {
      const response = await courseApi.getCourseDetail(id);
      const { course }: any = response;
      setCourseDetail(course);
      // console.log(response);
    } catch (error) {
      console.log("lỗi", { error });
    }
  };

  const handleAddCart = async () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      const params = { course: id };
      // console.log("params", params);
      setIsLoading(true);
      try {
        const response = await cartApi.addItemToCart(params);
        const { carts }: any = response;
        // console.log("carts", carts.length);
        dispatch(getTotalCart(carts.length));

        setIsLoading(false);
        toast.success("Thêm vào giỏ hàng thành công", {
          position: "bottom-right",
        });
      } catch (error) {
        console.log("lỗi rồi", { error });
        setIsLoading(false);
        toast.warning(`${error}`, {
          position: "bottom-right",
        });
      }
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
                <b>Tác giả: </b>
                {courseDetail.author?.fullName}
              </span>

              <span>
                <b>Giá hiện tại: </b>
                {numberLocale(courseDetail.currentPrice)} đồng
              </span>

              <span>
                <b>Mức độ: </b>
                {courseDetail.level}
              </span>
              <span>
                <b>Đối tượng học: </b>
                {courseDetail.intendedLearners &&
                  courseDetail.intendedLearners.map((name, index) => (
                    <span key={index}>{name}</span>
                  ))}
              </span>
              <span style={{ display: "flex", flexDirection: "row" }}>
                <b>Đánh giá: </b>
                <Rating
                  average_rating={courseDetail.rating?.rate}
                  total_rating={courseDetail.rating?.numOfRate}
                />
              </span>
              <Button
                variant="contained"
                color="warning"
                onClick={handleAddCart}
                disabled={isLoading || (isRole !== "student" && isRole !== "")}
              >
                {!isLoading ? (
                  isRole === "student" ? (
                    "Mua ngay"
                  ) : (
                    "Học sinh mới được mua"
                  )
                ) : (
                  <Loading />
                )}
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
