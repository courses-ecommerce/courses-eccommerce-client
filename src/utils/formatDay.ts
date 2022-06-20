import { format } from "date-fns";

const formatDate = (value: any, formatDateType: string): string => {
  return value && format(new Date(value), formatDateType);
};

export const dateGetTime = (day: any) => {
  return new Date(day).getTime();
};

export default formatDate;
