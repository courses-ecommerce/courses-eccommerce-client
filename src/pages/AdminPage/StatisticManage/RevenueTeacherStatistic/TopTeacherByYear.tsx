import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import statisticApi from "src/apis/statisticApi";
import InputSelect from "src/components/InputSelect";
import { numberRangeTypes } from "src/data";
import formatDay from "src/utils/formatDay";

const TopTeacherByYear = () => {
  const [year, setYear] = useState(new Date());
  const [top, setTop] = useState<number>(5);

  useEffect(() => {
    const params = { year: new Date(year).getFullYear(), top };

    getTopTeacherByYear(params);
  }, [year, top]);

  const getTopTeacherByYear = async (params?: any) => {
    // console.log("params là", params);

    try {
      const response = await statisticApi.getTopTeacherRevenueByYear(params);
      // console.log("response", response);
      const { result }: any = response;
      // console.log("result", result);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            maxDate={new Date()}
            minDate={new Date("2018-06-01")}
            label="Chọn  năm"
            value={year}
            onChange={(newYear: any) => {
              setYear(newYear);
            }}
            renderInput={(params) => (
              <TextField sx={{ width: 200 }} {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <InputSelect
          list={numberRangeTypes}
          defaultValue={top}
          onChange={(e) => setTop(e.target.value)}
        />
      </Box>
      <h3>Top giảng viên trong năm {formatDay(year, "yyyy")}</h3>

      <div>ádas</div>
    </Box>
  );
};
export default TopTeacherByYear;
