import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import adminApi from "src/apis/adminApi";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";

interface UpdateAccountProps {
  id: string | number;
  show?: boolean;
  onUpdate?: (deleteComplete: boolean) => void;
  onClose?: () => void;
}

const UpdateAccount: React.FC<UpdateAccountProps> = ({
  id,
  onUpdate,
  show = false,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleUpdateAccount = async () => {
    onUpdate?.(false);
    dispatch(isPending());
    try {
      // const response = await adminApi.deleteUser(id);
      // console.log(response);
      dispatch(isSuccess());
      onUpdate?.(true);

      toast.success("Xoá tài khoản thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      toast.warning("Xoá tài khoản thất bại", { position: "bottom-right" });
    }
  };

  return (
    <ModalContainer
      title="Bạn có chắc muốn xoá tài khoản này không?"
      open={show}
      onClose={onClose}
    >
      <Button variant="contained" color="warning" onClick={handleUpdateAccount}>
        Xoá tài khoản
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

export default UpdateAccount;
