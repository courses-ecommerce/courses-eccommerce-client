import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import categoryApi from "src/apis/categoryApi";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import ModalContainer from "src/components/ModalContainer";
import { discountApplyTypes, discountTypes } from "src/data";
import { isPending, isSuccess } from "src/reducers/authSlice";
import * as Yup from "yup";

interface CreateCouponProps {
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const CreateCoupon: React.FC<CreateCouponProps> = ({
  show = false,
  onClose,
  setShow,
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "money",
      apply: "author",
      amount: 0,
      startDate: "",
      expireDate: "",
      maxDiscount: null,
      minPrice: null,
      number: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Vui lòng nhập tên mã giảm giá"),
    }),
    validate: (values) => {
      let errors = {};
      if (
        values.type === "percent" &&
        (values.amount <= 0 || values.amount > 100)
      ) {
        errors = {
          ...errors,
          amount: "Giá trị giảm giá phải lớn hơn 0% và bé hơn bằng 100%",
        };
      }
      if (values.type === "money" && values.amount < 0) {
        errors = {
          ...errors,
          amount: "Giá trị giảm giá không được âm",
        };
      }
      return errors;
    },
    onSubmit: async (values) => {
      console.log("lấy được dữ liệu là", values);
      // await handleCreateCoupon(values);
      // resetDataForm();
    },
  });

  const resetDataForm = () => {
    formik.resetForm({
      values: {
        title: "",
        type: "money",
        apply: "author",
        amount: 0,
        startDate: "",
        expireDate: "",
        maxDiscount: null,
        minPrice: null,
        number: null,
      },
    });
  };

  const handleCreateCoupon = async (name: Object) => {
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
      width={700}
      title="Tạo mã giảm giá mới"
      open={show}
      onClose={onClose}
    >
      <form
        id="create-form"
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Input
            required
            label="Tên mã giảm giá"
            placeholder="Nhập tên mã giảm giá"
            errorMessage={formik.touched.title ? formik.errors.title : ""}
            {...formik.getFieldProps("title")}
          />
          <InputSelect
            label="Đơn vị tính"
            list={discountTypes}
            defaultValue={formik.values.type}
            onChange={(e) => formik.setFieldValue("type", e.target.value)}
          />
          <InputSelect
            label="Phạm vi áp dụng"
            list={discountApplyTypes}
            onChange={(e) => formik.setFieldValue("apply", e.target.value)}
            defaultValue={formik.values.apply}
          />
          <Input
            label="Ngày bắt đầu"
            type="date"
            errorMessage={
              formik.touched.startDate ? formik.errors.startDate : ""
            }
            {...formik.getFieldProps("startDate")}
          />
          <Input
            label="Ngày hết hạn"
            type="date"
            errorMessage={
              formik.touched.expireDate ? formik.errors.expireDate : ""
            }
            {...formik.getFieldProps("expireDate")}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Input
            required
            label="Số lượng giảm"
            placeholder="Nhập số lượng giảm"
            errorMessage={formik.touched.amount ? formik.errors.amount : ""}
            {...formik.getFieldProps("amount")}
          />
          <Input
            label="Giảm giá tối đa"
            placeholder="Nhập giá tối đa"
            errorMessage={
              formik.touched.maxDiscount ? formik.errors.maxDiscount : ""
            }
            {...formik.getFieldProps("maxDiscount")}
          />
          <Input
            label="Giá tối thiểu"
            placeholder="Nhập giá tối thiểu"
            errorMessage={formik.touched.minPrice ? formik.errors.minPrice : ""}
            {...formik.getFieldProps("minPrice")}
          />
          <Input
            label="Số lượng mã"
            placeholder="Nhập số lượng mã"
            errorMessage={formik.touched.number ? formik.errors.number : ""}
            {...formik.getFieldProps("number")}
          />
        </Box>
      </form>
      <Box sx={{ marginTop: 4 }}>
        <Button
          form="create-form"
          variant="contained"
          color="primary"
          type="submit"
        >
          Tạo mã giảm giá mới
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

export default CreateCoupon;
