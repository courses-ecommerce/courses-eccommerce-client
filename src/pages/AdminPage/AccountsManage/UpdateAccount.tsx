import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import adminApi from "src/apis/adminApi";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";
import { IUser } from "src/types";

interface UpdateAccountProps {
  id: string | number;
  show?: boolean;
  onUpdate?: (updateComplete: boolean) => void;
  onClose?: () => void;
}

const UpdateAccount: React.FC<UpdateAccountProps> = ({
  id,
  onUpdate,
  show = false,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState<IUser>({});

  useEffect(() => {
    id && getUserDetail(id);
  }, [id]);

  const getUserDetail = async (id: any) => {
    try {
      const response = await adminApi.getUserDetail(id);
      // console.log("thông tin chi tiết", response);
      const { user }: any = response;
      setUserDetail(user);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

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
      title="Cập nhật thông tin tài khoản"
      open={show}
      onClose={onClose}
    >
      <Button variant="contained" color="warning" onClick={handleUpdateAccount}>
        Cập nhật
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
