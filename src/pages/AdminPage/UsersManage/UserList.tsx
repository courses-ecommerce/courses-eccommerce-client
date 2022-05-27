import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import adminApi from "src/apis/adminApi";
import Table from "src/components/Table/Table";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { getHeaderColums } from "src/utils/table";
import { Tooltip } from "@mui/material";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [headerColumns, setHeaderColumns] = useState<string[]>([]);

  const columsHeader: GridColDef[] = [
    { field: "id", headerName: "STT", width: 150 },
    { field: "fullName", headerName: "Họ và tên", width: 300 },
    { field: "phone", headerName: "Số điện thoại", width: 300 },
    { field: "birthday", headerName: "Ngày sinh", width: 200 },
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
    try {
      const response = await adminApi.getUsers();

      const { users, totalCount }: any = response;
      console.log(response);

      const newArr = getHeaderColums(users[0], ["_id", "account"]);
      console.log("sadas", newArr);

      setUsers(users);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <Table
      columnsData={columsHeader}
      // rowsData={users}
      rowsData={users}
      title="Danh sách thông tin người dùng"
    />
  );
}
