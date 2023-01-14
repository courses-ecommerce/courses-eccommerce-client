import { Box, Typography } from "@mui/material";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { downloadIMG } from "src/assets";
import formatCharacter from "src/utils/formatCharacter";
import "./InputUploadFile.scss";

/**
 * Now, it has not support upload multiple files yet
 */

interface InputUploadFileProps {
  label?: string;
  value?: string | string[];
  valueDefault?: string;
  onChange: (value: any) => void;
  multiple?: boolean;
  errorMessage?: string;
  labelImg?: boolean;
  className?: string;
}

const InputUploadFile: React.FC<InputUploadFileProps> = ({
  label,
  value,
  valueDefault,
  multiple = false,
  onChange,
  errorMessage,
  labelImg = true,
  className = "",
}) => {
  const [imagePreview, setImagePreview] = useState(valueDefault);

  useEffect(() => {
    setImagePreview(valueDefault);
  }, [valueDefault]);

  const handleChangeImage = (e: React.FormEvent<HTMLInputElement>) => {
    const _target = e.target as HTMLInputElement;

    if (_target.files && _target.files.length > 0) {
      const convertBtoMB = formatCharacter.convertIntoMB(_target.files[0].size);

      if (convertBtoMB >= 2) {
        toast.warning("Hình ảnh không được quá 2MB", {
          position: "bottom-right",
        });
        return;
      } else {
        // setImage(_target.files[0]);
        onChange(_target.files[0]);

        const url_img = URL.createObjectURL(_target.files[0]);
        setImagePreview(url_img);
        // URL.revokeObjectURL(url_img);
        return;
      }
    } else {
      toast.warning(
        "Định dạng file không được hỗ trợ. Vui lòng chỉ chọn file hình ảnh (*.png, *.jpg, *.jpeg)",
        { position: "bottom-center" }
      );
    }
  };

  return (
    <Box className="input-file" display="flex" flexDirection="column" gap={10}>
      {label && (
        <Typography variant="body1" component="span" fontWeight={700}>
          {label}
        </Typography>
      )}
      <input
        id="file_input"
        type="file"
        onChange={(e) => handleChangeImage(e)}
        multiple={multiple}
        accept="image/png, image/jpg, image/jpeg"
      />

      <label htmlFor="file_input">
        <img
          className={classNames(className)}
          src={imagePreview && labelImg ? imagePreview : downloadIMG}
          alt=""
        />
      </label>
      <Typography
        variant="h2"
        component="span"
        marginTop={0.5}
        fontWeight={600}
        color="#f52727"
      >
        {errorMessage}
      </Typography>
    </Box>
  );
};

export default InputUploadFile;
