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
import UpdateAccount from "./UpdateAccount";

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
    field: "email",
    headerName: "Địa chỉ email",
    width: 200,
  },
  {
    field: "fullName",
    headerName: "Họ và tên",
    width: 150,
  },
  { field: "phone", headerName: "Số điện thoại", width: 200 },
  {
    field: "gender",
    headerName: "Giới tính",
    width: 120,
  },

  // { field: "birthday", headerName: "Ngày sinh", width: 150 },
];

export default function UserList() {
  const [users, setUsers] = useState<any>([]);
  const [userId, setUserId] = useState<any>();
  const [role, setRole] = useState<string>("student");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  //debounce
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [email, setEmail] = useState<string>();

  //delete account modal
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  //create account modal
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  //debounce
  //update account modal
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted, isCreated, isUpdated, role, isActive, email, page, pageSize]);

  useEffect(() => {
    setShowDelete(false);
  }, [isDeleted]);

  useEffect(() => {
    setShowCreate(false);
  }, [isCreated]);

  useEffect(() => {
    setShowUpdate(false);
  }, [isUpdated]);

  useEffect(() => {
    setEmail(debouncedValue);
  }, [debouncedValue]);

  const getUsers = async () => {
    setLoading(true);
    const params = { role, active: isActive, email, page, limit: pageSize };
    // console.log("params nè", params);

    try {
      const response = await adminApi.getUsers(params);
      const { users, total }: any = response;
      console.log(users, total);

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
      setTotal(total);
    } catch (error) {
      console.log("lỗi rồi", { error });
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setShowCreate(true);
  };

  const handleModifyItem = (id: string | number) => {
    setUserId(id);
    setShowUpdate(true);
  };
  const handleDelete = (id: string | number) => {
    setUserId(id);
    setShowDelete(true);
  };
  const handleMultiDeleted = (ids: string[] | number[]) => {
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
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
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
      <UpdateAccount
        id={userId}
        show={showUpdate}
        onClose={() => setShowUpdate(false)}
        onUpdate={(status) => setIsUpdated(status)}
      />
    </>
  );
}
