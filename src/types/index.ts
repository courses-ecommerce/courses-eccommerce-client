//for auth
export interface IAuth {
  isLoading: boolean;
  isAuth: boolean;
  isRole: string;
}

export interface IAccount {
  userName: string;
  password: string;
}

export interface IUser {
  email: string;
  password: string;
  fullName: string;
  birthday?: string;
  gender?: boolean;
  phone?: string;
}

export interface ICourse {
  name: string;
  thumbnail: string;
  categories?: string[];
}
