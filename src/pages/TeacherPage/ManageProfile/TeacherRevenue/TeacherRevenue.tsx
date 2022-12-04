import { Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import teacherApi from "src/apis/teacherApi";
import DateRangePicker from "src/components/DateRangePicker/DateRangePicker";
import Loading from "src/components/Loading/Loading";
import RevenueInvoiceItem from "src/pages/AdminPage/StatisticManage/RevenueTeacherStatistic/RevenueInvoiceItem";
import { IInvoice } from "src/types/invoice";
import { ITeacher } from "src/types/statistic";
import { numberLocale } from "src/utils";
import formatDate from "src/utils/formatDay";
import "./TeacherRevenue.scss";

export default function TeacherRevenue() {
  document.title = "Doanh thu cá nhân";

  const [dateRange, setDateRange] = useState<any>();
  const [teacherInfo, setTeacherInfo] = useState<ITeacher>();
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // console.log("date range", dateRange);
    dateRange && getTeacherRevenue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  const getTeacherRevenue = async () => {
    setIsLoading(true);
    try {
      const response = await teacherApi.getTeacherRevenueByRangeDate(dateRange);

      // console.log("response", response);
      const { teacher, detailInvoices }: any = response;
      // console.log("teacher", teacher);
      // console.log(" detailInvoices", detailInvoices);
      setInvoices(detailInvoices);
      setTeacherInfo(teacher);
      setIsLoading(false);
    } catch (error) {
      console.log("lỗi rồi", { error });
      setIsLoading(false);
    }
  };

  const renderRevenueInvoices = (invoices: IInvoice[] = []) => {
    if (invoices.length > 0) {
      return invoices.map((invoice, index) => (
        <RevenueInvoiceItem data={invoice} key={index} />
      ));
    }

    return <div>Không có thông tin</div>;
  };

  return (
    <div className="teacher-revenue">
      <h3>
        Doanh thu của tôi từ ngày{" "}
        {formatDate(dateRange?.start, "dd-MM-yyyy HH:mm:ss")} đến ngày{" "}
        {formatDate(dateRange?.end, "dd-MM-yyyy HH:mm:ss")}
      </h3>
      <Box sx={{ display: "flex", gap: 1 }}>
        <DateRangePicker onChange={(date) => setDateRange(date)} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <div className="revenue-teacher-info">
          <h3>Thông tin giản viên</h3>
          <div className="info">
            <span>
              <b>Tên giảng viên: </b>
              {teacherInfo?.fullName}
            </span>
            <span>
              <b>Tổng đã bán được trong tháng: </b>
              {teacherInfo?.numOfDetailInvoice}
            </span>
            <span>
              <b>Tổng tiền nhận được: </b>
              {numberLocale(teacherInfo?.revenue, " đồng")}
            </span>
          </div>
        </div>
        <Divider />
        <div className="revenue-teacher-content">
          <h3>Thông tin các khoá học đã bán trong tháng</h3>
          <div className="content">
            {!isLoading ? renderRevenueInvoices(invoices) : <Loading />}
          </div>
        </div>
      </Box>
    </div>
  );
}
