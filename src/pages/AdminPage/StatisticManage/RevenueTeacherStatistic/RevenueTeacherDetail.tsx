import { Button, Divider, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import statisticApi from "src/apis/statisticApi";
import Loading from "src/components/Loading/Loading";
import { LINK_DOMAIN } from "src/data/link";
import { IInvoice } from "src/types/invoice";
import { ITeacher } from "src/types/statistic";
import { checkGender, numberLocale } from "src/utils";
import formatDate from "src/utils/formatDay";
import RevenueInvoiceItem from "./RevenueInvoiceItem";
import "./RevenueTeacherStatistic.scss";

const RevenueTeacherDetail = () => {
  document.title = "Doanh thu chi tiết giảng viên";
  const navigate = useNavigate();
  const { id } = useParams();

  const [teacherRevenueDetail, setTeacherRevenueDetail] = useState<ITeacher>();
  const [excelHref, setExcelHref] = useState<string>();
  const [monthAndYear, setMonthAndYear] = useState<any>(new Date());

  useEffect(() => {
    const params = {
      month: new Date(monthAndYear).getMonth() + 1,
      year: new Date(monthAndYear).getFullYear(),
      exports: true,
    };

    // console.log("đã lấy được params là", params);

    getRevenueTeacherDetailByMonth(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, monthAndYear]);

  const getRevenueTeacherDetailByMonth = async (params?: any) => {
    try {
      const response = await statisticApi.getTeacherRevenueById(id, params);
      // console.log("data là", response);
      const { file, teacher }: any = response;
      // console.log("teacher", teacher);
      setTeacherRevenueDetail(teacher);
      setExcelHref(file);
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

  const renderRevenueInvoices = (invoices: IInvoice[] = []) => {
    return (
      invoices.length > 0 &&
      invoices.map((invoice, index) => (
        <RevenueInvoiceItem data={invoice} key={index} />
      ))
    );
  };
  return (
    <>
      <div className="navs">
        <span onClick={() => navigate(-1)}>Quay lại khoá học của tôi</span>
      </div>
      <div className="revenue-teacher-detail">
        <h3>{`Thông tin chi tiết của bảng lương của giảng viên tháng ${formatDate(
          monthAndYear,
          "MM-yyyy"
        )}`}</h3>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            gap: 1,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year", "month"]}
              label="Chọn tháng năm"
              minDate={new Date("2018-06-01")}
              maxDate={new Date()}
              value={monthAndYear}
              onChange={(newMonthAndYear) => {
                setMonthAndYear(newMonthAndYear);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </LocalizationProvider>
          <Button variant="contained" color="success" onClick={goToExcel}>
            Xuất excel
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div className="revenue-teacher-info">
            <h3>Thông tin giản viên</h3>
            <div className="info">
              <span>
                <b>Mã id teacher: </b>
                {teacherRevenueDetail?._id}
              </span>
              <span>
                <b>Địa chỉ email: </b>
                {teacherRevenueDetail?.account?.email}
              </span>
              <span>
                <b>Tên giảng viên: </b>
                {teacherRevenueDetail?.fullName}
              </span>
              <span>
                <b>Giới tính: </b>
                {checkGender(teacherRevenueDetail?.gender)}
              </span>
              <span>
                <b>Chức vụ: </b>
                {teacherRevenueDetail?.account?.role}
              </span>
              <span>
                <b>Số điện thoại: </b>
                {teacherRevenueDetail?.phone}
              </span>
              <span>
                <b>Tổng đã bán được trong tháng: </b>
                {teacherRevenueDetail?.numOfDetailInvoice}
              </span>
              <span>
                <b>Tổng tiền nhận được: </b>
                {numberLocale(teacherRevenueDetail?.revenue, " đồng")}
              </span>
            </div>
          </div>
          <Divider />
          <div className="revenue-teacher-content">
            <h3>Thông tin các khoá học đã bán trong tháng</h3>
            <div className="content">
              {renderRevenueInvoices(teacherRevenueDetail?.detailInvoices) || (
                <Loading />
              )}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};
export default RevenueTeacherDetail;
