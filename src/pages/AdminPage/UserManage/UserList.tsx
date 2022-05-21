import TableData from "src/components/Table/TableData";

export default function UserList() {
  const data = [
    { id: 1, name: "sadasdas", value: 1 },
    { id: 2, name: "Luan", value: 1 },
    { id: 3, name: "Luasdasdsaan", value: 1 },
    { id: 4, name: "Luasdasdsaan", value: 1 },
    { id: 5, name: "Luasdasdsaan", value: 1 },
    { id: 6, name: "Luasdasdsaan", value: 1 },
    { id: 7, name: "Luasdasdsaan", value: 1 },
    { id: 8, name: "Luasdasdsaan", value: 1 },
    { id: 9, name: "Luasdasdsaan", value: 1 },
    { id: 10, name: "Luasdasdsaan", value: 1 },
    { id: 11, name: "Luasdasdsaan", value: 1 },
    { id: 12, name: "Luasdasdsaan", value: 1 },
  ];

  return (
    <TableData
      title="Quản lý người dùng"
      headerColumns={["Số thứ tự", "Tên", "Giá trị"]}
      dataColumns={data}
    />
  );
}
