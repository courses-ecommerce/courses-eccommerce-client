import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import statisticApi from "src/apis/statisticApi";
import DateRangePicker from "src/components/DateRangePicker/DateRangePicker";
import InputSelect from "src/components/InputSelect";
import { dateTypes } from "src/data";
import { LINK_DOMAIN } from "src/data/link";

export default function RevenuesDate() {
  const [dateType, setDateType] = useState<any>("day");
  const [dateRange, setDateRange] = useState<any>(5);

  const [data, setData] = useState<any>({});

  useEffect(() => {
    getRevenueByDateRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateType, dateRange]);

  const getRevenueByDateRange = async () => {
    const params = { ...dateRange, type: dateType, exports: true };
    console.log("params nè", params);

    try {
      const response = await statisticApi.getRevenueByRangeDate(params);
      const { result, file }: any = response;
      console.log("ád", response);
      console.log("ád", result, LINK_DOMAIN + file);
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
      <h4>Doanh thu bán khoá học của hệ thống</h4>

      {/* search input */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <DateRangePicker onChange={(date) => setDateRange(date)} />
        <InputSelect
          defaultValue={dateType}
          list={dateTypes}
          onChange={(e) => setDateType(e.target.value)}
        />
      </Box>

      {/* {!_.isEmpty(data) ? <Pie data={data} /> : <Loading />} */}
    </Box>
  );
}
