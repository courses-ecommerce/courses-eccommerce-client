import GoogleLogin from "react-google-login";

const GoogleLoginBtn = () => {
  const responseGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="294692584033-udrskhmtd5g7fj2f18eduqvudlbpgeaf.apps.googleusercontent.com"
      buttonText="Đăng nhập bằng google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginBtn;
