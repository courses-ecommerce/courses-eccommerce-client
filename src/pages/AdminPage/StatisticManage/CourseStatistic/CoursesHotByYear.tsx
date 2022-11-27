import { Box, Button, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from "react-toastify";
import statisticApi from "src/apis/statisticApi";
import InputSelect from "src/components/InputSelect";
import Loading from "src/components/Loading/Loading";
import { topAmountTypes } from "src/data/searchInfo";
import { LINK_DOMAIN } from "src/data/link";
import { getOptionsCharBar, getValueChartVertical } from "src/utils/chart";
import formatDate from "src/utils/formatDay";

export default function CoursesHotByYear() {
  const [year, setYear] = useState<any>(new Date());
  const [top, setTop] = useState<any>(5);
  const [courseTopByYear, setCourseTopByYear] = useState<any>({});
  const [options, setOptions] = useState<any>();
  const [excelHref, setExcelHref] = useState<string>("");

  useEffect(() => {
    const options = getOptionsCharBar(
      `Biểu đồ thể hiện top khoá học bán chạy nhất trong năm ${formatDate(
        year,
        "yyyy"
      )}`
    );

    setOptions(options);

    getHotCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, top]);

  const getHotCourses = async () => {
    const params = { top, year: new Date(year).getFullYear(), exports: true };
    // console.log("params", params);

    try {
      const response = await statisticApi.getHotCourseByYear(params);
      // console.log(response);
      const { result, file }: any = response;
      // console.log("result", result);

      const values = getValueChartVertical(
        result,
        "courseName",
        "count",
        "Số lượng bán"
      );
      // console.log("values là", values);

      setCourseTopByYear(values);
      setExcelHref(file);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const goToExcel = () => {
    if (!excelHref) {
      toast.warning("Link bị lỗi, hãy chọn năm lại", {
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
        marginBottom: 10,
      }}
    >
      {/* search input */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            label="Chọn năm"
            value={year}
            minDate={new Date("2018-06-01")}
            maxDate={new Date()}
            onChange={(newYear) => {
              setYear(newYear);
            }}
            renderInput={(params: any) => (
              <TextField sx={{ width: 180 }} {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <InputSelect
          defaultValue={top}
          hideErrorMessage={true}
          list={topAmountTypes}
          onChange={(e) => setTop(e.target.value)}
        />
        <Button
          sx={{ height: 35 }}
          variant="contained"
          color="success"
          onClick={goToExcel}
        >
          Xuất file
        </Button>
      </Box>

      {!_.isEmpty(courseTopByYear) ? (
        <Box sx={{ width: 1000 }}>
          <Bar options={options} data={courseTopByYear} />
        </Box>
      ) : (
        <Loading />
      )}
    </Box>
  );
}
