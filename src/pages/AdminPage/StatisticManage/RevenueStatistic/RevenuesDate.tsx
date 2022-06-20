import { Box } from "@mui/material";
import { useState } from "react";
import DateRangePicker from "src/components/DateRangePicker/DateRangePicker";
import InputSelect from "src/components/InputSelect";
import { topAmountTypes } from "src/data";

export default function RevenuesDate() {
  const [top, setTop] = useState<any>(5);
  const [dateRange, setDateRange] = useState<any>(5);

  const [data, setData] = useState<any>({});

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
      <h4>Doanh thu bán khoá học của hệ thống</h4>

      {/* search input */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <DateRangePicker onChange={(date) => console.log("date range", date)} />
      </Box>

      {/* {!_.isEmpty(data) ? <Pie data={data} /> : <Loading />} */}
    </Box>
  );
}
