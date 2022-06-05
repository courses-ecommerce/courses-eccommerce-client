export interface IGetUser {
  page?: string | number;
  limit?: string | number;
  email?: string;
  role?: string;
  sort?: string;
}
export interface ICreateNewUser {
  email: string;
  password: string;
  fullName: string;
  birthday?: string;
  gender?: boolean | string;
  phone?: string;
}
