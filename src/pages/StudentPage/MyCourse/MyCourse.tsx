import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import myCourseApi from "src/apis/myCourseApi";
import InputSelect from "src/components/InputSelect";
import Loading from "src/components/Loading/Loading";
import Pagination from "src/components/Pagination/Pagination";
import { myCourseTypes } from "src/data";
import { ICourse } from "src/types";
import { IMyCourse } from "src/types/myCourse";
import { numberRound } from "src/utils";
import "./MyCourse.scss";
import MyCourseItem from "./MyCourseItem/MyCourseItem";

export default function MyCourse() {
  document.title = "Khoá học của tôi";

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [sort, setSort] = useState<any>("progress-asc");

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  // //search

  const limit = 6;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    if (!isUpdate) {
      getMyCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  useEffect(() => {
    getMyCourse();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, limit]);

  const getMyCourse = async () => {
    const params = { limit, page, sort };
    try {
      const response = await myCourseApi.getMyCourse(params);
      // console.log("ádadas", response);
      const { myCourses, total }: any = response;
      // console.log("myCourses", myCourses, total);
      setCourses(myCourses);
      setTotal(numberRound(total / limit));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderMyCourses = (courses: IMyCourse[]) => {
    return (
      courses.length > 0 &&
      courses.map((course, index) => (
        <MyCourseItem
          isUpdate={(status) => setIsUpdate(status)}
          data={course}
          key={index}
        />
      ))
    );
  };

  return (
    <div className="my-course">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <h3>Danh sách khoá học của tôi</h3>
        <InputSelect
          hideErrorMessage={true}
          defaultValue={sort}
          list={myCourseTypes}
          onChange={(e) => setSort(e.target.value)}
        />
      </Box>
      <div className="my-course-content">
        {renderMyCourses(courses) || <Loading />}
      </div>
      <div className="my-course-pagination">
        <Pagination
          pageActive={page}
          total={total}
          onChangeValue={(value: any) => setPage(value)}
        />
      </div>
    </div>
  );
}
