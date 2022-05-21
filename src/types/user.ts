export interface IGetUser {
  page?: string;
  limit?: string;
  email?: string;
  role?: string;
  sort?: string;
}
export interface ICreateNewUser {
  email: string;
  password: string;
  fullName: string;
  birthday?: string;
  gender?: boolean;
  phone?: string;
}
