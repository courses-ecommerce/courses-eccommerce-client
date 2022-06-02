import { IUser } from ".";

export interface IAuthSlice {
  isLoading: boolean;
  isAuth: boolean;
  isRole: string;
  userInfo: IUser;
}
