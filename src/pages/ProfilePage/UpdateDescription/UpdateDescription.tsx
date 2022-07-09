import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import teacherApi from "src/apis/teacherApi";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";

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
    // console.log("params truyền là", params);
    dispatch(isPending());
    setShow?.(true);
    try {
      await teacherApi.updateTeacherInfoById(id, params);
      // console.log("adsa", response);

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
      width={700}
      title="Tiến hành mô tả thông tin cá nhân"
      open={show}
      onClose={onClose}
    >
      <form onSubmit={handleUpdateDescription}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div className="editor">
            <h2>
              Thông tin mô tả cá nhân <span>*</span>
            </h2>
            <ReactQuill
              // style={{
              //   height: 70,
              // }}
              defaultValue={value}
              theme="snow"
              onChange={(value) => setDescription(value)}
              placeholder="Nhập nội dung mô tả thông tin cá nhân."
            />
          </div>
          <Button type="submit" variant="contained">
            Cập nhật mô tả
          </Button>
        </Box>
      </form>
    </ModalContainer>
  );
};

export default UpdateDescription;
