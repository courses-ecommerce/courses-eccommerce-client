import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import adminApi from "src/apis/adminApi";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import Table from "src/components/Table/Table";
import { accountTypes, statusTypes } from "src/data";
import useTypingDebounce from "src/hooks/useTypingDebounce";
// import { useTypingDebounce } from "src/hooks";
import { translateVi } from "src/utils";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils/table";
import CreateAccount from "./CreateAccount";
import DeleteAccount from "./DeleteUser";

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
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 120,
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

export default function UserList() {
  const [users, setUsers] = useState<any>([]);
  const [userId, setUserId] = useState<any>();
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
  //debounce
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    getUsers(role, isActive, email);
  }, [isDeleted, isCreated, role, isActive, email]);

  useEffect(() => {
    setShowDelete(false);
  }, [isDeleted]);

  useEffect(() => {
    setShowCreate(false);
  }, [isCreated]);

  useEffect(() => {
    setEmail(debouncedValue);
  }, [debouncedValue]);

  const getUsers = async (role: string, active: boolean, email?: string) => {
    setLoading(true);
    const params = { role, active, email };
    console.log("params nè", params);

    try {
      const response = await adminApi.getUsers(params);
      const { users, totalCount }: any = response;

      console.log(users);
      if (users.length > 0) {
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
      } else {
        setUsers(users);
      }
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
    // console.log("xoá những items có id là", ids);
    setUserId(ids);
    setShowDelete(true);
  };

  const handleSearchByEmail = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Table
        btnSearch={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Input
              style={{ width: 250 }}
              placeholder="Tìm kiếm bằng địa chỉ email"
              onChange={handleSearchByEmail}
            />
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
