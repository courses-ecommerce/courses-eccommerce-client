import React, { useEffect, useState } from "react";

import { Pie } from "react-chartjs-2";
import statisticApi from "src/apis/statisticApi";
import _ from "lodash";
import { Box } from "@mui/material";
import { getValueCharts } from "src/utils/chart";
import Loading from "src/components/Loading/Loading";

export default function StatisticCourses() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    getStatisticCourses();
  }, []);

  const getStatisticCourses = async () => {
    try {
      const response = await statisticApi.getCourses();
      const values = getValueCharts(response);
      setData(values);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <Box
      sx={{
        marginTop: 5,
        height: 450,
        width: 450,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h4>Thống kê số lượng khoá học</h4>
      {!_.isEmpty(data) ? <Pie data={data} /> : <Loading />}
    </Box>
  );
}
