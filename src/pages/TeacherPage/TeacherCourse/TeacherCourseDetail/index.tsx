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
import teacherApi from "src/apis/teacherApi";
import InputSelect from "src/components/InputSelect";
import categoryApi from "src/apis/categoryApi";
import { ICategories } from "..";
import chapterApi from "src/apis/chapterApi";
import ReactQuill from "react-quill";
import IntendedLearners from "../../IntendedLearners";
import Requirements from "../../Requirements";
import Targets from "../../Targets";

const TeacherCourseDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(0);
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [slug, setSlug] = useState("");
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập khóa học"),
      description: Yup.string().required("Vui lòng nhập mô tả khóa học"),
    }),
    onSubmit: async (values) => {
      dispatch(isPending());
      courseApi.updateCourse(slug, values).then((res: any) => {
        dispatch(isSuccess());
        toast.success(res.message, {
          position: "bottom-right",
        });
      });
    },
  });

  useEffect(() => {
    categoryApi.getCategories().then((res: any) => {
      setCategories(
        res.categories.map((category: any) => {
          return { value: category._id, name: category.name };
        })
      );
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(isPending());

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
          } = res.course;
          dispatch(isSuccess());
          setSlug(_slugCourse);
          formik.setValues({ name, description, category: category._id });
          setChapters(chapterCourse);
        })
        .catch(() => {
          dispatch(isSuccess());
          nav("/teacher/info");
        });
    // eslint-disable-next-line
  }, [id]);

  const handleAddChapter = (index: number) => {
    dispatch(isPending());
    chapterApi.addChapter(id, index, "default").then(() => {
      chapterApi.getChapters(id).then((res: any) => {
        dispatch(isSuccess());
        setChapters(res.chapters);
      });
    });
  };

  const handleUpdateChapter = (
    name: string,
    order: number,
    chapterId: string
  ) => {
    dispatch(isPending());
    chapterApi.updateChapter(chapterId, order, name).then(() => {
      chapterApi.getChapters(id).then((res: any) => {
        dispatch(isSuccess());
        setChapters(res.chapters);
      });
    });
  };

  const handleDeleteChapter = (chapterId: string) => {
    dispatch(isPending());
    chapterApi.deleteChapter(chapterId).then(() => {
      chapterApi.getChapters(id).then((res: any) => {
        dispatch(isSuccess());
        setChapters(res.chapters);
      });
    });
  };

  const handleSubmitReview = () => {
    dispatch(isPending());
    courseApi
      .updateCourse(slug, {
        status: "Pending",
      })
      .then(() => dispatch(isSuccess()));
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
          <p
            className={navbar === 2 ? "active" : ""}
            onClick={() => setNavbar(2)}
          >
            Đối tượng khóa học
          </p>
          <p
            className={navbar === 3 ? "active" : ""}
            onClick={() => setNavbar(3)}
          >
            Kiến thức bắt buộc
          </p>
          <p
            className={navbar === 4 ? "active" : ""}
            onClick={() => setNavbar(4)}
          >
            Mục tiêu khóa học
          </p>
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: 45,
            }}
            onClick={handleSubmitReview}
          >
            Submit for Review
          </Button>
        </div>
        <div className="form">
          <h2 className="title">
            {navbar === 0
              ? "Thông tin khóa học"
              : navbar === 1
              ? "Chương trình giảng dạy"
              : navbar === 2
              ? "Đối tượng nào nên học?"
              : navbar === 3
              ? "Kiến thức bắt buộc cần có?"
              : "Bạn sẽ học được gì?"}
            {navbar === 1 && (
              <Button
                variant="contained"
                color="warning"
                sx={{
                  height: 45,
                }}
                onClick={() => nav(`/teacher/course/preview-course/${id}`)}
              >
                Xem trước khóa học
              </Button>
            )}
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
                <div className="editor">
                  <h2>
                    Nội dung khóa học <span>*</span>
                  </h2>
                  <ReactQuill
                    style={{
                      height: 70,
                    }}
                    theme="snow"
                    value={formik.values.description}
                    onChange={(value) =>
                      formik.setFieldValue("description", value)
                    }
                    placeholder="Thêm một mô tả. Bao gồm những gì học sinh sẽ có thể làm sau khi hoàn thành bài giảng."
                  />
                </div>
                <InputSelect
                  label="Loại khóa học"
                  list={categories}
                  onChange={(e) =>
                    formik.setFieldValue("category", e.target.value)
                  }
                  defaultValue={formik.values.category}
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
                  Save
                </Button>
              </Box>
            </form>
          ) : navbar === 1 ? (
            <div className="chapter-list">
              {chapters.map((chapter, index) => (
                <React.Fragment key={index}>
                  <div className="new">
                    <div
                      className="icon"
                      onClick={() => handleAddChapter(index)}
                    >
                      <Icon icon="plus" color="black" size={20} />
                    </div>
                  </div>
                  <Chapter
                    chapter={chapter}
                    index={index}
                    handleUpdateChapter={handleUpdateChapter}
                    handleDeleteChapter={handleDeleteChapter}
                  />
                </React.Fragment>
              ))}
              <div className="new">
                <div
                  className="icon"
                  onClick={() => handleAddChapter(chapters.length)}
                >
                  <Icon icon="plus" color="black" size={20} />
                </div>
              </div>
            </div>
          ) : navbar === 2 ? (
            <IntendedLearners />
          ) : navbar === 3 ? (
            <Requirements />
          ) : (
            <Targets />
          )}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default TeacherCourseDetail;
