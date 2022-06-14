import React, { useEffect } from "react";
import cartApi from "src/apis/cartApi";

const CartList = () => {
  document.title = "Quản lý giỏ hàng";

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const response = await cartApi.getCart();
      console.log(response);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return <div>CartList</div>;
};
export default CartList;
