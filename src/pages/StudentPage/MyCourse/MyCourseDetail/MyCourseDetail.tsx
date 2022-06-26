import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import myCourseApi from "src/apis/myCourseApi";
import Video from "src/components/Video/Video";
import CourseSummary from "src/pages/CoursePage/CourseSummary/CourseSummary";
import {
  getPanelActive,
  getVideoView,
  selectAuthorization,
} from "src/reducers/authSlice";
import { ICourse } from "src/types";
import { IRating } from "src/types/myCourse";
import RatingMyCourse from "../RatingMyCourse/RatingMyCourse";
import "./MyCourseDetail.scss";

const MyCourseDetail = () => {
  document.title = "Khoá học của tôi";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [course, setCourse] = useState<ICourse>({});
  const [chapter, setChapter] = useState();

  const { videoView } = useSelector(selectAuthorization);

  const [rating, setRating] = useState<IRating>();
  const [showRating, setShowRating] = useState<boolean>(false);

  useEffect(() => {
    getMyCourseDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getMyCourseDetail = async () => {
    try {
      const response = await myCourseApi.getMyCourseDetail(id);
      // console.log("thông tin khoá học của tôi", response);
      const { myCourse }: any = response;
      console.log("thông tin myCourse của tôi", myCourse);
      const { course, chapters, rating, chapterOfLastView, lastView }: any =
        myCourse;
      // const { course, chapters, rating }: any = myCourse;
      // console.log("thông tin course của tôi", course);
      // console.log("thông tin chapters của tôi", chapters);
      console.log("lấy được lastview r", chapterOfLastView, lastView);

      setRating(rating);
      setCourse(course);
      setChapter(chapters);
      // save last view in redux
      dispatch(getPanelActive("panel" + (chapterOfLastView?.number - 1)));
      dispatch(getVideoView(lastView));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <>
      <div className="navs">
        <span onClick={() => navigate(-1)}>Quay lại khoá học của tôi</span>
      </div>
      <div className="my-course-detail">
        <div className="info">
          <span className="title">{course.name}</span>
          {/* <span className="author"> {course.author?.fullName} </span> */}
          {course.name &&
            (!rating ? (
              <Button variant="contained" onClick={() => setShowRating(true)}>
                Đánh giá ngay
              </Button>
            ) : (
              <Button
                variant="contained"
                color="warning"
                onClick={() => setShowRating(true)}
              >
                Đánh giá lại
              </Button>
            ))}
        </div>
        <div className="my-course-video">
          <div className="stream">
            <Video
              courseId={id}
              lessonId={videoView?._id}
              poster={course.thumbnail}
              currentTime={videoView.timeline}
              source={(videoView?.video?.length && videoView?.video[0]) || ""}
              duration={videoView.duration}
            />
          </div>
          <div className="chapters">
            <CourseSummary
              title="Thông tin chi tiết khoá học"
              chapters={chapter}
            />
          </div>
        </div>
      </div>
      <RatingMyCourse
        slug={course.slug}
        show={showRating}
        value={rating}
        onClose={() => setShowRating(false)}
        setShow={setShowRating}
      />
    </>
  );
};
export default MyCourseDetail;
