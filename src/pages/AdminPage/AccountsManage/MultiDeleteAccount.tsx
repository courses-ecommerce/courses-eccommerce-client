import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import adminApi from "src/apis/adminApi";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";

interface MultiDeleteAccountProps {
  ids: string[] | number[];
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const MultiDeleteAccount: React.FC<MultiDeleteAccountProps> = ({
  ids,
  setShow,
  show = false,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleMultiDeleteAccount = async () => {
    const params = { ids };

    dispatch(isPending());
    try {
      const response = await adminApi.deleteMultiUser(params);
      console.log(response);
      dispatch(isSuccess());
      setShow?.(false);
      toast.success("Xoá tài khoản thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Xoá tài khoản thất bại", { position: "bottom-right" });
    }
  };

  return (
    <ModalContainer
      title="Bạn có chắc muốn xoá những tài khoản này không?"
      open={show}
      onClose={onClose}
    >
      <Button
        variant="contained"
        color="warning"
        onClick={handleMultiDeleteAccount}
      >
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

export default MultiDeleteAccount;
