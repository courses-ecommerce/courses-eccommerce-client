import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const TeacherCourseDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(0);

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
    courseApi.getCourseDetail(id).then((res: any) => {
      formik.setValues(res.course);
    });
  }, [id]);

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
            <div className=""></div>
          )}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default TeacherCourseDetail;
