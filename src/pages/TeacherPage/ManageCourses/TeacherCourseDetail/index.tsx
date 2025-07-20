import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { TiptapEditor } from "@libs/tip-tap-editor";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import categoryApi from "src/apis/categoryApi";
import chapterApi from "src/apis/chapterApi";
import courseApi from "src/apis/courseApi";
import teacherApi from "src/apis/teacherApi";
import Icon from "src/components/Icon/Icon";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import LayoutContainer from "src/layouts/LayoutContainer/LayoutContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";
import * as Yup from "yup";
import Chapter, { IChapter } from "./Chapter";
import "./TeacherCourseDetail.scss";

import InputFile from "src/components/InputFile";
import { ICourseStatues } from "src/types/course";
import IntendedLearners from "../IntendedLearners";
import Requirements from "../Requirements";
import Targets from "../Targets";
import { ICategories } from "../TeacherCourse";

const TeacherCourseDetail: React.FC = () => {
  document.title = "Quản lý khóa học";

  const { id } = useParams();
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(0);
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [slug, setSlug] = useState("");
  const [courseStatus, setCourseStatus] = useState();
  const [image, setImage] = useState("");
  const nav = useNavigate();

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
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập khóa học"),
      originalPrice: Yup.number().required("Vui lòng nhập giá gốc khóa học"),
      currentPrice: Yup.number().required(
        "Vui lòng nhập giá khuyến mãi khóa học"
      ),
    }),
    validate: (values) => {
      let errors = {};
      if (Number(values.currentPrice) > Number(values.originalPrice)) {
        errors = {
          ...errors,
          currentPrice: "Giá khuyến mãi phải nhỏ hơn giá gốc",
        };
      }

      return errors;
    },
    onSubmit: async (values) => {
      dispatch(isPending());
      courseApi
        .updateCourse(slug, {
          ...values,
          thumbnail: image,
          originalPrice: Number(values.originalPrice),
          currentPrice: Number(values.currentPrice),
        })
        .then((res: any) => {
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
  }, [getCourseDetails, dispatch]);

  const handleAddChapter = (index: number) => {
    dispatch(isPending());
    chapterApi.addChapter(id, index, "default").then(() => {
      chapterApi.getChapters(id).then((res: any) => {
        dispatch(isSuccess());
        setChapters(res.chapters);
      });
    });
  };

  const postImage = (image: any) => {
    dispatch(isPending());
    const formData = new FormData();
    formData.append("image", image);

    courseApi
      .uploadImage(formData)
      .then((res: any) => {
        dispatch(isSuccess());
        const { message, url } = res;
        toast.success(`${message}`, {
          position: "bottom-right",
        });
        setImage(url);
      })
      .catch((err) => {
        dispatch(isSuccess());
        console.log("Lỗi rồi", err);
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
            {navbar === 0
              ? courseStatus && (
                  <p>
                    Trạng thái khóa học:{" "}
                    <span>{ICourseStatues[courseStatus]}</span>
                  </p>
                )
              : navbar === 1 && (
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
                <InputFile
                  className="thumbnail-course"
                  label="Thumbnail khóa học"
                  valueDefault={formik.values.thumbnail}
                  // onChange={(value) => formik.setFieldValue("thumbnail", value)}
                  onChange={(value) => postImage(value)}
                />
                <Input
                  required
                  label="Tên khóa học"
                  placeholder="Nhập tên khóa học"
                  errorMessage={formik.touched.name ? formik.errors.name : ""}
                  {...formik.getFieldProps("name")}
                />
                <Input
                  required
                  label="Giá gốc khóa học"
                  placeholder="1.200.000 đ"
                  errorMessage={
                    formik.touched.originalPrice
                      ? formik.errors.originalPrice
                      : ""
                  }
                  {...formik.getFieldProps("originalPrice")}
                />
                <Input
                  required
                  label="Giá khuyến mãi khóa học"
                  placeholder="1.000.000 đ"
                  errorMessage={
                    formik.touched.currentPrice
                      ? formik.errors.currentPrice
                      : ""
                  }
                  {...formik.getFieldProps("currentPrice")}
                />
                <div className="editor">
                  <h2>
                    Nội dung khóa học <span>*</span>
                  </h2>
                  <TiptapEditor
                    style={{
                      height: 70,
                    }}
                    content={formik.values.description}
                    onChange={(value) =>
                      formik.setFieldValue("description", value)
                    }
                    placeholder="Thêm một mô tả. Bao gồm những gì học sinh sẽ có thể làm sau khi hoàn thành bài giảng."
                  />
                </div>
                {formik.touched.description && (
                  <div className="editor-error">
                    {formik.errors.description}
                  </div>
                )}
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
                  Lưu thông tin
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
                      onClick={() => handleAddChapter(index + 1)}
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
                  onClick={() => handleAddChapter(chapters.length + 1)}
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
