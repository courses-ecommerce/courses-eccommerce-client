import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import * as React from "react";
import Icon from "../Icon/Icon";

const InputSelect: React.FC<InputSelectProps> = (props) => {
  const {
    label,
    list,
    name,
    errorMessage,
    required,
    onChange,
    defaultValue,
    style,
    icon,
    hideErrorMessage = false,
    border = true,
    disabled = false,
    ...rest
  } = props;

  const [value, setValue] = React.useState<any>({});

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    onChange?.(event);
  };

  return (
    <Box sx={{ minWidth: 80 }}>
      <InputLabel
        sx={{
          fontSize: "14px",
          color: "#000",
          fontWeight: "bold",
          marginBottom: 0.4,
        }}
      >
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </InputLabel>
      <FormControl fullWidth>
        <Select
          disabled={disabled}
          onChange={handleChange}
          inputProps={{
            name,
          }}
          sx={{
            fontSize: "14px",
            height: 47,
            borderRadius: "12px",
            fontWeight: "bold",
            background: "white",
            "& .MuiOutlinedInput-input": {
              display: "flex",
              gap: "8px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: border ? "1px solid #e2e8f0" : "none",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: border ? "1px solid #e2e8f0" : "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: border ? "1px solid #1976d2" : "none",
            },
            ...style,
          }}
          {...rest}
          value={value}
        >
          {list.map((item: any, index) => (
            <MenuItem
              value={item.value}
              key={index}
              sx={{
                fontSize: "14px",
                color: "#000",
                fontWeight: "medium",
                gap: "8px",
              }}
            >
              {icon && <Icon icon={icon} size={18} />}
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!hideErrorMessage && (
        <Typography
          variant="h2"
          fontSize={12}
          height={15}
          marginTop={0.5}
          fontWeight={600}
          color={"#f52727"}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default InputSelect;
