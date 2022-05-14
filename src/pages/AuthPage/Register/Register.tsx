import { Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "src/apis/authApi";
import Dropdown from "src/components/Dropdown";
import Icon from "src/components/Icon/Icon";
import Input from "src/components/Input";
import { genderTypes } from "src/data";
import { isEmail, phoneRegExp } from "src/utils";
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
        .required("Vui lòng nhập gmail"),

      verifyCode: Yup.string().required("Vui lòng nhập mã xác thực email"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
      passwordConfirm: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
      phone: Yup.string().matches(phoneRegExp, "Nhập đúng số điện thoại"),
    }),
    onSubmit: (values) => {
      console.log("lấy được dữ liệu là", values);
    },
  });

  const handleVerifyEmail = () => {
    if (!isEmail(formik.values.email)) {
      toast.warning("Địa chỉ email không hợp lệ, xin vui lòng nhập lại", {
        position: "bottom-right",
      });
    } else {
      toast.info("Đang tiến hành gửi email", {
        position: "bottom-right",
      });
      verifyEmail(formik.values.email);
    }
  };

  const verifyEmail = async (email: string) => {
    try {
      const response = await authApi.postVerifyEmailRegister(email);
      console.log(response);
    } catch (error) {
      toast.error(`${error}`, { position: "bottom-right" });
    }
  };

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
          <div className="verify-code" onClick={handleVerifyEmail}>
            <Input
              required
              label="Mã xác nhận email"
              placeholder="Nhập mã xác thực email"
              errorMessage={
                formik.touched.verifyCode ? formik.errors.verifyCode : ""
              }
              {...formik.getFieldProps("verifyCode")}
            />
            <span className="icon">
              <Icon icon="send" size={25} />
            </span>
          </div>

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
