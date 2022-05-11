import { useFormik } from "formik";
import React from "react";
import AuthLayout from "../AuthLayout/AuthLayout";
import * as Yup from "yup";
import Input from "src/components/Input";
import { Button } from "@mui/material";

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .max(20, "Tối đa 20 kí tự")
        .required("Vui lòng nhập gmail"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: (values) => {
      console.log("lấy được dữ liệu là", values);
    },
  });

  return (
    <AuthLayout title="Lấy lại mật khẩu">
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Email"
          placeholder="Nhập địa chỉ gmail"
          errorMessage={formik.touched.email ? formik.errors.email : ""}
          {...formik.getFieldProps("email")}
        />
        <Input
          label="Mã xác nhận email"
          placeholder="Nhập mã xác nhận"
          errorMessage={formik.touched.email ? formik.errors.email : ""}
          {...formik.getFieldProps("email")}
        />
        <Input
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          errorMessage={formik.touched.password ? formik.errors.password : ""}
          {...formik.getFieldProps("password")}
        />

        <Button type="submit" variant="contained" color="error">
          Lấy lại mật khẩu
        </Button>
      </form>
      <div></div>
    </AuthLayout>
  );
};
export default ForgotPassword;
