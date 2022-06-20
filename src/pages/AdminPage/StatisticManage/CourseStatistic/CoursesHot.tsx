import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import statisticApi from "src/apis/statisticApi";
import Loading from "src/components/Loading/Loading";
import { getValueChartPie } from "src/utils/chart";
import InputSelect from "src/components/InputSelect";
import { topAmountTypes } from "src/data";

export default function CoursesHot() {
  const [year, setYear] = useState<any>(new Date());
  const [top, setTop] = useState<any>(5);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    getHotCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, top]);

  const getHotCourses = async () => {
    const params = { top, year: new Date(year).getFullYear(), exports: true };
    console.log("params", params);

    try {
      const response = await statisticApi.getHotCourse(params);
      console.log(response);

      // const values = getValueCharts(response);
      // setData(values);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h4>Các khoá học đang hot của hệ thống</h4>

      {/* search input */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            label="Chọn năm"
            value={year}
            onChange={(newYear) => {
              setYear(newYear);
            }}
            renderInput={(params: any) => (
              <TextField sx={{ width: 180 }} {...params} helperText={null} />
            )}
            maxDate={new Date()}
          />
        </LocalizationProvider>
        <InputSelect
          defaultValue={top}
          list={topAmountTypes}
          onChange={(e) => setTop(e.target.value)}
        />
      </Box>

      {!_.isEmpty(data) ? <Pie data={data} /> : <Loading />}
    </Box>
  );
}
