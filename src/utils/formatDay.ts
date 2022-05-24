import { format } from "date-fns";

const formatDate = (
  value: number | string,
  formatDateType: "MM/dd/yyyy"
): string => {
  return format(new Date(value), formatDateType);
};

export default formatDate;
