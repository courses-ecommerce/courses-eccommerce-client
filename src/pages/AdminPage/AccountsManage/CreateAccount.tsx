import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import adminApi from "src/apis/adminApi";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import ModalContainer from "src/components/ModalContainer";
import { accountTypes, genderTypes } from "src/data";
import { isPending, isSuccess } from "src/reducers/authSlice";
import { ICreateNewUser } from "src/types/user";
import * as Yup from "yup";

interface CreateAccountProps {
  show?: boolean;
  onCreate?: (createComplete: boolean) => void;
  onClose?: () => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({
  show = false,
  onClose,
  onCreate,
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      role: "student",
      fullName: "",
      email: "",
      password: "",
      birthday: "",
      gender: "true",
      phone: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Vui lòng nhập họ tên"),
      email: Yup.string()
        .email("Phải là email")
        .required("Vui lòng nhập gmail"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // console.log("lấy được dữ liệu là", values);
      await handleCreateAccount(values);
      resetForm({
        values: {
          role: "student",
          birthday: "",
          email: "",
          fullName: "",
          gender: "true",
          password: "",
          phone: "",
        },
      });
    },
  });

  const handleCreateAccount = async (values: ICreateNewUser) => {
    dispatch(isPending());
    onCreate?.(false);
    try {
      const response = await adminApi.createNewUser(values);
      console.log(response);
      dispatch(isSuccess());
      toast.success("Tạo tài khoản thành công", { position: "bottom-right" });
      onCreate?.(true);
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      toast.warning("Tạo tài khoản thất bại", { position: "bottom-right" });
      onCreate?.(true);
    }
  };

  return (
    <ModalContainer
      width={600}
      title="Tạo tài khoản mới"
      open={show}
      onClose={onClose}
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
        onSubmit={formik.handleSubmit}
      >
        <Input
          required
          label="Địa chỉ email"
          placeholder="Nhập địa chỉ email"
          errorMessage={formik.touched.email ? formik.errors.email : ""}
          {...formik.getFieldProps("email")}
        />

        <Input
          required
          type="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          errorMessage={formik.touched.password ? formik.errors.password : ""}
          {...formik.getFieldProps("password")}
        />

        <Input
          required
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          errorMessage={formik.touched.fullName ? formik.errors.fullName : ""}
          {...formik.getFieldProps("fullName")}
        />
        <InputSelect
          label="Chức vụ"
          list={accountTypes}
          onChange={(e) => formik.setFieldValue("role", e.target.value)}
          defaultValue={formik.values.role}
        />
        <InputSelect
          label="Giới tính"
          list={genderTypes}
          onChange={(e) =>
            formik.setFieldValue("gender", e.target.value.toString())
          }
          defaultValue={formik.values.gender}
        />
        <Input
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          errorMessage={formik.touched.phone ? formik.errors.phone : ""}
          {...formik.getFieldProps("phone")}
        />
        <Input
          type="date"
          label="Ngày sinh nhật"
          {...formik.getFieldProps("birthday")}
        />
        <Box sx={{ marginTop: 1 }}>
          <Button variant="contained" color="primary" type="submit">
            Tạo tài khoản mới
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={onClose}
            sx={{ marginLeft: 1 }}
          >
            Huỷ bỏ
          </Button>
        </Box>
      </form>
    </ModalContainer>
  );
};

export default CreateAccount;
