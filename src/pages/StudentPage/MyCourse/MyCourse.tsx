import React, { useEffect } from "react";
import myCourseApi from "src/apis/myCourseApi";

export default function MyCourse() {
  document.title = "Khoá học của tôi";

  useEffect(() => {
    getMyCourse();
  }, []);

  const getMyCourse = async () => {
    try {
      const response = await myCourseApi.getMyCourse();
      console.log("ádadas", response);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="my-course">
      <h3>Khoá học của tôi</h3>
    </div>
  );
}
