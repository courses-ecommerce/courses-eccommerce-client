import { Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import chapterApi from "src/apis/chapterApi";
import courseApi from "src/apis/courseApi";
import teacherApi from "src/apis/teacherApi";
import LayoutContainer from "src/layouts/LayoutContainer";
import { isPending, isSuccess } from "src/reducers";
import { IChapterUpload } from "./Chapter";
import CourseDetailSideBar, {
  CourseDetailSideBarData,
} from "./CourseDetailSideBar";
import CourseDetailSideBarItem from "./CourseDetailSideBarItem";
import "./TeacherCourseDetail.scss";

const TeacherCourseDetail: React.FC = () => {
  document.title = "Quản lý khóa học";

  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [navbar, setNavbar] = useState(0);
  const [isChapterUpdated, setIsChapterUpdated] = useState(false);
  const [isInformationCourseUpdated, setIsInformationCourseUpdated] =
    useState(false);
  const [chapters, setChapters] = useState<IChapterUpload[]>([]);
  const [slug, setSlug] = useState("");
  const [courseStatus, setCourseStatus] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      category: "",
      originalPrice: "",
      currentPrice: "",
      thumbnail: "",
    },
    onSubmit: () => {},
  });

  const getCourseDetails = useCallback(() => {
    id &&
      teacherApi
        .getCourseDetails(id)
        .then((res: any) => {
          const {
            name,
            description,
            category,
            slug: _slugCourse,
            chapters: chapterCourse,
            status,
            originalPrice,
            currentPrice,
            thumbnail,
          } = res.course;
          dispatch(isSuccess());
          setSlug(_slugCourse);
          formik.setValues({
            name,
            description,
            originalPrice,
            currentPrice,
            category: category._id,
            thumbnail,
          });
          setChapters(chapterCourse);
          setCourseStatus(status);
        })
        .catch(() => {
          dispatch(isSuccess());
          nav("/teacher/info");
        });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(isPending());
    getCourseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInformationCourseUpdated) {
      getCourseDetails();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInformationCourseUpdated]);

  useEffect(() => {
    if (isChapterUpdated) {
      chapterApi.getChapters(id).then((res: any) => {
        dispatch(isSuccess());
        setChapters(res.chapters);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isChapterUpdated]);

  const handleSubmitReview = () => {
    dispatch(isPending());
    courseApi
      .updateCourse(slug, {
        status: "pending",
      })
      .then(() => {
        getCourseDetails();

        toast.success("Chờ admin duyệt khóa học của bạn", {
          position: "bottom-right",
        });
      });
  };

  const handleDeleteCourse = () => {
    dispatch(isPending());
    courseApi
      .deleteCourse(slug)
      .then(() => {
        toast.success("Xóa khóa học thành công", {
          position: "bottom-right",
        });
        dispatch(isSuccess());
        nav("/teacher/course");
      })
      .catch((error) => {
        console.log("lỗi rồi", { error });
        toast.warning(`${error}`, { position: "bottom-right" });
        dispatch(isSuccess());
      });
  };

  return (
    <LayoutContainer titleShow={false} footerShow={false}>
      <div className="teacher-course-detail">
        <CourseDetailSideBar
          sideBarContent={CourseDetailSideBarData}
          getSideBarId={(sideBarId) => setNavbar(sideBarId as number)}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: 45,
            }}
            onClick={handleSubmitReview}
          >
            Xuất bản khoá học
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              height: 45,
            }}
            onClick={handleDeleteCourse}
          >
            Xóa khóa học
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              height: 45,
            }}
            onClick={() => nav(-1)}
          >
            Quay lại trang trước
          </Button>
        </CourseDetailSideBar>
        <div className="form">
          {navbar === 0 ? (
            <CourseDetailSideBarItem.CourseInformation
              slug={slug}
              courseStatus={courseStatus}
              isUpdateCompleted={(status) =>
                setIsInformationCourseUpdated(status)
              }
              courseInformationValue={formik.values}
            />
          ) : navbar === 1 ? (
            <CourseDetailSideBarItem.LearningContent
              chapters={chapters}
              isUpdateCompleted={(status) => setIsChapterUpdated(status)}
            />
          ) : navbar === 2 ? (
            <CourseDetailSideBarItem.IntendedLearners />
          ) : navbar === 3 ? (
            <CourseDetailSideBarItem.Requirements />
          ) : (
            <CourseDetailSideBarItem.Targets />
          )}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default TeacherCourseDetail;
