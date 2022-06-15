import React, { useEffect, useState } from "react";
import cartApi from "src/apis/cartApi";
import Loading from "src/components/Loading/Loading";
import { ICart, ICartInfo } from "src/types/cart";
import CartItem from "./CartItem/CartItem";
import "./CartList.scss";

const CartList = () => {
  document.title = "Quản lý giỏ hàng";
  const [cart, setCart] = useState<ICart[]>([]);
  // const [wishlist, setWishlist] = useState<ICart[]>([]);
  const [cartInfo, setCartInfo] = useState<ICartInfo>({});

  useEffect(() => {
    getCart();
  }, []);

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
      <div className="cart-items">{renderCartItem(cart) || <Loading />}</div>
    </div>
  );
};
export default CartList;
