import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import myCourseApi from "src/apis/myCourseApi";
import Video from "src/components/Video/Video";
import CourseSummary from "src/pages/CoursePage/CourseSummary/CourseSummary";
import { selectAuthorization } from "src/reducers/authSlice";
import { ICourse } from "src/types";
import { IVideo } from "src/types/video";
import "./MyCourseDetail.scss";

const MyCourseDetail = () => {
  document.title = "Khoá học của tôi";
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState<ICourse>({});
  const [chapter, setChapter] = useState();
  const [video, setVideo] = useState<IVideo>();

  const { videoView } = useSelector(selectAuthorization);

  useEffect(() => {
    setVideo(videoView);
    console.log("lấy được video mới là", videoView);
  }, [videoView]);

  useEffect(() => {
    getMyCourseDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getMyCourseDetail = async () => {
    try {
      const response = await myCourseApi.getMyCourseDetail(id);
      // console.log("thông tin khoá học của tôi", response);
      const { myCourse }: any = response;
      // console.log("thông tin myCourse của tôi", myCourse);
      const { course, chapters }: any = myCourse;
      // console.log("thông tin course của tôi", course);
      // console.log("thông tin chapters của tôi", chapters);
      setCourse(course);
      setChapter(chapters);
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
          <span className="author"> {course.author?.fullName} </span>
        </div>
        <div className="my-course-video">
          <div className="stream">
            <Video
              poster={course.thumbnail}
              source={(video?.video?.length && video?.video[0]) || ""}
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
    </>
  );
};
export default MyCourseDetail;
