import { Box, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import adminApi from "src/apis/adminApi";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import Table from "src/components/Table/Table";
import { accountTypes, statusTypes } from "src/data/searchInfo";
import useTypingDebounce from "src/hooks/useTypingDebounce";
import { IUser } from "src/types";
// import { useTypingDebounce } from "src/hooks";
import { translateVi } from "src/utils";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils/table";
import AccountDetail from "./AccountDetail";
import CreateAccount from "./CreateAccount";
import DeleteAccount from "./DeleteUser";
import MultiDeleteAccount from "./MultiDeleteAccount";
import UpdateAccount from "./UpdateAccount";
import UploadAccountByExcel from "./UploadAccountByExcel";

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

export default function AccountList() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [userId, setUserId] = useState<string | number>("");
  const [userIds, setUserIds] = useState<string[] | number[]>([]);
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

  //modal
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showMultiDelete, setShowMultiDelete] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    showCreate,
    showUpdate,
    showDelete,
    showMultiDelete,
    showUpload,
    role,
    isActive,
    email,
    page,
    pageSize,
  ]);

  //debounce to search
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
      // console.log(users, total);

      if (users.length > 0) {
        const keys = getHeaderColumns(users[0], ["account"]);
        const data = getNewHeaderColumn(users, keys, page, pageSize);

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

  const handleModifyItem = async (id: string | number) => {
    setUserId(id);
    setShowUpdate(true);
  };
  const handleViewDetail = async (id: string | number) => {
    setUserId(id);
    setShowDetail(true);
  };
  const handleDelete = (id: string | number) => {
    setUserId(id);
    setShowDelete(true);
  };

  const handleMultiDeleted = (ids: string[] | number[]) => {
    setUserIds(ids);
    setShowMultiDelete(true);
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
              onChange={(e: any) => setValue(e.target.value)}
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
        btnHandle={
          <>
            <Button
              variant="contained"
              color="success"
              onClick={() => setShowUpload(true)}
            >
              Upload file excel
            </Button>
            <Button variant="contained" color="info">
              Sao lưu dữ liệu
            </Button>
          </>
        }
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
        getRowId={(row) => row._id}
        titleBtnAdd="Tạo tài khoản mới"
        isLoading={loading}
        title="Danh sách thông tin người dùng"
        columnsData={columsHeader}
        rowsData={users}
        total={total}
        handleAddItem={() => setShowCreate(true)}
        onDeleteItem={handleDelete}
        onViewItemDetail={handleViewDetail}
        onModifyItem={handleModifyItem}
        onDeleteSelectMultiItem={handleMultiDeleted}
      />
      <DeleteAccount
        id={userId}
        show={showDelete}
        onClose={() => setShowDelete(false)}
        setShow={setShowDelete}
      />
      <MultiDeleteAccount
        ids={userIds}
        show={showMultiDelete}
        onClose={() => setShowMultiDelete(false)}
        setShow={setShowMultiDelete}
      />

      <CreateAccount
        show={showCreate}
        onClose={() => setShowCreate(false)}
        setShow={setShowCreate}
      />
      <UpdateAccount
        id={userId}
        show={showUpdate}
        onClose={() => setShowUpdate(false)}
        setShow={setShowUpdate}
      />
      <UploadAccountByExcel
        show={showUpload}
        onClose={() => setShowUpload(false)}
        setShow={setShowUpload}
      />
      <AccountDetail
        id={userId}
        show={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
}
