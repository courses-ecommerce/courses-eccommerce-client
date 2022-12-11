import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import courseApi from "src/apis/courseApi";
import myCourseApi from "src/apis/myCourseApi";
import teacherApi from "src/apis/teacherApi";
import NavigationHeader from "src/components/NavigationHeader/NavigationHeader";
import Video from "src/components/Video/Video";
import CourseSummary from "src/pages/CoursePage/CourseSummary/CourseSummary";
import {
  getPanelActive,
  getVideoView,
  selectAuthorization,
} from "src/reducers/authSlice";
import { ICourse } from "src/types/course";
import { IRating } from "src/types/myCourse";
import AcceptMyCourse from "../AcceptMyCourse/AcceptMyCourse";
import RatingMyCourse from "../RatingMyCourse/RatingMyCourse";
import "./MyCourseDetail.scss";

const MyCourseDetail = () => {
  document.title = "Thông tin khoá học chi tiết";
  const navigate = useNavigate();
  const { isRole } = useSelector(selectAuthorization);

  const dispatch = useDispatch();

  const { id } = useParams();

  const [course, setCourse] = useState<ICourse>({});
  const [chapter, setChapter] = useState();

  const { videoView } = useSelector(selectAuthorization);

  const [rating, setRating] = useState<IRating>();
  const [showRating, setShowRating] = useState<boolean>(false);
  const [showAccept, setShowAccept] = useState<boolean>(false);

  useEffect(() => {
    if (!isRole) {
      navigate("/login");
      // return;
    }
    if (isRole === "student") {
      getMyCourseDetail();
    }
    if (isRole === "teacher") {
      getTeacherCourseDetails();
    }
    if (isRole === "admin") {
      getAdminCourseDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getTeacherCourseDetails = async () => {
    try {
      const response = await teacherApi.getCourseDetails(id);
      // console.log("response", response);
      const { course }: any = response;
      const { chapters }: any = course;
      // console.log(" course nek", course);
      setCourse(course);
      setChapter(chapters);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const getAdminCourseDetail = async () => {
    try {
      const response = await courseApi.viewCheckCourse(id);
      // console.log("response nek", response);
      const { course }: any = response;
      const { chapters }: any = course;
      // console.log(" course nek", course);
      setCourse(course);
      setChapter(chapters);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

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
      console.log("lấy được lastkview r", chapterOfLastView, lastView);

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
      <NavigationHeader />
      <div className="my-course-detail">
        <div className="info">
          <span className="title">{course.name}</span>
          {/* for student */}
          {course.name &&
            isRole === "student" &&
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
          {/* for teacher */}
          {course.name && isRole === "admin" && (
            <Button variant="contained" onClick={() => setShowAccept(true)}>
              Duyệt khoá học
            </Button>
          )}
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
      {isRole === "student" && (
        <RatingMyCourse
          slug={course.slug}
          show={showRating}
          value={rating}
          onClose={() => setShowRating(false)}
          setShow={setShowRating}
        />
      )}
      {isRole === "admin" && (
        <AcceptMyCourse
          slug={course.slug}
          show={showAccept}
          value={rating}
          onClose={() => setShowAccept(false)}
          setShow={setShowAccept}
        />
      )}
    </>
  );
};
export default MyCourseDetail;
