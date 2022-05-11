import { useFormik } from "formik";
import React from "react";
import AuthLayout from "../AuthLayout/AuthLayout";
import * as Yup from "yup";
import Input from "src/components/Input";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import FacebookLogin from "../SocialLogin/FacebookLogin";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Phải là email")
        .max(20, "Tối đa 20 kí tự")
        .required("Vui lòng nhập địa chỉ email"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: (values) => {
      console.log("lấy được dữ liệu là", values);
    },
  });

  return (
    <AuthLayout title="Đăng nhập hệ thống">
      <form onSubmit={formik.handleSubmit}>
        <Input
          required
          label="Địa chỉ email"
          placeholder="Nhập địa chỉ gmail"
          errorMessage={formik.touched.email ? formik.errors.email : ""}
          {...formik.getFieldProps("email")}
        />
        <Input
          required
          type="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          errorMessage={formik.touched.password ? formik.errors.password : ""}
          {...formik.getFieldProps("password")}
        />

        <Button type="submit" variant="contained">
          Đăng nhập
        </Button>
      </form>
      <div className="extra-links">
        <div>
          <GoogleLogin />
          <FacebookLogin />
        </div>
        <div>
          <Link className="register" to="/register">
            Đăng ký tài khoản
          </Link>
          <Link className="forgot_password" to="/forgot_password">
            Quên mật khẩu
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
export default Login;
