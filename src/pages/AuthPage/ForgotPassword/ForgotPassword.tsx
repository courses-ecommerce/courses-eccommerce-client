import SendIcon from "@mui/icons-material/Send";
import { Button, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "src/apis/authApi";
import Input from "src/components/Input";
import { isPending, isSuccess } from "src/reducers/authSlice";
import { IForgotPassword } from "src/types/auth";
import { isEmail } from "src/utils";
import * as Yup from "yup";
import AuthLayout from "../AuthLayout/AuthLayout";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      verifyCode: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Phải là email")
        .required("Vui lòng nhập gmail"),

      verifyCode: Yup.string().required("Vui lòng nhập mã xác thực"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: (values) => {
      // console.log("lấy được dữ liệu là", values);
      postForgotPassword(values);
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
    dispatch(isPending());
    const params = { email: email };
    try {
      const response = await authApi.postVerifyEmailForgotPassword(params);
      console.log(response);
      const { message }: any = response;
      dispatch(isSuccess());
      toast.success(`${message}. Vui lòng kiểm tra thử email`, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(`${error}`, { position: "bottom-right" });
      dispatch(isSuccess());
    }
  };

  const postForgotPassword = async (params: IForgotPassword) => {
    dispatch(isPending());
    try {
      await authApi.postForgotPassword(params);
      dispatch(isSuccess());

      toast.warning("Lấy lại mật khẩu thành công, quay lại đăng nhập", {
        position: "bottom-right",
      });
      navigate("/login");
    } catch (error) {
      toast.warning(`${error}`, { position: "bottom-right" });
      dispatch(isSuccess());
    }
  };

  return (
    <AuthLayout title="Lấy lại mật khẩu">
      <form className="forgot-password-form" onSubmit={formik.handleSubmit}>
        <Input
          required
          label="Email"
          placeholder="Nhập địa chỉ gmail"
          errorMessage={formik.touched.email ? formik.errors.email : ""}
          {...formik.getFieldProps("email")}
        />
        <div className="verify-code">
          <Input
            required
            label="Mã xác nhận email"
            placeholder="Nhập mã xác thực email"
            errorMessage={
              formik.touched.verifyCode ? formik.errors.verifyCode : ""
            }
            {...formik.getFieldProps("verifyCode")}
          />
          <Tooltip title="Nhận mã xác thực gmail">
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleVerifyEmail}
            ></Button>
          </Tooltip>
        </div>
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
