import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import adminApi from "src/apis/adminApi";
import InputSelect from "src/components/InputSelect";
import Table from "src/components/Table/Table";
import { accountTypes, statusTypes } from "src/data";
import { translateVi } from "src/utils";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils/table";
import CreateAccount from "./CreateAccount";
import DeleteAccount from "./DeleteUser";

export default function UserList() {
  const [users, setUsers] = useState<any>([]);
  const [userId, setUserId] = useState<string | number>(0);
  const [role, setRole] = useState<string>("student");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  //delete account modal
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  //create account modal
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);

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
    // { field: "birthday", headerName: "Ngày sinh", width: 150 },
  ];

  useEffect(() => {
    getUsers(role, isActive);
  }, [isDeleted, isCreated, role, isActive]);

  useEffect(() => {
    setShowDelete(false);
  }, [isDeleted]);

  useEffect(() => {
    setShowCreate(false);
  }, [isCreated]);

  const getUsers = async (role: string, isActive: boolean) => {
    setLoading(true);
    const params = { role, isActive };
    console.log("params nè", params);

    try {
      const response = await adminApi.getUsers(params);
      const { users, totalCount }: any = response;

      console.log(users);

      const keys = getHeaderColumns(users[0], ["account"]);
      const data = getNewHeaderColumn(users, keys);

      const userData = data.map((data, index) => {
        return {
          ...data,
          email: users[index].account.email,
          role: translateVi(users[index].account.role),
          status: users[index].account.isActive ? "Hoạt động" : "Đang khoá",
        };
      });

      setUsers(userData);
      setLoading(false);
      setTotal(totalCount);
    } catch (error) {
      console.log("lỗi rồi", { error });
      setLoading(false);
    }
  };

  const handleCreate = () => {
    // console.log("add nek");
    setShowCreate(true);
  };

  const handleModifyItem = (id: string | number) => {
    console.log("chỉnh sửa thông tin có id", id);
  };
  const handleDelete = (id: string | number) => {
    // console.log("xoá thông tin có id", id);
    setUserId(id);
    setShowDelete(true);
  };
  const handleMultiDeleted = (ids: string[] | number[]) => {
    console.log("xoá những items có id là", ids);
  };

  return (
    <>
      <Table
        btnSearch={
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <InputSelect
              defaultValue={role}
              list={accountTypes}
              onChange={(e) => setRole(e.target.value)}
            />
            <InputSelect
              defaultValue={isActive}
              list={statusTypes}
              onChange={(e) => setIsActive(e.target.value)}
            />
          </Box>
        }
        titleBtnAdd="Tạo tài khoản mới"
        isLoading={loading}
        title="Danh sách thông tin người dùng"
        columnsData={columsHeader}
        rowsData={users}
        total={total}
        handleAddItem={handleCreate}
        onDeleteItem={handleDelete}
        onModifyItem={handleModifyItem}
        onDeleteSelectMultiItem={handleMultiDeleted}
      />
      <DeleteAccount
        id={userId}
        show={showDelete}
        onClose={() => setShowDelete(false)}
        onDelete={(status) => setIsDeleted(status)}
      />

      <CreateAccount
        show={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={(status) => setIsCreated(status)}
      />
    </>
  );
}
