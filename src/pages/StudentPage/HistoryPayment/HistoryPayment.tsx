import React, { useEffect } from "react";
import usertApi from "src/apis/userApi";

const HistoryPayment = () => {
  document.title = "Lịch sử thanh toán";
  useEffect(() => {
    getHistoryPayment();
  }, []);

  const getHistoryPayment = async () => {
    try {
      const response = await usertApi.getHistoryPayment();
      console.log("ádadas", response);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return <div>HistoryPayment</div>;
};

export default HistoryPayment;
