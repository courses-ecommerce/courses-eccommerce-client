import React from "react";
import { IDetailInvoice } from "src/types/invoice";
import "./CoursePaymentDetail.scss";

interface CoursePaymentDetailProps {
  data?: IDetailInvoice;
}

const CoursePaymentDetail: React.FC<CoursePaymentDetailProps> = ({ data }) => {
  console.log("course detail là", data);

  return <div>CoursePaymentDetail</div>;
};

export default CoursePaymentDetail;
