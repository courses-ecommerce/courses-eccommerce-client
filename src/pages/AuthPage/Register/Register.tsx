import { Button, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "src/apis/authApi";
import FormControl from "src/components/FormControl";
import { isPending, isSuccess } from "src/reducers";
import { IRegister } from "src/types";
import isVerifyCharacter from "src/utils/isVerifyCharacter";
import regexCharacter from "src/utils/regexCharacter";
import * as Yup from "yup";
import AuthPageContent from "..";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      verifyCode: "",
      password: "",
      // passwordConfirm: "",
      // birthday: "",
      phone: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Vui lòng nhập họ tên"),
      email: Yup.string()
        .email("Phải là email")
        .required("Vui lòng nhập gmail"),

      verifyCode: Yup.string().required("Vui lòng nhập mã xác thực"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
      // passwordConfirm: Yup.string()
      //   .min(8, "Mật khẩu ít nhất 8 kí tự")
      //   .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng nhau"),
      phone: Yup.string().matches(
        regexCharacter.phoneRegExp,
        "Nhập đúng số điện thoại"
      ),
    }),
    onSubmit: (values) => {
      // console.log("lấy được dữ liệu là", values);
      postRegister(values);
    },
  });

  const handleVerifyEmail = () => {
    if (!isVerifyCharacter.isEmail(formik.values.email)) {
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
      const response = await authApi.postVerifyEmailRegister(params);
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

  const postRegister = async (params: IRegister) => {
    dispatch(isPending());
    try {
      await authApi.postRegister(params);
      dispatch(isSuccess());

      toast.warning("Tạo tài khoản thành công, quay lại đăng nhập", {
        position: "bottom-right",
      });
      navigate("/login");
    } catch (error) {
      toast.warning(`${error}`, { position: "bottom-right" });
      dispatch(isSuccess());
    }
  };

  return (
    <AuthPageContent.AuthLayout title="Đăng ký tài khoản">
      <form
        id="register-form"
        className="register-form"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <FormControl.Input
            required
            label="Địa chỉ email"
            placeholder="Nhập địa chỉ email"
            errorMessage={formik.touched.email ? formik.errors.email : ""}
            {...formik.getFieldProps("email")}
          />
          <div className="verify-code">
            <FormControl.Input
              required
              label="Mã xác nhận email"
              placeholder="Nhập mã xác nhận"
              errorMessage={
                formik.touched.verifyCode ? formik.errors.verifyCode : ""
              }
              {...formik.getFieldProps("verifyCode")}
            />
            <Tooltip title="Nhận mã xác thực gmail">
              <Button
                variant="contained"
                // endIcon={<SendIcon />}
                onClick={handleVerifyEmail}
              >
                Gửi mã
              </Button>
            </Tooltip>
          </div>

          <FormControl.Input
            required
            type="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            errorMessage={formik.touched.password ? formik.errors.password : ""}
            {...formik.getFieldProps("password")}
          />
          {/* <Input
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
          /> */}
        </div>

        <div>
          <FormControl.Input
            required
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            errorMessage={formik.touched.fullName ? formik.errors.fullName : ""}
            {...formik.getFieldProps("fullName")}
          />
          <FormControl.Input
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            errorMessage={formik.touched.phone ? formik.errors.phone : ""}
            {...formik.getFieldProps("phone")}
          />
          {/* <Input
            type="date"
            label="Ngày sinh nhật"
            {...formik.getFieldProps("birthday")}
          />
          <Dropdown label="Giới tính" list={genderTypes} /> */}
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
    </AuthPageContent.AuthLayout>
  );
};
export default Register;
