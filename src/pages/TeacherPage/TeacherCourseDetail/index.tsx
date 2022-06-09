import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutContainer from "src/components/LayoutContainer/LayoutContainer";
import "./TeacherCourseDetail.scss";
import * as Yup from "yup";
import courseApi from "src/apis/courseApi";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Input from "src/components/Input";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { isPending, isSuccess } from "src/reducers/authSlice";
import Chapter, { IChapter } from "./Chapter";
import Icon from "src/components/Icon/Icon";
import { v4 as uuidv4 } from "uuid";
import chapterApi from "src/apis/chapterApi";

const TeacherCourseDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(0);
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập khóa học"),
      description: Yup.string().required("Vui lòng nhập mô tả khóa học"),
    }),
    onSubmit: async (values) => {
      dispatch(isPending());
      id &&
        courseApi.updateCourse(id, values).then((res: any) => {
          dispatch(isSuccess());
          toast.success(res.message, {
            position: "bottom-right",
          });
        });
    },
  });

  useEffect(() => {
    dispatch(isPending());

    courseApi
      .getCourseDetail(id)
      .then((res: any) => {
        dispatch(isSuccess());
        formik.setValues(res.course);
      })
      .catch(() => {
        dispatch(isSuccess());
        nav("/teacher/info");
      });
  }, [id]);

  useEffect(() => {
    chapterApi.getChapters(id).then((res) => setChapters(res.data));
  }, []);

  const handleAddChapter = (index: number, type: "first" | "last") => {
    const newChapter: IChapter = {
      id: uuidv4(),
      name: "",
      lessons: [],
    };
    const _chapters = [...chapters];

    let newArrayChapter: IChapter[] = [];

    for (let i = 0; i < _chapters.length; i++) {
      index === i
        ? (newArrayChapter = [...newArrayChapter, newChapter, _chapters[i]])
        : (newArrayChapter = [...newArrayChapter, _chapters[i]]);
    }

    if (type === "last") {
      setChapters([..._chapters, newChapter]);
    } else if (index === 0) {
      setChapters([newChapter, ..._chapters]);
    } else {
      setChapters(newArrayChapter);
    }
  };

  const handleDeleteChapter = (id: string) => {
    const _chapters = [...chapters];

    setChapters(_chapters.filter((item) => item.id !== id));
  };

  return (
    <LayoutContainer>
      <div className="teacher-course-detail">
        <div className="sidebar">
          <h2>Danh sách các mục</h2>
          <p
            className={navbar === 0 ? "active" : ""}
            onClick={() => setNavbar(0)}
          >
            Thông tin khóa học
          </p>
          <p
            className={navbar === 1 ? "active" : ""}
            onClick={() => setNavbar(1)}
          >
            Chương trình giảng dạy
          </p>
        </div>
        <div className="form">
          <h2 className="title">
            {navbar === 0 ? "Thông tin khóa học" : "Chương trình giảng dạy"}
          </h2>
          {navbar === 0 ? (
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Input
                  required
                  label="Tên khóa học"
                  placeholder="Nhập tên khóa học"
                  errorMessage={formik.touched.name ? formik.errors.name : ""}
                  {...formik.getFieldProps("name")}
                />
                <Input
                  required
                  label="Mô tả khóa học"
                  placeholder="Nhập mô tả khóa học"
                  errorMessage={
                    formik.touched.description ? formik.errors.description : ""
                  }
                  {...formik.getFieldProps("description")}
                />
              </Box>
              <Box
                sx={{
                  width: "max-content",
                  marginLeft: "auto",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    height: 45,
                  }}
                >
                  Submit for Review
                </Button>
              </Box>
            </form>
          ) : (
            <div className="chapter-list">
              {chapters.map((chapter, index) => (
                <>
                  <div className="new">
                    <div
                      className="icon"
                      onClick={() => handleAddChapter(index, "first")}
                    >
                      <Icon icon="plus" color="black" size={20} />
                    </div>
                  </div>
                  <Chapter
                    courseId={id}
                    chapter={chapter}
                    key={index}
                    index={index}
                    handleDeleteChapter={handleDeleteChapter}
                  />
                </>
              ))}
              <div className="new">
                <div
                  className="icon"
                  onClick={() => handleAddChapter(0, "last")}
                >
                  <Icon icon="plus" color="black" size={20} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default TeacherCourseDetail;
