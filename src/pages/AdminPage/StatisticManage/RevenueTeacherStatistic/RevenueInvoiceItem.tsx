import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "src/components/Image/Image";
import { IDetailInvoice } from "src/types/invoice";
import { numberLocale } from "src/utils";
import "./RevenueTeacherStatistic.scss";
interface RevenueInvoiceItemProps {
  data?: IDetailInvoice;
}

const RevenueInvoiceItem: React.FC<RevenueInvoiceItemProps> = ({ data }) => {
  //   console.log("data là", data);
  const navigate = useNavigate();

  return (
    <div className="revenue-invoice-item">
      <div
        className="thumbnail"
        onClick={() => navigate(`/courses/${data?.courseSlug}`)}
      >
        <Image width={200} />
      </div>
      <div className="content">
        <span>
          <b>Mã hoá đơn: </b>
          {data?.invoice}
        </span>
        <span>
          <b>Giá gốc: </b>
          {numberLocale(data?.courseCurrentPrice, " đồng")}
        </span>
        <span>
          <b>Ngày bán: </b>
          {data?.createdAt}
        </span>
        <span>
          <b>Giảm giá: </b>
          {data?.discount}
        </span>
        <span>
          <b>Tên khoá học: </b>
          {data?.courseName}
        </span>
        <span>
          <b>Số tiền nhận được: </b>
          {numberLocale(data?.amount, " đồng")}
        </span>
      </div>
    </div>
  );
};
export default RevenueInvoiceItem;
