import React, { useEffect, useState } from "react";
import LayoutContainer from "src/components/LayoutContainer/LayoutContainer";
import "./TeacherCourse.scss";
import Input from "src/components/Input";
import { Button } from "@mui/material";
import ModalContainer from "src/components/ModalContainer";
import { Box } from "@mui/system";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputSelect from "src/components/InputSelect";
import categoryApi from "src/apis/categoryApi";
import courseApi from "src/apis/courseApi";
import teacherApi from "src/apis/teacherApi";
import { useNavigate } from "react-router-dom";
import { ICourse } from "src/types";
import { useDispatch } from "react-redux";
import { isPending, isSuccess } from "src/reducers/authSlice";
import ReactQuill from "react-quill";

export interface ICategories {
  name: string;
  value: string;
}

const TeacherCourse: React.FC = () => {
  document.title = "Khoá học của tôi";

  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const getListCourses = () => {
    teacherApi.getCourses().then((res: any) => {
      dispatch(isSuccess());
      setCourses(res.courses);
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      originalPrice: "",
      currentPrice: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập khóa học"),
      description: Yup.string().required("Vui lòng nhập nội dung khóa học"),
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
        .createNewCourse({
          ...values,
          originalPrice: Number(values.originalPrice),
          currentPrice: Number(values.currentPrice),
        })
        .then(() => {
          formik.resetForm({
            values: {
              name: "",
              description: "",
              category: categories[0].value,
              originalPrice: "",
              currentPrice: "",
            },
          });
          setShowModal(false);
          getListCourses();
        });
    },
  });

  useEffect(() => {
    dispatch(isPending());
    categoryApi.getCategories().then((res: any) => {
      setCategories(
        res.categories.map((category: any) => {
          return { value: category._id, name: category.name };
        })
      );
      formik.setFieldValue("category", res.categories[0]._id);
    });
    getListCourses();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutContainer titleShow={false} footerShow={false}>
      <div className="teacher">
        <h2 className="teacher_title">Khoá học của tôi</h2>

        <div className="teacher_navbar">
          <Input
            style={{ width: 300 }}
            placeholder="Nhập tên khoá học của bạn"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowModal(true)}
            sx={{
              height: 45,
            }}
          >
            Tạo khoá học mới
          </Button>
        </div>

        <div className="teacher_course-list">
          {courses.map((course, index) => (
            <div className="teacher_course-item" key={index}>
              <div className="left">
                <img
                  src="https://s.udemycdn.com/course/200_H/placeholder.jpg"
                  alt="course"
                />
              </div>
              <div className="right">
                <div className="item">
                  <span>{course.name}</span>
                  <span
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: course.description || "",
                    }}
                  />
                </div>
                <div className="overlay"></div>
                <div
                  className="edit"
                  onClick={() => nav("/teacher/course/" + course._id)}
                >
                  Chỉnh sửa / Quản lý khoá học
                </div>
                {/* <div className="item">
                  <span>Finish your course</span>
                  <span>
                    <LinearProgress
                      variant="determinate"
                      value={20}
                      sx={{ borderRadius: 12, height: 8 }}
                    />
                  </span>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalContainer
        width={700}
        title="Thêm khóa học"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <form id="create-course" onSubmit={formik.handleSubmit}>
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}
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
              label="Giá gốc khóa học"
              placeholder="1.200.000 đ"
              errorMessage={
                formik.touched.originalPrice ? formik.errors.originalPrice : ""
              }
              {...formik.getFieldProps("originalPrice")}
            />
            <Input
              required
              label="Giá khuyến mãi khóa học"
              placeholder="1.000.000 đ"
              errorMessage={
                formik.touched.currentPrice ? formik.errors.currentPrice : ""
              }
              {...formik.getFieldProps("currentPrice")}
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
                onChange={(value) => formik.setFieldValue("description", value)}
                placeholder="Thêm một mô tả. Bao gồm những gì học sinh sẽ có thể làm sau khi hoàn thành bài giảng."
              />
            </div>
            {formik.touched.description && (
              <div className="editor-error">{formik.errors.description}</div>
            )}
            <InputSelect
              label="Loại khóa học"
              list={categories}
              onChange={(e) => formik.setFieldValue("category", e.target.value)}
              defaultValue={formik.values.category}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => setShowModal(true)}
            sx={{
              height: 45,
              width: "100%",
            }}
          >
            Thêm
          </Button>
        </form>
      </ModalContainer>
    </LayoutContainer>
  );
};

export default TeacherCourse;
