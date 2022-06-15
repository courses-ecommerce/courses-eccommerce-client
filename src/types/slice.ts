import { IUser } from ".";

export interface IAuthSlice {
  isLoading: boolean;
  isAuth: boolean;
  isRole: string;
  amount_cart?: number;
  userInfo: IUser;
}
