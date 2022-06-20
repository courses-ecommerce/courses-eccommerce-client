import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import invoicesApi from "src/apis/invoicesApi";
import { IInvoice } from "src/types/invoice";
import { numberLocale, translateVi } from "src/utils";
import formatDate from "src/utils/formatDay";
import "./PaymentDetail.scss";

const PaymentDetail = () => {
  document.title = "Thông tin chi tiết hoá đơn";
  const navigate = useNavigate();
  const { id } = useParams();

  const [invoice, setInvoice] = useState<IInvoice>({});

  useEffect(() => {
    getPaymenyDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getPaymenyDetail = async () => {
    try {
      const response = await invoicesApi.getInvoiceDetail(id);
      //   console.log("payment detail là", response);
      const { invoice }: any = response;
      console.log("invoice là", invoice[0]);
      setInvoice(invoice[0]);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <>
      <div className="navs">
        <span onClick={() => navigate(-1)}>Quay lại lịch sử hoá đơn</span>
      </div>
      <div className="payments-detail">
        <span className="title">Thông tin chi tiết hoá đơn: {invoice._id}</span>
        <div className="payment-preview">
          <div className="detail-info">
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
              {formatDate(invoice.createdAt, "dd-MM-yyyy")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default PaymentDetail;
