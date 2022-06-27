import React from "react";
import { Pagination as PaginationMui } from "@mui/material";

interface PaginationProps {
  pageActive?: number;
  total?: number;
  variant?: "outlined" | "text";
  color?: "primary" | "secondary" | "standard";
  disabled?: boolean;
  onChangeValue?: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  pageActive,
  variant = "outlined",
  color = "primary",
  disabled = false,
  onChangeValue,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // console.log("value", value);

    onChangeValue?.(value);
    // setPage(value);
  };

  return (
    <PaginationMui
      onChange={handleChange}
      page={pageActive}
      count={total}
      color={color}
      variant={variant}
      disabled={disabled}
    />
  );
};
export default Pagination;
