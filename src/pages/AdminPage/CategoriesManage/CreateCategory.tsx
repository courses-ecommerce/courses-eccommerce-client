import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import categoryApi from "src/apis/categoryApi";
import Input from "src/components/Input";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";
import * as Yup from "yup";

interface CreateCatergoryProps {
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const CreateCatergory: React.FC<CreateCatergoryProps> = ({
  show = false,
  onClose,
  setShow,
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên danh mục mới"),
    }),
    onSubmit: async (values) => {
      console.log("lấy được dữ liệu là", values);
      await handleCreateCatergory(values);
      resetDataForm();
    },
  });

  const resetDataForm = () => {
    formik.resetForm({
      values: {
        name: "",
      },
    });
  };

  const handleCreateCatergory = async (name: Object) => {
    dispatch(isPending());

    try {
      const response = await categoryApi.createNewCategory(name);
      console.log(response);
      dispatch(isSuccess());
      setShow?.(false);
      toast.success("Tạo danh mục thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Tạo danh mục thất bại", { position: "bottom-right" });
    }
  };

  return (
    <ModalContainer
      width={500}
      title="Tạo danh mục mới"
      open={show}
      onClose={onClose}
    >
      <form id="create-form" onSubmit={formik.handleSubmit}>
        <Input
          required
          label="Tên danh mục"
          placeholder="Nhập tên danh mục"
          errorMessage={formik.touched.name ? formik.errors.name : ""}
          {...formik.getFieldProps("name")}
        />
      </form>
      <Box sx={{ marginTop: 4 }}>
        <Button
          form="create-form"
          variant="contained"
          color="primary"
          type="submit"
        >
          Tạo danh mục mới
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
    </ModalContainer>
  );
};

export default CreateCatergory;
