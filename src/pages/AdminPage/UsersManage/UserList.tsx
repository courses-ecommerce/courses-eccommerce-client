import { useEffect, useState } from "react";
import adminApi from "src/apis/adminApi";
import TableData from "src/components/Table/TableData";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [headerColumns, setHeaderColumns] = useState<string[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await adminApi.getUsers();

      const { users, totalCount }: any = response;
      console.log(response);

      getHeaderColums(users[0]);
      setUsers(users);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const getHeaderColums = (data: any) => {
    let columnHeaders: string[] = [];
    //_id,account,fullName,...
    let keys = Object.keys(data);
    console.log("nhận được", keys);
    //filter keys
    keys.forEach((key) => {
      if (
        !Array.isArray(data[key]) &&
        key !== "_id" &&
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "__v" &&
        key !== "avatar"
      ) {
        columnHeaders.push(key);
      }
    });
    //save keys
    setHeaderColumns(columnHeaders);
  };

  return (
    <TableData
      title="Quản lý thông tin người dùng"
      headerColumns={headerColumns}
      dataColumns={users}
    />
  );
}
