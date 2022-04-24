//for auth
export interface IAuth {
  isLoading: boolean;
  isAuth: boolean;
  isRole: string;
}

export interface IAccount {
  email: string;
  password: string;
  keepLogin?: boolean;
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

// for popover
export interface INotify {
  image: string;
  title?: string;
  isRead?: boolean;
  content: string;
  time: string;
}

export interface IMessage {
  image: string;
  title?: string;
  isRead?: boolean;
  content: string;
  time: string;
}
