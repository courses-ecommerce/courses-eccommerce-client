import { Alert, Box, Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import adminApi from "src/apis/adminApi";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";

interface UploadAccountByExcelProps {
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const UploadAccountByExcel: React.FC<UploadAccountByExcelProps> = ({
  show,
  onClose,
  setShow,
}) => {
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleUpload = async (e: any) => {
    const formData: any = new FormData();
    formData.append("file", e.target.files[0]);

    // console.log("param là", ...formData);
    dispatch(isPending());
    try {
      const response = await adminApi.uploadUserByExcel(formData);
      const { message, urlLogs }: any = response;
      console.log("thành công", response);

      if (!urlLogs) {
        setShow?.(true);
        toast.success(`${message}`, {
          position: "bottom-right",
        });
      } else {
        setError(urlLogs);
      }
    } catch (error) {
      setShow?.(false);
      toast.warning("Lỗi rồi", { position: "bottom-right" });
    }
    dispatch(isSuccess());
  };

  const handleOpenNewLink = () => {
    error && window.open(`https://hnam.works${error}`, "_blank");
    setError("");
    setShow?.(false);
  };

  return (
    <ModalContainer
      title="Upload người dùng bằng file excel"
      open={show}
      onClose={onClose}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button variant="outlined">
          <a href="https://s.id/-187LJ">Tải form excel mẫu</a>
        </Button>
        <label htmlFor="file_input">
          <input
            id="file_input"
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
          <Button
            variant="contained"
            component="span"
            color="success"
            sx={{ width: "100%" }}
          >
            Upload thông tin tài khoản
          </Button>
        </label>
      </Box>
      <Snackbar
        open={!!error}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
      >
        <Alert
          severity="error"
          sx={{ width: "100%", cursor: "pointer" }}
          onClick={handleOpenNewLink}
        >
          Upload không hoàn tất, xem thông tin lỗi
        </Alert>
      </Snackbar>
    </ModalContainer>
  );
};

export default UploadAccountByExcel;
