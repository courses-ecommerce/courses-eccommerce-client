import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import cartApi from "src/apis/cartApi";
import Image from "src/components/Image/Image";
import Input from "src/components/Input";
import { getTotalCart, isPending, isSuccess } from "src/reducers/authSlice";
import { ICart } from "src/types/cart";
import { numberLocale } from "src/utils";
import "./CartItem.scss";

interface CartItemProps {
  cartItem?: ICart;
  onUpdate?: (isComplete: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem, onUpdate }) => {
  // console.log(cartItem);
  const dispatch = useDispatch();

  const handleDeleteCart = async () => {
    onUpdate?.(false);
    dispatch(isPending());
    try {
      const response = await cartApi.removeItemFromCart(cartItem?.course?._id);
      const { carts }: any = response;
      // console.log("carts", carts.length);
      dispatch(getTotalCart(carts.length));
      onUpdate?.(true);
      dispatch(isSuccess());
      toast.success("Xoá khoá học thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      onUpdate?.(true);
      dispatch(isSuccess());
      toast.warning("Xoá khoá học thất bại", { position: "bottom-right" });
    }
  };

  const handleBuyLater = async () => {
    const params = { wishlist: true };
    onUpdate?.(false);
    dispatch(isPending());
    try {
      const response = await cartApi.addCouponToCart(
        cartItem?.course?._id,
        params
      );
      console.log(response);
      onUpdate?.(true);
      dispatch(isSuccess());
    } catch (error) {
      console.log("lỗi rồi", { error });
      onUpdate?.(true);
      dispatch(isSuccess());
    }
  };
  const handleAddToBuy = async () => {
    const params = { wishlist: false };
    onUpdate?.(false);
    dispatch(isPending());
    try {
      const response = await cartApi.addCouponToCart(
        cartItem?.course?._id,
        params
      );
      console.log(response);
      onUpdate?.(true);
      dispatch(isSuccess());
    } catch (error) {
      console.log("lỗi rồi", { error });
      onUpdate?.(true);
      dispatch(isSuccess());
    }
  };

  return (
    <div className="cart-item">
      <div className="image">
        <Image width={150} height={120} src={cartItem?.course?.thumbnail} />
      </div>
      <div className="info">
        <span className="title">{cartItem?.course?.name}</span>
        <span className="author">
          <b>Tác giả: </b>
          {cartItem?.course?.author?.fullName}
        </span>
        {!cartItem?.wishlist && (
          <form
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              height: 35,
            }}
          >
            <Input placeholder="Nhập coupon" style={{ height: 35 }} />
            <Button variant="contained" color="success">
              Áp dụng mã
            </Button>
          </form>
        )}
      </div>
      <div className="price">
        <span>
          <b>Giá: </b>
          <span>{numberLocale(cartItem?.course?.currentPrice)} đồng</span>
        </span>
        <span>
          <b>Giá giảm: </b>
          {numberLocale(cartItem?.course?.discount)} đồng
        </span>
      </div>
      <div className="handle">
        {cartItem?.wishlist ? (
          <span onClick={handleAddToBuy}>Thêm vô giỏ hàng</span>
        ) : (
          <span onClick={handleBuyLater}>Mua sau</span>
        )}
        <span onClick={handleDeleteCart}>Loại bỏ</span>
      </div>
    </div>
  );
};

export default CartItem;
