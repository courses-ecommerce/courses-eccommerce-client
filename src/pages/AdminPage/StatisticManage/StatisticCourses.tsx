import React, { useEffect } from "react";
import statisticApi from "src/apis/statisticApi";

export default function StatisticCourses() {
  useEffect(() => {
    getStatisticCourses();
  }, []);

  const getStatisticCourses = async () => {
    try {
      const response = await statisticApi.getCourses();
      console.log(response);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return <div>StatistisdsacUser</div>;
}
