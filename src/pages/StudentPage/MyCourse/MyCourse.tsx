import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import myCourseApi from "src/apis/myCourseApi";
import Table from "src/components/Table/Table";
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
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Tên khoá học",
    width: 400,
  },
  {
    field: "author",
    headerName: "Tác giả",
    width: 250,
  },
  {
    field: "percentProgress",
    headerName: "Tiến độ hoàn thành",
    width: 200,
  },
];

export default function MyCourse() {
  document.title = "Khoá học của tôi";

  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[]>([]);

  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    getMyCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, page]);

  const getMyCourse = async () => {
    const params = { limit: pageSize, page };
    try {
      const response = await myCourseApi.getMyCourse(params);
      // console.log("ádadas", response);
      const { myCourses, total }: any = response;
      console.log("myCourses", myCourses);
      if (myCourses.length > 0) {
        const keys = getHeaderColumns(myCourses[0]);
        const data = getNewHeaderColumn(myCourses, keys, page, pageSize);

        const courseData = data.map((data, index) => {
          return {
            name: data.course.name,
            author: data.course.author.fullName,
            ...data,
          };
        });
        setCourses(courseData);
      } else {
        setCourses(myCourses);
      }
      setLoading(false);
      setTotal(total);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="my-course">
      <Table
        title="Danh sách khoá học của tôi"
        isLoading={loading}
        columnsData={columsHeader}
        getRowId={(row) => row._id}
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
        total={total}
        rowsData={courses}
        btnAdd={false}
        isCheckBoxSelection={false}
        isModify={false}
        btnMultiDeleted={false}
        onViewItemDetail={(id) => navigate(`${id}`)}
        // handleAddItem={handleCreate}
        // onDeleteItem={handleDelete}
        // onModifyItem={handleModifyItem}
        // onDeleteSelectMultiItem={handleMultiDeleted}
      />
    </div>
  );
}
