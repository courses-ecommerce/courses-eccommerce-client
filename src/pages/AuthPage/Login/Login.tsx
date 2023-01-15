import { Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "src/apis/authApi";
import FormInput from "src/components/FormInput";
import { getUserInfo, isLogin, isPending, isSuccess } from "src/reducers";

import { ILogin } from "src/types/auth";
import * as Yup from "yup";
import AuthPageContent from "..";
import SocialLogin from "../SocialLogin";

const Login = () => {
  const dispatch = useDispatch();

  const postLogin = async (data: ILogin) => {
    dispatch(isPending());
    try {
      const response = await authApi.postLogin(data);
      // console.log(response);
      // const { refreshToken, user, role, token }: any = response;
      const { user, role, token }: any = response;

      localStorage.setItem("access_token", JSON.stringify(token));

      //get role,user_info
      dispatch(isLogin(role));
      dispatch(getUserInfo(user));

      toast.success("Đăng nhập thành công", { position: "bottom-right" });
    } catch (error: any) {
      console.log("lỗi rồi", { error });
      toast.warning(`${error}`, {
        position: "bottom-right",
      });
      dispatch(isSuccess());
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Vui lòng nhập đúng email")
        .required("Vui lòng nhập địa chỉ email"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: (values) => {
      // console.log("lấy được dữ liệu là", values);
      postLogin(values);
    },
  });

  return (
    <AuthPageContent.AuthLayout title="Đăng nhập hệ thống">
      <form onSubmit={formik.handleSubmit}>
        <FormInput.Input
          required
          label="Địa chỉ email"
          placeholder="Nhập địa chỉ gmail"
          errorMessage={formik.touched.email ? formik.errors.email : ""}
          {...formik.getFieldProps("email")}
        />
        <FormInput.Input
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
          <SocialLogin.GoogleLogin />
          {/* <FacebookLogin /> */}
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
    </AuthPageContent.AuthLayout>
  );
};
export default Login;
