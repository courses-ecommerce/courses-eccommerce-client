import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import categoryApi from "src/apis/categoryApi";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import Table from "src/components/Table/Table";
import { statusTypes } from "src/data";
import useTypingDebounce from "src/hooks/useTypingDebounce";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils/table";
import CreateCategory from "./CreateCategory";
import DeleteCatergory from "./DeleteCategory";
import MultiDeleteCategory from "./MultiDeleteCategory";
import UpdateCategory from "./UpdateCategory";

const CategoryList = () => {
  document.title = "Quản lý danh mục";

  const [categories, setCategories] = useState<Object[]>([]);
  const [categoryId, setCategoryId] = useState<string | number>("");
  const [categoryIds, setCategoryIds] = useState<string[] | number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //for search
  //for debounce
  const [publish, setPublish] = useState<boolean>(true);
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [categoryName, setCategoryName] = useState<string>();

  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  //modal
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showMultiDelete, setShowMultiDelete] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  const columsHeader: GridColDef[] = [
    { field: "id", headerName: "STT", width: 100 },
    { field: "name", headerName: "Tên danh mục", width: 300 },
    { field: "publish", headerName: "Xuất bản", width: 200 },
    { field: "slug", headerName: "Thể loại", width: 300 },
  ];

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    showCreate,
    showDelete,
    showMultiDelete,
    showUpdate,
    page,
    pageSize,
    categoryName,
    publish,
  ]);

  //debounce to search
  useEffect(() => {
    setCategoryName(debouncedValue);
  }, [debouncedValue]);

  const getCategories = async () => {
    setLoading(true);
    const params = { name: categoryName, publish, page, limit: pageSize };
    try {
      const response = await categoryApi.getCategories(params);
      console.log(response);
      const { categories, total }: any = response;

      if (categories.length > 0) {
        const keys = getHeaderColumns(categories[0]);
        const res = getNewHeaderColumn(categories, keys);
        setCategories(res);
      } else {
        setCategories(categories);
      }
      setLoading(false);
      setTotal(total);
    } catch (error) {
      setLoading(false);
      console.log("lỗi rồi", { error });
    }
  };

  const handleDelete = (id: string | number) => {
    setCategoryId(id);
    setShowDelete(true);
  };
  const handleMultiDeleted = (ids: string[] | number[]) => {
    setCategoryIds(ids);
    setShowMultiDelete(true);
  };
  const handleModifyItem = async (id: string | number) => {
    setCategoryId(id);
    setShowUpdate(true);
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
              placeholder="Tìm kiếm bằng tên danh mục"
              onChange={(e: any) => setValue(e.target.value)}
            />
            <InputSelect
              defaultValue={publish}
              list={statusTypes}
              onChange={(e) => setPublish(e.target.value)}
            />
          </Box>
        }
        handleAddItem={() => setShowCreate(true)}
        title="Danh sách thông tin danh mục"
        titleBtnAdd="Tạo danh mục mới"
        titleBtnMultiDelete="Xoá thông tin danh mục"
        columnsData={columsHeader}
        rowsData={categories}
        isLoading={loading}
        total={total}
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
        onDeleteItem={handleDelete}
        onModifyItem={handleModifyItem}
        onDeleteSelectMultiItem={handleMultiDeleted}
      />
      <CreateCategory
        show={showCreate}
        onClose={() => setShowCreate(false)}
        setShow={setShowCreate}
      />
      <DeleteCatergory
        id={categoryId}
        show={showDelete}
        onClose={() => setShowDelete(false)}
        setShow={setShowDelete}
      />
      <MultiDeleteCategory
        ids={categoryIds}
        show={showMultiDelete}
        onClose={() => setShowMultiDelete(false)}
        setShow={setShowMultiDelete}
      />
      <UpdateCategory
        id={categoryId}
        show={showUpdate}
        onClose={() => setShowUpdate(false)}
        setShow={setShowUpdate}
      />
    </>
  );
};

export default CategoryList;
