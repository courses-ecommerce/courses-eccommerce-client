import { Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import categoryApi from "src/apis/categoryApi";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import ModalContainer from "src/components/ModalContainer";
import { statusTypes } from "src/data";
import { isPending, isSuccess } from "src/reducers/authSlice";
import { ICategory } from "src/types";
import * as Yup from "yup";

interface UpdateCategoryProps {
  id: string | number;
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const UpdateCategory: React.FC<UpdateCategoryProps> = ({
  id,
  setShow,
  show = false,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [categoryDetail, setCategoryDetail] = useState<ICategory>({});

  useEffect(() => {
    id && getCategoryDetail(id);
  }, [id]);

  const getCategoryDetail = async (id: any) => {
    try {
      const response = await categoryApi.getCategoryDetail(id);
      // console.log("áádasd", response);
      const { category }: any = response;
      setCategoryDetail(category);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleUpdateCategory = async (values: any) => {
    dispatch(isPending());

    try {
      await categoryApi.updateCategory(id, values);
      dispatch(isSuccess());
      setShow?.(false);

      toast.success("Cập nhật thông tin danh mục thành công", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Cập nhật thông tin danh mục thất bại", {
        position: "bottom-right",
      });
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: categoryDetail.name,
      publish: categoryDetail.publish,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Tên danh mục không được để trống"),
    }),
    onSubmit: async (values) => {
      console.log("lấy được dữ liệu là", values);
      handleUpdateCategory(values);
    },
  });

  return (
    <ModalContainer
      width={700}
      title="Cập nhật thông tin danh mục"
      open={show}
      onClose={onClose}
    >
      <form id="update-account" onSubmit={formik.handleSubmit}>
        <Input
          label="Tên danh mục"
          placeholder="Nhập tên danh mục"
          errorMessage={formik.touched.name ? formik.errors.name : ""}
          {...formik.getFieldProps("name")}
        />

        <InputSelect
          label="Xuất bản"
          list={statusTypes}
          defaultValue={formik.values.publish}
          errorMessage={formik.touched.publish ? formik.errors.publish : ""}
          {...formik.getFieldProps("publish")}
        />
      </form>
      <Button
        form="update-account"
        type="submit"
        variant="contained"
        color="warning"
      >
        Cập nhật thông tin
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

export default UpdateCategory;
