import { Box, Button } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import adminApi from "src/apis/adminApi";
import ModalContainer from "src/components/ModalContainer";

interface UploadAccountByExcelProps {
  show?: boolean;
  onUpload?: (uploadComplete: boolean) => void;
  onClose?: () => void;
}

const UploadAccountByExcel: React.FC<UploadAccountByExcelProps> = ({
  show,
  onClose,
  onUpload,
}) => {
  const handleUpload = async (e: any) => {
    const formData: any = new FormData();
    formData.append("file", e.target.files[0]);

    // console.log("param là", ...formData);
    onUpload?.(false);
    try {
      const response = await adminApi.uploadUserByExcel(formData);
      const { message, urlLogs }: any = response;
      console.log("thành công", response);

      toast.success(`${message}`, {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      toast.warning("Lỗi rồi", { position: "bottom-right" });
    }
    onUpload?.(true);
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
    </ModalContainer>
  );
};

export default UploadAccountByExcel;
