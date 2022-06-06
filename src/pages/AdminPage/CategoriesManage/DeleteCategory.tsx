import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import categoryApi from "src/apis/categoryApi";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";

interface DeleteCatergoryProps {
  id: string | number;
  show?: boolean;
  onDelete?: (deleteComplete: boolean) => void;
  onClose?: () => void;
}

const DeleteCatergory: React.FC<DeleteCatergoryProps> = ({
  id,
  onDelete,
  show = false,
  onClose,
}) => {
  const dispatch = useDispatch();
  const handleDeleteCatergory = async () => {
    onDelete?.(false);
    dispatch(isPending());
    try {
      await categoryApi.deleteCategory(id);
      dispatch(isSuccess());
      onDelete?.(true);
      toast.success("Xoá danh mục thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      toast.warning("Xoá danh mục thất bại", { position: "bottom-right" });
    }
  };

  return (
    <ModalContainer
      title="Bạn có chắc muốn xoá danh mục này không?"
      open={show}
      onClose={onClose}
    >
      <Button
        variant="contained"
        color="warning"
        onClick={handleDeleteCatergory}
      >
        Xoá danh mục
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={onClose}
        sx={{ marginLeft: 1 }}
      >
        Huỷ bỏ
      </Button>
    </ModalContainer>
  );
};

export default DeleteCatergory;
