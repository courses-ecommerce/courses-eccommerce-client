import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import adminApi from "src/apis/adminApi";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";

interface MultiDeleteCouponProps {
  ids: string[] | number[];
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const MultiDeleteCoupon: React.FC<MultiDeleteCouponProps> = ({
  ids,
  setShow,
  show = false,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleMultiDeleteCoupon = async () => {
    const params = { ids };

    console.log("xoá mã khuyến mãi có ids", ids);

    // dispatch(isPending());
    // try {
    //   const response = await adminApi.deleteMultiUser(params);
    //   console.log(response);
    //   dispatch(isSuccess());
    //   setShow?.(false);
    //   toast.success("Xoá tài khoản thành công", { position: "bottom-right" });
    // } catch (error) {
    //   console.log("lỗi rồi", { error });
    //   dispatch(isSuccess());
    //   setShow?.(false);
    //   toast.warning("Xoá tài khoản thất bại", { position: "bottom-right" });
    // }
  };

  return (
    <ModalContainer
      title="Bạn có chắc muốn xoá những mã khuyến mãi này không?"
      open={show}
      onClose={onClose}
    >
      <Button
        variant="contained"
        color="warning"
        onClick={handleMultiDeleteCoupon}
      >
        Xoá mã khuyến mãi
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

export default MultiDeleteCoupon;
