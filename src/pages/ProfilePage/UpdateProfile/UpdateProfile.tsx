import { Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import userApi from "src/apis/userApi";
import Input from "src/components/Input";
import InputFile from "src/components/InputFile";
import InputSelect from "src/components/InputSelect";
import ModalContainer from "src/components/ModalContainer";
import { genderTypes } from "src/data";
import { isPending, isSuccess } from "src/reducers/authSlice";
import { IUser } from "src/types";
import { phoneRegExp } from "src/utils";
import * as Yup from "yup";
import "./UpdateProfile.scss";

interface UpdateProfileProps {
  data: IUser;
}
const UpdateProfile: React.FC<UpdateProfileProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: data.fullName,
      birthday: data.birthday,
      gender: data.gender,
      phone: data.phone,
      avatar: null,
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(phoneRegExp, "Định dạng số điện thoại sai")
        .max(10, "Định dạng số điện thoại sai")
        .min(10, "Định dạng số điện thoại sai"),
    }),
    onSubmit: (values) => {
      // console.log("lấy được dữ liệu là", values);
      updateProfile(values);
    },
  });

  const updateProfile = async (user_info: IUser) => {
    const newData: any = user_info;
    const keys = Object.keys(user_info);

    var formData: any = new FormData();

    keys.forEach((key) => {
      newData[key] && formData.append(key, newData[key]);
    });
    console.log(...formData);
    // console.log("sadasdas", ...formData);
    dispatch(isPending());
    try {
      const response = await userApi.updateInfo(formData);
      console.log("response", response);

      setShowModal(false);
      dispatch(isSuccess());
      toast.success("Cập nhật thông tin thành công", {
        position: "bottom-right",
      });
    } catch (error) {
      dispatch(isSuccess());
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => setShowModal(true)}
      >
        Thay đổi thông tin
      </Button>

      <ModalContainer
        width={600}
        title="Cập nhật thông tin người dùng"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <form className="update-profile-form" onSubmit={formik.handleSubmit}>
          <InputFile
            label="Ảnh đại diện"
            // multiple
            // value={formik.values.avatar}
            valueDefault={data.avatar}
            onChange={(value) => formik.setFieldValue("avatar", value)}
          />
          <Input label="Họ và tên" {...formik.getFieldProps("fullName")} />
          <Input
            type="date"
            label="Ngày sinh"
            {...formik.getFieldProps("birthday")}
          />
          <Input
            label="Số điện thoại"
            {...formik.getFieldProps("phone")}
            errorMessage={formik.touched.phone ? formik.errors.phone : ""}
          />
          <InputSelect
            label="Giới tính"
            list={genderTypes}
            onChange={(e) =>
              formik.setFieldValue(
                "gender",
                (e.target.value == true).toString()
              )
            }
            defaultValue={formik.values.gender}
          />

          <div>
            <Button type="submit" variant="contained" color="success">
              Thay đổi thông tin
            </Button>
          </div>
        </form>
      </ModalContainer>
    </>
  );
};

export default UpdateProfile;
