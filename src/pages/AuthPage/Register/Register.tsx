import { Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "src/components/Dropdown";
import Input from "src/components/Input";
import { genderTypes } from "src/data";
import { phoneRegExp } from "src/utils";
import * as Yup from "yup";
import AuthLayout from "../AuthLayout/AuthLayout";
import "./Register.scss";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      verifyCode: "",
      password: "",
      passwordConfirm: "",
      birthday: "",
      phone: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Vui lòng nhập họ tên"),
      email: Yup.string()
        .email("Phải là email")
        .max(20, "Tối đa 20 kí tự")
        .required("Vui lòng nhập gmail"),

      verifyCode: Yup.string().required("Vui lòng nhập mã xác thực email"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
      phone: Yup.string().matches(phoneRegExp, "Nhập đúng số điện thoại"),
    }),
    onSubmit: (values) => {
      console.log("lấy được dữ liệu là", values);
    },
  });

  return (
    <AuthLayout title="Đăng ký tài khoản">
      <form
        id="register-form"
        className="register-form"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <Input
            required
            label="Địa chỉ email"
            placeholder="Nhập địa chỉ email"
            errorMessage={formik.touched.email ? formik.errors.email : ""}
            {...formik.getFieldProps("email")}
          />
          <Input
            required
            label="Mã xác nhận email"
            placeholder="Nhập mã xác thực email"
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
          <Input
            required
            type="password"
            label="Nhập lại mật khẩu"
            placeholder="Xác nhận lại mật khẩu"
            errorMessage={
              formik.touched.passwordConfirm
                ? formik.errors.passwordConfirm
                : ""
            }
            {...formik.getFieldProps("passwordConfirm")}
          />
        </div>

        <div>
          <Input
            required
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            errorMessage={formik.touched.fullname ? formik.errors.fullname : ""}
            {...formik.getFieldProps("fullname")}
          />
          <Input
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            errorMessage={formik.touched.phone ? formik.errors.phone : ""}
            {...formik.getFieldProps("phone")}
          />
          <Input
            type="date"
            label="Ngày sinh nhật"
            {...formik.getFieldProps("birthday")}
          />
          <Dropdown label="Giới tính" list={genderTypes} />
        </div>
      </form>
      <Button
        form="register-form"
        type="submit"
        variant="contained"
        color="success"
        sx={{ marginTop: 2, width: "100%" }}
      >
        Đăng ký tài khoản
      </Button>
      <div className="extra-links">
        <Link className="login" to="/login">
          Đăng nhập tài khoản
        </Link>

        <Link className="forgot_password" to="/forgot_password">
          Quên mật khẩu
        </Link>
      </div>
    </AuthLayout>
  );
};
export default Register;
