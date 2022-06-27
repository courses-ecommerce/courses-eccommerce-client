import { Button } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import cartApi from "src/apis/cartApi";
import courseApi from "src/apis/courseApi";
import ArticalReadMore from "src/components/ArticalReadMore/ArticalReadMore";
import Image from "src/components/Image/Image";
import Loading from "src/components/Loading/Loading";
import Rating from "src/components/Rating/Rating";
import {
  getPanelActive,
  getTotalCart,
  getVideoView,
  selectAuthorization,
} from "src/reducers/authSlice";
import { ICourse } from "src/types";
import { IRating } from "src/types/myCourse";
import { numberLocale, numberRound } from "src/utils";
import CourseRating from "../CourseRating/CourseRating";
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
  const [ratingComents, setRatingComents] = useState<IRating[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    window.scroll(0, 0);
    dispatch(getPanelActive(""));
    dispatch(getVideoView(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCourseDetail();
    getRatingComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCourseDetail = async () => {
    try {
      const response = await courseApi.getCourseDetail(id);
      const { course }: any = response;
      setCourseDetail(course);
      // console.log("áddas", course);
    } catch (error) {
      console.log("lỗi", { error });
    }
  };

  const getRatingComment = async () => {
    try {
      const response = await courseApi.getCourseRatingList(id);
      // console.log("response", response);
      const { rates }: any = response;
      // console.log("rating", rates);
      setRatingComents(rates);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleAddCart = async () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      const params = { course: courseDetail._id };
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
        <span onClick={() => navigate(-1)}>Quay lại trang trước</span>
      </div>
      <div className="coures-detail">
        <span className="title">Thông tin chi tiết khoá học</span>
        <div className="course-preview">
          <div className="info">
            {!!courseDetail.saleOff && (
              <span className="sale-off">
                -{numberRound(courseDetail.saleOff)}%
              </span>
            )}
            <Image src={courseDetail.thumbnail} />
            <span className="name">{courseDetail.name}</span>
            <span className="description">
              <ArticalReadMore
                title="Mô tả khoá học"
                content={courseDetail.description}
              />
            </span>
            <div className="rating">
              <CourseRating ratingComents={ratingComents} />
            </div>
          </div>
          <div className="content-detail">
            <div className="detail-info">
              <h3>Sơ lược thông tin khoá học</h3>
              <span>
                <b>Tác giả: </b>
                {courseDetail.author?.fullName}
              </span>

              <span className="current_price">
                <b>Giá hiện tại: </b>
                {courseDetail.currentPrice &&
                  numberLocale(courseDetail.currentPrice, " đồng")}

                <span className="original_price">
                  {courseDetail.originalPrice &&
                    numberLocale(courseDetail.originalPrice, " đồng")}
                </span>
              </span>

              <span>
                <b>Mức độ: </b>
                {courseDetail.level}
              </span>
              {/* hot tags */}
              <span className="sell-number">
                <span className="amount">
                  <b>Số lượng bán được: </b>
                  {courseDetail.sellNumber}
                </span>
                {courseDetail.type && (
                  <span className="tags">Đang {courseDetail.type}</span>
                )}
              </span>

              <span style={{ display: "flex", flexDirection: "row" }}>
                <b>Đánh giá: </b>
                <Rating
                  average_rating={courseDetail.rating?.rate}
                  total_rating={courseDetail.rating?.numOfRate}
                />
              </span>
              {/* <span className="intended-learners">
                <b>Đối tượng học: </b>
                {courseDetail.intendedLearners &&
                  courseDetail.intendedLearners.map((name, index) => (
                    <span key={index}>
                      {index + 1}. {name}
                    </span>
                  ))}
              </span> */}

              <Button
                variant="contained"
                color="warning"
                onClick={handleAddCart}
                disabled={isLoading || (isRole !== "student" && isRole !== "")}
              >
                {!isLoading ? (
                  isRole === "student" || !isRole ? (
                    "Mua khoá học ngay"
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
              title="Đối tượng nào nên học?"
              content={courseDetail.intendedLearners}
            />
            <CourseTarget
              title="Kiến thức bắt buộc cần có?"
              content={courseDetail.requirements}
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
