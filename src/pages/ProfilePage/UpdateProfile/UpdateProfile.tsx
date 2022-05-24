import { Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import Dropdown from "src/components/Dropdown";
import Input from "src/components/Input";
import InputFile from "src/components/InputFile";
import ModalContainer from "src/components/ModalContainer";
import { genderTypes } from "src/data";
import { IUser } from "src/types";
import formatDate from "src/utils/formatDay";
interface UpdateProfileProps {
  data: IUser;
}
const UpdateProfile: React.FC<UpdateProfileProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: data.fullName,
      birthday: data.birthday,
      gender: data.gender,
      phone: data.phone,
      images: [],
    },

    onSubmit: (values) => {
      console.log("lấy được dữ liệu là", values);
    },
  });

  return (
    <div>
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
        <form onSubmit={formik.handleSubmit}>
          <InputFile
            label="Ảnh đại diện"
            multiple
            value={formik.values.images}
            onChange={(value) => formik.setFieldValue("images", value)}
          />
          <Input label="Họ và tên" {...formik.getFieldProps("fullName")} />
          <Input
            type="date"
            label="Ngày sinh"
            {...formik.getFieldProps("birthday")}
          />
          <Input label="Số điện thoại" {...formik.getFieldProps("phone")} />
          <Dropdown
            label="Giới tính"
            list={genderTypes}
            defaultValue={formik.values.gender}
          />

          <div>
            <Button type="submit" variant="contained" color="success">
              Cập nhật
            </Button>
          </div>
        </form>
      </ModalContainer>
    </div>
  );
};

export default UpdateProfile;
