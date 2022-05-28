import { Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import categoryApi from "src/apis/categoryApi";
import Table from "src/components/Table/Table";
import { GridColDef } from "@mui/x-data-grid";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils/table";

const CategoryList = () => {
  const [categories, setCategories] = useState<Object[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columsHeader: GridColDef[] = [
    { field: "id", headerName: "STT", width: 100 },
    { field: "name", headerName: "Tên danh mục", width: 300 },
    { field: "publish", headerName: "Xuất bản", width: 200 },
    { field: "slug", headerName: "Thể loại", width: 300 },
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
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.getCategories();
      console.log(response);
      const { categories }: any = response;

      const keys = getHeaderColumns(categories[0]);
      const res = getNewHeaderColumn(categories, keys);
      setLoading(false);
      setCategories(res);
    } catch (error) {
      setLoading(false);
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <Table
      title="Danh sách thông tin danh mục"
      columnsData={columsHeader}
      rowsData={categories}
      isLoading={loading}
    />
  );
};

export default CategoryList;
