import { GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import Table from "src/components/Table/Table";

const columsHeader: GridColDef[] = [
  {
    field: "_id",
    headerName: "STT",
    width: 100,
    hide: true,
  },
  {
    field: "id",
    headerName: "STT",
    width: 60,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Trang thái",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "role",
    headerName: "Chức vụ",
    width: 120,
  },
  {
    field: "fullName",
    headerName: "Họ và tên",
    width: 150,
  },
  {
    field: "gender",
    headerName: "Giới tính",
    width: 120,
  },
  {
    field: "email",
    headerName: "Địa chỉ email",
    width: 200,
  },
  { field: "phone", headerName: "Số điện thoại", width: 200 },
];

const CourseList = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Table
      titleBtnAdd="Tạo tài khoản mới"
      isLoading={loading}
      title="Danh sách thông tin người dùng"
      columnsData={columsHeader}
      // rowsData={users}
      // total={total}
      // handleAddItem={handleCreate}
      // onDeleteItem={handleDelete}
      // onModifyItem={handleModifyItem}
      // onDeleteSelectMultiItem={handleMultiDeleted}
    />
  );
};

export default CourseList;
