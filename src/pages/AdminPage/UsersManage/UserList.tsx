import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import adminApi from "src/apis/adminApi";
import Table from "src/components/Table/Table";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils/table";

export default function UserList() {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columsHeader: GridColDef[] = [
    { field: "id", headerName: "STT", width: 100 },
    { field: "fullName", headerName: "Họ và tên", width: 300 },
    { field: "phone", headerName: "Số điện thoại", width: 200 },
    { field: "gender", headerName: "Giới tính", width: 100 },
    { field: "birthday", headerName: "Ngày sinh", width: 200 },
    { field: "avatar", headerName: "Hình ảnh", hide: true },
    { field: "updatedAt", headerName: "Ngày tạo", hide: true },
    {
      field: "actions",
      headerName: "Thao tác",
      width: 300,
      sortable: false,
      type: "actions",
      renderCell: ({ id }) => {
        return (
          <div onClick={() => console.log("id là", id)}>
            <Tooltip title="Xoá">
              <DeleteForeverIcon sx={{ cursor: "pointer" }} />
            </Tooltip>
            <Tooltip title="Cập nhật thông tin" sx={{ cursor: "pointer" }}>
              <EditIcon />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getUsers();

      const { users, totalCount }: any = response;
      // console.log(response);

      const keys = getHeaderColumns(users[0], ["_id", "account"]);
      const res = getNewHeaderColumn(users, keys);

      setLoading(false);
      setUsers(res);
    } catch (error) {
      console.log("lỗi rồi", { error });
      setLoading(false);
    }
  };

  return (
    <Table
      handleAddItem={() => console.log("oke bật modal add")}
      title="Danh sách thông tin người dùng"
      columnsData={columsHeader}
      onDeleteSelectMultiItem={(items) => console.log("xoá items có id", items)}
      rowsData={users}
      isLoading={loading}
    />
  );
}
