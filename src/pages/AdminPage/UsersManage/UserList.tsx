import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import adminApi from "src/apis/adminApi";
import Table from "src/components/Table/Table";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils/table";

export default function UserList() {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  // const [showModify, setShowModify] = useState<boolean>(false);

  const columsHeader: GridColDef[] = [
    { field: "id", headerName: "STT", width: 100 },
    { field: "fullName", headerName: "Họ và tên", width: 200 },
    { field: "phone", headerName: "Số điện thoại", width: 200 },
    { field: "gender", headerName: "Giới tính", width: 120 },
    { field: "birthday", headerName: "Ngày sinh", width: 200 },
    { field: "avatar", headerName: "Hình ảnh", hide: true },
    { field: "updatedAt", headerName: "Ngày tạo", hide: true },
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
      setTotal(totalCount);
    } catch (error) {
      console.log("lỗi rồi", { error });
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    console.log("add nek");
  };

  const handleModifyItem = (id: string | number) => {
    console.log("chỉnh sửa thông tin có id", id);
  };
  const handleDelete = (id: string | number) => {
    console.log("xoá thông tin có id", id);
  };
  const handleMultiDeleted = (ids: string[] | number[]) => {
    console.log("xoá những items có id là", ids);
  };

  return (
    <>
      <Table
        isLoading={loading}
        title="Danh sách thông tin người dùng"
        columnsData={columsHeader}
        rowsData={users}
        total={total}
        handleAddItem={handleAddItem}
        onDeleteItem={handleDelete}
        onModifyItem={handleModifyItem}
        onDeleteSelectMultiItem={handleMultiDeleted}
      />
    </>
  );
}
