import { Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import Input from "src/components/Input";
import * as Yup from "yup";
import AuthLayout from "../AuthLayout/AuthLayout";

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      verifyCode: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Phải là email")
        .max(20, "Tối đa 20 kí tự")
        .required("Vui lòng nhập gmail"),

      verifyCode: Yup.string().required("Vui lòng nhập mã xác thực email"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: (values) => {
      console.log("lấy được dữ liệu là", values);
    },
  });

  return (
    <AuthLayout title="Lấy lại mật khẩu">
      <form onSubmit={formik.handleSubmit}>
        <Input
          required
          label="Email"
          placeholder="Nhập địa chỉ gmail"
          errorMessage={formik.touched.email ? formik.errors.email : ""}
          {...formik.getFieldProps("email")}
        />
        <Input
          required
          label="Mã xác nhận email"
          placeholder="Nhập mã xác nhận"
          errorMessage={
            formik.touched.verifyCode ? formik.errors.verifyCode : ""
          }
          {...formik.getFieldProps("verifyCode")}
        />
        <Input
          required
          type="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          errorMessage={formik.touched.password ? formik.errors.password : ""}
          {...formik.getFieldProps("password")}
        />

        <Button type="submit" variant="contained" color="error">
          Lấy lại mật khẩu
        </Button>
      </form>
      <div className="extra-links">
        <Link to="/login">Quay lại đăng nhập</Link>
        <Link className="register" to="/register">
          Đăng ký tài khoản
        </Link>
      </div>
    </AuthLayout>
  );
};
export default ForgotPassword;
