import { Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import localStorage from "redux-persist/es/storage";
import authApi from "src/apis/authApi";
import Input from "src/components/Input";
import { isLogin, isPending, isSuccess } from "src/reducers/authSlice";
import { ILogin } from "src/types/auth";
import * as Yup from "yup";
import AuthLayout from "../AuthLayout/AuthLayout";
// import FacebookLogin from "../SocialLogin/FacebookLogin";
import GoogleLogin from "../SocialLogin/GoogleLogin";

const Login = () => {
  const dispatch = useDispatch();

  const postLogin = async (data: ILogin) => {
    dispatch(isPending());
    try {
      const response = await authApi.postLogin(data);
      console.log(response);
      const { refreshToken, role, token }: any = response;
      dispatch(isLogin(role));

      // dispatch(isLogin(response));
      toast.success("Đăng nhập thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", error);
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
    </AuthLayout>
  );
};
export default Login;
