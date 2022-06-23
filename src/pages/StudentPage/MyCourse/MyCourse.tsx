import React, { useEffect, useState } from "react";
import myCourseApi from "src/apis/myCourseApi";
import { ICourse } from "src/types";
import { IMyCourse } from "src/types/myCourse";
import "./MyCourse.scss";
import MyCourseItem from "./MyCourseItem/MyCourseItem";

export default function MyCourse() {
  document.title = "Khoá học của tôi";

  const [courses, setCourses] = useState<ICourse[]>([]);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (!isUpdate) {
      getMyCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, page, isUpdate]);

  const getMyCourse = async () => {
    const params = { limit: pageSize, page };
    try {
      const response = await myCourseApi.getMyCourse(params);
      // console.log("ádadas", response);
      const { myCourses, total }: any = response;
      // console.log("myCourses", myCourses);
      setCourses(myCourses);

      setTotal(total);
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
      <h3>Danh sách khoá học của tôi</h3>
      <div className="my-course-content">{renderMyCourses(courses)}</div>
    </div>
  );
}
