import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Pie } from "react-chartjs-2";
import statisticApi from "src/apis/statisticApi";
import Loading from "src/components/Loading/Loading";
import { getValueChartPie } from "src/utils/chart";

export default function CourseTotal() {
  const [data, setData] = useState<any>({});
  useEffect(() => {
    getStatisticCourses();
  }, []);

  const getStatisticCourses = async () => {
    try {
      const response = await statisticApi.getCourses();
      // console.log(response);
      const values = getValueChartPie(response);
      setData(values);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };
  return (
    <Box
      sx={{
        width: 350,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h4>Tổng số lượng khoá học hiện đang có</h4>
      {!_.isEmpty(data) ? <Pie data={data} /> : <Loading />}
    </Box>
  );
}
