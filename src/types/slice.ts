import { IUser } from ".";
import { IVideo } from "./video";

export interface IAuthSlice {
  isLoading: boolean;
  isAuth: boolean;
  isRole: string;
  amount_cart?: number;
  userInfo: IUser;
  videoView: IVideo;
}
