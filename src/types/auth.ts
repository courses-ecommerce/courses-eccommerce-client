//for auth

export interface ILogin {
  email: string;
  password: string;
  keepLogin?: boolean;
}

export interface IRegister {
  email: string;
  password: string;
  verifyCode: string;
  fullName: string;
  birthday?: string;
  gender?: string;
  phone?: string;
}

export interface IForgotPassword {
  email: string;
  password: string;
  verifyCode: string;
}

export interface IUpdatePassword {
  old_password: string;
  new_password: string;
  email: string;
}
