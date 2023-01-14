import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import Icon from "../Icon";
import { InputSelectProps, ValueInputSelectType } from "./InputSelect.type";

const InputSelect: React.FC<InputSelectProps> = (props) => {
  const {
    label,
    list,
    name,
    errorMessage,
    required,
    border = true,
    onChange,
    defaultValue,
    style,
    icon,
    hideErrorMessage = false,
    disabled = false,
    placeholder,
    ...rest
  } = props;

  const [value, setValue] = React.useState<ValueInputSelectType>("");

  React.useEffect(() => {
    defaultValue && setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent<ValueInputSelectType>) => {
    const selectValue = event.target.value;

    setValue(selectValue);
    onChange?.(selectValue);
  };

  return (
    <Box>
      <InputLabel>
        <Typography variant="body2" component="span" fontWeight={700}>
          {label}
        </Typography>
        {required && (
          <Typography ml={2} variant="body1" color="red" component="span">
            *
          </Typography>
        )}
      </InputLabel>
      <FormControl fullWidth>
        <Select
          disabled={disabled}
          displayEmpty
          renderValue={() =>
            list.map((item, index) =>
              item.value === defaultValue ? (
                <Box key={index} fontWeight={500}>
                  {item.name}
                </Box>
              ) : (
                item.value === "" && (
                  <Box key={index} sx={{ color: "#aaa", fontWeight: "normal" }}>
                    {placeholder}
                  </Box>
                )
              )
            )
          }
          onChange={handleChange}
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
          component="span"
          marginTop={0.5}
          fontWeight={600}
          color="#f52727"
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default InputSelect;
