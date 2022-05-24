import { format } from "date-fns";

const formatDate = (value: any, formatDateType: string): string => {
  return format(new Date(value), formatDateType);
};

export default formatDate;
