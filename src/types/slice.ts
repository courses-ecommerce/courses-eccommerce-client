export interface IAuthSlice {
  isLoading: boolean;
  isAuth: boolean;
  isRole: string;
}

export interface ITokenSlice {
  refreshToken: string;
  accessToken: Object;
}
