import { Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import usertApi from "src/apis/userApi";
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
      // birthday: formatDate(data?.birthday, "dd-MM-yy"),
      birthday: data.birthday,
      gender: data.gender,
      phone: data.phone,
      avatar: [],
    },

    onSubmit: (values) => {
      console.log("lấy được dữ liệu là", values);

      UpdateProfile(values);
    },
  });

  const UpdateProfile = async (user_info: IUser) => {
    const newData: any = user_info;
    const keys = Object.keys(user_info);

    var formData: any = new FormData();
    keys.forEach((key) => {
      formData.append(key, newData[key]);
    });

    console.log("sadasdas", ...formData);

    try {
      const response = await usertApi.updateInfo(formData);
      console.log("rẻwer", response);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

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
            value={formik.values.avatar}
            onChange={(value) => formik.setFieldValue("avatar", value)}
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
