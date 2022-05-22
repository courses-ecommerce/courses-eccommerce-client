import React, { useEffect, useState } from "react";
import downloadIMG from "../../assets/download.png";
import Icon from "../Icon/Icon";
import "./InputFile.scss";
import { v4 as uuid } from "uuid";
import Loading from "../Loading/Loading";

interface InputFileProps {
  label: string;
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  errorMessage?: string;
}

const InputFile: React.FC<InputFileProps> = ({
  label,
  value,
  multiple = false,
  onChange,
  errorMessage,
}) => {
  const [image, setImage] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChangeImage = (e: React.FormEvent<HTMLInputElement>) => {
    // setLoading(true);
    const _target = e.target as HTMLInputElement;
    let imageCheck: boolean = true;
    let formData = new FormData();
    if (_target.files) {
      if (_target.files.length > 5) {
        setLoading(false);
        // enqueueSnackbar("Tối đa 1 lần upload là 5 hình", {
        //   variant: "error",
        //   autoHideDuration: 2000,
        //   anchorOrigin: {
        //     vertical: "top",
        //     horizontal: "right",
        //   },
        // });
        // return;
      } else if (_target.files.length !== 0) {
        Array.from(_target.files).forEach((file, i) => {
          if (file.type.includes("image")) {
            const convertBtoMB = Math.floor(file.size / Math.pow(1024, 2));
            // if (convertBtoMB > 1) {
            //   enqueueSnackbar("Hình ảnh tối đa 1MB", {
            //     variant: "error",
            //     autoHideDuration: 2000,
            //     anchorOrigin: {
            //       vertical: "top",
            //       horizontal: "right",
            //     },
            //   });
            //   return;
            // }
            multiple
              ? formData.append("files", file)
              : formData.append("file", file);
          } else {
            imageCheck = false;
          }
        });

        if (!imageCheck) {
          setLoading(false);
          // enqueueSnackbar(
          //   "Định dạng file không được hỗ trợ. Vui lòng chỉ chọn file hình ảnh (*.png, *.jpg, *.jpeg)",
          //   {
          //     variant: "error",
          //     autoHideDuration: 2000,
          //     anchorOrigin: {
          //       vertical: "top",
          //       horizontal: "right",
          //     },
          //   }
          // );
          return;
        }
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    value && multiple
      ? setImages(value as string[])
      : setImage(value as string);
  }, [value]);

  const id = uuid();
  const id2 = uuid() + new Date().getTime();

  return (
    <div className="input-file">
      <h2>{label}</h2>
      <input
        id={multiple ? id2 : id}
        type="file"
        onChange={(e) => handleChangeImage(e)}
        multiple={multiple}
        accept="image/png, image/jpg, image/jpeg"
      />
      {multiple ? (
        <div className="list">
          {images.map((img, index) => (
            <div className="image" key={index}>
              <img src={img} alt="" />
              <Icon
                icon="close"
                className="icon"
                size={15}
                color=""
                onClick={() =>
                  onChange(images.filter((image) => image !== img))
                }
              />
            </div>
          ))}
          <label htmlFor={id2}>
            <img src={downloadIMG} alt="" />
          </label>
        </div>
      ) : (
        <label htmlFor={id}>
          {image ? (
            <img src={image} alt="" />
          ) : (
            <img src={downloadIMG} alt="" />
          )}
        </label>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
      {/* {loading && <Loading />} */}
    </div>
  );
};

export default InputFile;
