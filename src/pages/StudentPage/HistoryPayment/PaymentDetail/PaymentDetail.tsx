import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import invoicesApi from "src/apis/invoicesApi";
import Loading from "src/components/Loading/Loading";
import { IDetailInvoice, IInvoice } from "src/types/invoice";
import { numberLocale, translateVi } from "src/utils";
import formatDate from "src/utils/formatDay";
import CoursePaymentDetail from "./CoursePaymentDetail/CoursePaymentDetail";
import "./PaymentDetail.scss";

const PaymentDetail = () => {
  document.title = "Thông tin chi tiết hoá đơn";
  const navigate = useNavigate();
  const { id } = useParams();

  const [invoice, setInvoice] = useState<IInvoice>({});
  const [detailInvoice, setDetailInvoice] = useState<IDetailInvoice[]>([]);

  useEffect(() => {
    getPaymenyDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getPaymenyDetail = async () => {
    try {
      const response = await invoicesApi.getInvoiceDetail(id);
      //   console.log("payment detail là", response);
      const { invoice }: any = response;
      const { detailInvoices }: any = invoice[0];
      // console.log("invoice là", invoice[0]);
      // console.log("detailInvoices là", detailInvoices);
      setDetailInvoice(detailInvoices);
      setInvoice(invoice[0]);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderCoursePaymentDetail = (courses: IDetailInvoice[]) => {
    if (courses.length === 0) {
      return <Loading />;
    }

    return (
      courses.length > 0 &&
      courses.map((course, index) => (
        <CoursePaymentDetail data={course} key={index} />
      ))
    );
  };

  return (
    <>
      <div className="navs">
        <span onClick={() => navigate(-1)}>Quay lại lịch sử hoá đơn</span>
      </div>
      <div className="payments-detail">
        <span className="title">
          Thông tin chi tiết hoá đơn: <i>{invoice._id}</i>
        </span>

        <div className="invoice-info">
          <span>
            <b>Mã giao dịch: </b>
            {invoice.transactionId}
          </span>
          <span>
            <b>Người mua: </b>
            {invoice.user?.fullName}
          </span>
          <span>
            <b>Phương thức thanh toán: </b>
            {invoice.paymentMethod}
          </span>

          <span>
            <b>Trạng thái: </b>
            {translateVi(invoice.status)}
          </span>
          <span>
            <b>Tổng giá tiền: </b>
            {numberLocale(invoice.totalPrice, " đồng")}
          </span>
          <span>
            <b>Giá được giảm: </b>
            {numberLocale(invoice.totalDiscount)}
          </span>
          <span>
            <b>Ngày mua: </b>
            {formatDate(invoice.createdAt, "dd-MM-yyyy hh:mm")}
          </span>
        </div>
        <Divider />
        <div className="invoice-cart">
          <span className="cart-title">Các khoá học đã mua</span>
          <div className="cart-content">
            {renderCoursePaymentDetail(detailInvoice)}
          </div>
        </div>
      </div>
    </>
  );
};
export default PaymentDetail;
