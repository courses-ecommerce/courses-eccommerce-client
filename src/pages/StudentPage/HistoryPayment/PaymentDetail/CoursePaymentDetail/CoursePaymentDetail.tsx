import React from "react";
import Image from "src/components/Image/Image";
import { IDetailInvoice } from "src/types/invoice";
import { numberLocale } from "src/utils";
import "./CoursePaymentDetail.scss";

interface CoursePaymentDetailProps {
  data?: IDetailInvoice;
}

const CoursePaymentDetail: React.FC<CoursePaymentDetailProps> = ({ data }) => {
  // console.log("course detail là", data);

  return (
    <div className="course-payment-item">
      <div className="thumbnail">
        <Image width={300} src={data?.courseThumbnail} />
      </div>
      <div className="content">
        <span>
          <b>Mã khoá học: </b>
          {data?.courseId}
        </span>
        <span>
          <b>Tên khoá học: </b>
          {data?.courseName}
        </span>
        <span>
          <b>Giá gốc: </b>
          {numberLocale(data?.courseCurrentPrice, " đồng")}
        </span>
        <span>
          <b>Giá giảm: </b>
          {numberLocale(data?.discount, " đồng")}
        </span>
        <span>
          <b>Giá thanh toán: </b>
          {numberLocale(data?.amount, " đồng")}
        </span>
      </div>
    </div>
  );
};

export default CoursePaymentDetail;
