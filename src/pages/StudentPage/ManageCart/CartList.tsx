import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cartApi from "src/apis/cartApi";
import Loading from "src/components/Loading/Loading";
import { selectAuthorization } from "src/reducers/authSlice";
import { ICart, ICartInfo } from "src/types/cart";
import { numberLocale } from "src/utils";
import CartItem from "./CartItem/CartItem";
import "./CartList.scss";

const CartList = () => {
  document.title = "Quản lý giỏ hàng";
  const [cart, setCart] = useState<ICart[]>([]);
  // const [wishlist, setWishlist] = useState<ICart[]>([]);
  const [cartInfo, setCartInfo] = useState<ICartInfo>({});

  const { amount_cart } = useSelector(selectAuthorization);

  useEffect(() => {
    getCart();
  }, [amount_cart]);

  useEffect(() => {
    console.log("cartInfo", cartInfo);
  }, [cartInfo]);

  const getCart = async () => {
    try {
      const response = await cartApi.getCart();
      console.log(response);
      const { carts, estimatedPrice, totalDiscount, totalPrice }: any =
        response;

      setCart(carts);
      setCartInfo({ estimatedPrice, totalDiscount, totalPrice });
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderCartItem = (carts: ICart[]) => {
    return (
      carts.length > 0 &&
      carts.map((cart: ICart, index) => (
        <CartItem key={index} cartItem={cart} />
      ))
    );
  };

  return (
    <div className="cart-list">
      <h3>Thông tin giỏ hàng</h3>
      <div className="cart-content">
        <div className="cart-items">{renderCartItem(cart) || <Loading />}</div>
        {cart.length > 0 && (
          <div className="cart-price">
            <h3>Tổng tiền giỏ hàng</h3>
            <Divider sx={{ marginY: 1 }} />
            <span>
              <b>Giá ước tính: </b>
              {numberLocale(cartInfo.estimatedPrice)} đồng
            </span>
            <span>
              <b>Tổng giảm giá: </b>
              {numberLocale(cartInfo.totalDiscount)} đồng
            </span>
            <Divider />
            <span>
              <b>Thành tiền: </b>
              <span style={{ color: "red", fontWeight: 700 }}>
                {numberLocale(cartInfo.totalPrice)} đồng
              </span>
            </span>
            <span className="note">
              Lưu ý: suy nghĩ kỹ trước khi mua, không hoàn trả lại sau khi mua
            </span>
            <Button variant="contained" color="success">
              Thanh toán
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartList;
