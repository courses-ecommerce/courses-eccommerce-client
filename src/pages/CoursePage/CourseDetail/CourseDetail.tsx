import { Box, Divider, Tooltip } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import courseApi from "src/apis/courseApi";
import ArticalReadMore from "src/components/ArticalReadMore/ArticalReadMore";
import Image from "src/components/Image/Image";
import NavigationHeader from "src/components/NavigationHeader/NavigationHeader";
import Pagination from "src/components/Pagination/Pagination";
import Rating from "src/components/Rating/Rating";
import { getPanelActive, getVideoView } from "src/reducers/authSlice";
import { ICourse } from "src/types";
import { IRating } from "src/types/myCourse";
import { numberLocale, numberRound, translateVi } from "src/utils";
import BtnAddCart from "../BtnAddCart/BtnAddCart";
import CourseContainer from "../CourseContainer/CourseContainer";
import CourseRating from "../CourseRating/CourseRating";
import CourseSummary from "../CourseSummary/CourseSummary";
import CourseTarget from "../CourseTarget/CourseTarget";
import "./CourseDetail.scss";

const CourseDetail = () => {
  document.title = "Thông tin chi tiết khoá học";
  const { id } = useParams();

  const navigate = useNavigate();

  // console.log("id", id);

  const dispatch = useDispatch();

  const [courseDetail, setCourseDetail] = useState<ICourse>({});
  const [courseRelates, setCourseRelates] = useState<ICourse[]>([]);
  const [ratingComents, setRatingComents] = useState<IRating[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  // //search
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>(0);

  useLayoutEffect(() => {
    window.scroll(0, 0);
    dispatch(getPanelActive(""));
    dispatch(getVideoView(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //call page
  useEffect(() => {
    window.screen.width <= 430 && setLimit(1);
  }, []);

  useEffect(() => {
    getCourseDetail();
    getRatingComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    courseDetail.slug && getCourseRelates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseDetail.slug, limit, page]);

  const getCourseDetail = async () => {
    setIsLoadingDetail(true);
    try {
      const response = await courseApi.getCourseDetail(id);
      const { course }: any = response;
      setCourseDetail(course);
      setIsLoadingDetail(false);
      // console.log("áddas", course);
    } catch (error) {
      setIsLoadingDetail(false);
      console.log("lỗi", { error });
    }
  };

  const getCourseRelates = async () => {
    const params = { limit, page };
    // console.log("params", params);
    setIsLoading(true);
    try {
      const response = await courseApi.getCoursesRelated(
        courseDetail.slug,
        params
      );
      // console.log("response", response);
      const { courses, total }: any = response;
      // console.log(" courses", courses);
      setTotal(numberRound(total / limit));
      setIsLoading(false);
      setCourseRelates(courses);
    } catch (error) {
      setIsLoading(false);
      console.log("lỗi rồi", { error });
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

  return (
    <>
      <NavigationHeader />
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

              <Tooltip
                title="Xem trang cá nhân"
                onClick={() => navigate(`/user/${courseDetail.author?._id}`)}
              >
                <span className="author" style={{ cursor: "pointer" }}>
                  <b>Tác giả: </b>
                  {courseDetail.author?.fullName}
                </span>
              </Tooltip>

              {courseDetail.currentPrice && courseDetail.currentPrice > 0 ? (
                <span className="current_price">
                  <b>Giá hiện tại: </b>
                  {courseDetail.currentPrice &&
                    numberLocale(courseDetail.currentPrice, " đồng")}

                  <span className="original_price">
                    {courseDetail.originalPrice &&
                      numberLocale(courseDetail.originalPrice, " đồng")}
                  </span>
                </span>
              ) : (
                <span className="current_price">
                  <b>Giá hiện tại: </b>
                  <span className="free">Miễn phí</span>
                </span>
              )}

              <span>
                <b>Dành cho: </b>
                {translateVi(courseDetail.level)}
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

              {/* btn add cart */}
              <BtnAddCart
                courseId={courseDetail._id}
                isBought={courseDetail.isBuyed}
              />
            </div>
            <CourseSummary
              title="Thông tin chi tiết khoá học"
              chapters={courseDetail.chapters}
            />
            <CourseTarget
              title="Đối tượng nào nên học?"
              content={courseDetail.intendedLearners}
              isLoading={isLoadingDetail}
            />
            <CourseTarget
              title="Kiến thức bắt buộc cần có?"
              content={courseDetail.requirements}
              isLoading={isLoadingDetail}
            />
            <CourseTarget
              title="Bạn sẽ học được gì?"
              content={courseDetail.targets}
              isLoading={isLoadingDetail}
            />
          </div>
        </div>

        <Divider sx={{ marginY: 10 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            paddingBottom: 10,
          }}
        >
          <CourseContainer
            title="Khoá học liên quan"
            courses={courseRelates}
            isLoading={isLoading}
          />
          {total > 0 && (
            <Pagination
              pageActive={page}
              total={total}
              onChangeValue={(value: any) => setPage(value)}
            />
          )}
        </Box>
      </div>
    </>
  );
};
export default CourseDetail;
