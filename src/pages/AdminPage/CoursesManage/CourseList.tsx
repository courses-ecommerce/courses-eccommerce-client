import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import courseApi from "src/apis/courseApi";
import Table from "src/components/Table/Table";
import useTypingDebounce from "src/hooks/useTypingDebounce";
import { ICourse } from "src/types";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils/table";

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
    headerName: "Trạng thái",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Tên khoá học",
    width: 500,
  },
  {
    field: "author",
    headerName: "Tác giả",
    width: 150,
  },
  {
    field: "currentPrice",
    headerName: "Giá hiện tại",
    width: 100,
  },
  {
    field: "originalPrice",
    headerName: "Giá gốc",
    width: 100,
  },
];

const CourseList = () => {
  document.title = "Quản lý khoá học";
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);

  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  //debounce
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [name, setName] = useState<string>();

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, name]);

  const getCourses = async () => {
    setLoading(true);
    const params = { page, limit: pageSize, active: isActive, name };

    try {
      const response = await courseApi.getCourses(params);
      const { courses, total }: any = response;
      console.log("course", response);
      if (courses.length > 0) {
        const keys = getHeaderColumns(courses[0]);
        const data = getNewHeaderColumn(courses, keys, page, pageSize);

        const courseData = data.map((data, index) => {
          return {
            ...data,
            author: courses[index].author.fullName,
          };
        });
        setCourses(courseData);
      } else {
        setCourses(courses);
      }
      setLoading(false);
      setTotal(total);
    } catch (error) {
      setLoading(false);
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <Table
      titleBtnAdd="Tạo tài khoản mới"
      isLoading={loading}
      title="Danh sách thông tin khoá học"
      columnsData={columsHeader}
      getRowId={(row) => row._id}
      onPage={(page) => setPage(Number(page))}
      onPageSize={(pageSize) => setPageSize(Number(pageSize))}
      total={total}
      rowsData={courses}
      btnAdd={false}
      // handleAddItem={handleCreate}
      // onDeleteItem={handleDelete}
      // onModifyItem={handleModifyItem}
      // onDeleteSelectMultiItem={handleMultiDeleted}
    />
  );
};

export default CourseList;
