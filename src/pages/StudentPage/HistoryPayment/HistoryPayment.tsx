import React, { useEffect } from "react";
import userApi from "src/apis/userApi";

const HistoryPayment = () => {
  document.title = "Lịch sử thanh toán";
  useEffect(() => {
    getHistoryPayment();
  }, []);

  const getHistoryPayment = async () => {
    try {
      const response = await userApi.getHistoryPayment();
      console.log("ádadas", response);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="history-payment">
      <h3>Lịch sử thanh toán</h3>
    </div>
  );
};

export default HistoryPayment;
