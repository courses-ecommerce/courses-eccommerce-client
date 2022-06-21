import { IUser } from ".";

export interface IDetailInvoice {
  _id?: string;
  amount?: number;
  courseThumbnail?: string;
  couponCode?: string;
  courseAuthor?: string;
  courseCurrentPrice?: number;
  courseId?: string;
  courseName?: string;
  courseSlug?: string;
  discount?: number;
  invoice?: string;
  payForAuthor?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IInvoice {
  _id?: string;
  paymentMethod?: string;
  paymentPrice?: number;
  status?: string;
  totalDiscount?: number;
  totalPrice?: number;
  transactionId?: string;
  createdAt?: string;
  updatedAt?: string;
  detailInvoices?: IDetailInvoice[];
  user?: IUser;
}
