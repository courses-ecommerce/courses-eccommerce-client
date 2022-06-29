import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import teacherApi from "src/apis/teacherApi";
import DateRangePicker from "src/components/DateRangePicker/DateRangePicker";
import "./TeacherRevenue.scss";

export default function TeacherRevenue() {
  const [dateRange, setDateRange] = useState<any>();

  useEffect(() => {
    // console.log("date range", dateRange);
    getTeacherRevenue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  const getTeacherRevenue = async () => {
    try {
      const response = await teacherApi.getTeacherRevenueByRangeDate(dateRange);

      console.log("response", response);
      const { teacher }: any = response;
      console.log("teacher", teacher);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="teacher-revenue">
      <h3>Doanh thu của tôi</h3>
      <Box sx={{ display: "flex", gap: 1 }}>
        <DateRangePicker onChange={(date) => setDateRange(date)} />
      </Box>
    </div>
  );
}
