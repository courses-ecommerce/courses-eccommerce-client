import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import categoryApi from "src/apis/categoryApi";
import Table from "src/components/Table/Table";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils/table";

const CategoryList = () => {
  const [categories, setCategories] = useState<Object[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columsHeader: GridColDef[] = [
    { field: "id", headerName: "STT", width: 100 },
    { field: "name", headerName: "Tên danh mục", width: 300 },
    { field: "publish", headerName: "Xuất bản", width: 200 },
    { field: "slug", headerName: "Thể loại", width: 300 },
  ];

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.getCategories();
      // console.log(response);
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
