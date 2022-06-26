import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import statisticApi from "src/apis/statisticApi";
import DateRangePicker from "src/components/DateRangePicker/DateRangePicker";
import InputSelect from "src/components/InputSelect";
import { dateTypes } from "src/data";
import { LINK_DOMAIN } from "src/data/link";

export default function RevenueByRangeDate() {
  const [dateType, setDateType] = useState<any>("day");
  const [dateRange, setDateRange] = useState<any>(5);
  const [excelHref, setExcelHref] = useState<string>();

  const [data, setData] = useState<any>({});

  useEffect(() => {
    getRevenueByDateRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateType, dateRange]);

  const getRevenueByDateRange = async () => {
    const params = { ...dateRange, type: dateType, exports: true };
    // console.log("params nè", params);

    try {
      const response = await statisticApi.getRevenueByRangeDate(params);
      const { result, file }: any = response;
      // console.log("ád", result);

      setExcelHref(LINK_DOMAIN + file);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };
  const goToExcel = () => {
    if (!excelHref) {
      toast.warning("Link bị lỗi, hãy chọn ngày lại", {
        position: "bottom-right",
      });
      return;
    }
    //go to excel
    window.location.href = LINK_DOMAIN + excelHref;
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "end",
        }}
      >
        <DateRangePicker onChange={(date) => setDateRange(date)} />
        <InputSelect
          defaultValue={dateType}
          hideErrorMessage={true}
          list={dateTypes}
          onChange={(e) => setDateType(e.target.value)}
        />
        <Button
          sx={{ height: 36 }}
          variant="contained"
          color="success"
          onClick={goToExcel}
        >
          Xuất excel
        </Button>
      </Box>

      {/* {!_.isEmpty(data) ? <Pie data={data} /> : <Loading />} */}
    </Box>
  );
}
