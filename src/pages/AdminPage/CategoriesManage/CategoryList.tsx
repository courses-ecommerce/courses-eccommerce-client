import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import categoryApi from "src/apis/categoryApi";
import Table from "src/components/Table/Table";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils/table";
import CreateCatergory from "./CreateCatergory";

const CategoryList = () => {
  document.title = "Quản lý danh mục";

  const [categories, setCategories] = useState<Object[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  //create account modal
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const columsHeader: GridColDef[] = [
    { field: "id", headerName: "STT", width: 100 },
    { field: "name", headerName: "Tên danh mục", width: 300 },
    { field: "publish", headerName: "Xuất bản", width: 200 },
    { field: "slug", headerName: "Thể loại", width: 300 },
  ];

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreated, page, pageSize]);

  //for modal
  useEffect(() => {
    setShowCreate(false);
  }, [isCreated]);

  const getCategories = async () => {
    setLoading(true);
    const params = { page, limit: pageSize };
    try {
      const response = await categoryApi.getCategories(params);
      console.log(response);
      const { categories, total }: any = response;

      const keys = getHeaderColumns(categories[0]);
      const res = getNewHeaderColumn(categories, keys);
      setLoading(false);
      setCategories(res);
      setTotal(total);
    } catch (error) {
      setLoading(false);
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <>
      <Table
        handleAddItem={() => setShowCreate(true)}
        titleBtnAdd="Tạo danh mục mới"
        title="Danh sách thông tin danh mục"
        columnsData={columsHeader}
        rowsData={categories}
        isLoading={loading}
        total={total}
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
      />
      <CreateCatergory
        show={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={(status) => setIsCreated(status)}
      />
    </>
  );
};

export default CategoryList;
