import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React, { FC, useState } from "react";
import { notificationMessage } from "src/utils";
import Input from "../Input";
import { InputCheckBoxProps } from "./InputCheckBox.type";

const InputCheckBox: FC<InputCheckBoxProps> = ({
  label,
  value = false,
  checked,
  disabled,
  hint,
  hideErrorMessage,
  errorMessage,
  style,
  onChange,
}) => {
  const [answer, setAnswer] = useState("");

  const handleValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAnswer(value);
    onChange?.({
      value: false,
      label: value,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.checked;

    if (!answer) {
      return notificationMessage("error", "Nội dung không được để trống!");
    }
    onChange?.({
      value: status,
      label: answer,
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={5} style={style}>
      <FormControlLabel
        style={{ margin: 0 }}
        control={
          <React.Fragment>
            <Input
              borderType="square"
              placeholder="Nhập đáp án câu trả lời"
              onChange={handleValueInput}
              disabled={disabled}
            />
            <Checkbox
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
            />
          </React.Fragment>
        }
        label={label}
      />
    </Box>
  );
};

export default InputCheckBox;
