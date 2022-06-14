import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import authApi from "src/apis/authApi";
import { isLogin, isPending, isSuccess } from "src/reducers/authSlice";

const GoogleLoginBtn = () => {
  const dispatch = useDispatch();

  const responseGoogle = (response: any) => {
    const { accessToken } = response;
    console.log("đã lấy được response của gg là", response);
    console.log("đã lấy được access token là", { accessToken });

    if (!accessToken) return;
    postLoginGoogle(accessToken);
  };

  const postLoginGoogle = async (access_token: string) => {
    const params = { access_token };
    dispatch(isPending());
    try {
      const response = await authApi.postLoginGoogle(params);
      console.log(response);
      const { refreshToken, token, role }: any = response;
      localStorage.setItem("access_token", JSON.stringify(token));
      dispatch(isLogin(role));
    } catch (error) {
      console.log("lỗi rồi", error);
      toast.warning(`${error}`, {
        position: "bottom-right",
      });
      dispatch(isSuccess());
    }
  };

  return (
    <GoogleLogin
      clientId="72783105646-cipflukf562b889osbe6ceip05gul94p.apps.googleusercontent.com"
      buttonText="Đăng nhập bằng google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginBtn;
