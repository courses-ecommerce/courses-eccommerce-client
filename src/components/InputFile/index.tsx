import React, { useState } from "react";
import { toast } from "react-toastify";
import { downloadIMG } from "src/assets";
import "./InputFile.scss";

interface InputFileProps {
  label?: string;
  value?: string | string[];
  valueDefault?: string;
  onChange: (value: any) => void;
  multiple?: boolean;
  errorMessage?: string;
  labelImg?: boolean;
}

const InputFile: React.FC<InputFileProps> = ({
  label,
  value,
  valueDefault,
  multiple = false,
  onChange,
  errorMessage,
  labelImg = true,
}) => {
  // const [image, setImage] = useState<any>([]);

  const [imagePreview, setImagePreview] = useState(valueDefault);

  const handleChangeImage = (e: React.FormEvent<HTMLInputElement>) => {
    const _target = e.target as HTMLInputElement;
    // let formData = new FormData();
    if (_target.files && _target.files.length > 0) {
      // console.log(_target.files[0].size);
      const convertBtoMB = Math.floor(
        _target.files[0].size / Math.pow(1024, 2)
      );
      if (convertBtoMB > 0) {
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
    <div className="input-file">
      {label && <span>{label}</span>}
      <input
        id="file_input"
        type="file"
        onChange={(e) => handleChangeImage(e)}
        multiple={multiple}
        accept="image/png, image/jpg, image/jpeg"
      />

      <label htmlFor="file_input">
        {imagePreview && labelImg ? (
          <img src={imagePreview} alt="" />
        ) : (
          <img src={downloadIMG} alt="" />
        )}
      </label>
      <div className="error">{errorMessage}</div>
    </div>
  );
};

export default InputFile;
