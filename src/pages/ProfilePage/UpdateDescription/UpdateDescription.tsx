import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import teacherApi from "src/apis/teacherApi";
import FormControl from "src/components/FormControl";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers";

interface UpdateDescriptionProps {
  id?: string;
  slug?: string;
  show?: boolean;
  value?: string;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const UpdateDescription: React.FC<UpdateDescriptionProps> = ({
  id,
  slug,
  onClose,
  value,
  show,
  setShow,
}) => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState<string>();

  const handleUpdateDescription = async (e: any) => {
    e.preventDefault();

    const params = { description };
    dispatch(isPending());
    setShow?.(true);
    try {
      await teacherApi.updateTeacherInfoById(id, params);

      toast.success("Cập nhật thông tin mô tả thành công", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      toast.warning("Cập nhật thông tin mô tả thất bại, hãy thử lại sau", {
        position: "bottom-right",
      });
    }
    setShow?.(false);
    dispatch(isSuccess());
  };

  return (
    <ModalContainer
      title="Tiến hành mô tả thông tin cá nhân"
      open={show}
      onClose={onClose}
    >
      <Box
        component="form"
        onSubmit={handleUpdateDescription}
        display="flex"
        flexDirection="column"
        gap={16}
      >
        <Typography variant="h6" fontWeight={600} component="span">
          Thông tin mô tả cá nhân <span>*</span>
        </Typography>
        <FormControl.FormEditor
          defaultValue={value}
          placeholder="Nhập nội dung mô tả thông tin cá nhân."
          onChange={(value) => setDescription(value)}
        />
        <Button type="submit" variant="contained">
          Cập nhật mô tả
        </Button>
      </Box>
    </ModalContainer>
  );
};

export default UpdateDescription;
