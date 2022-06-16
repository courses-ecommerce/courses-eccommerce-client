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
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  // console.log(cartItem);
  const dispatch = useDispatch();

  const handleDeleteCart = async () => {
    dispatch(isPending());
    try {
      const response = await cartApi.removeItemFromCart(cartItem?.course?._id);
      const { carts }: any = response;
      // console.log("carts", carts.length);
      dispatch(getTotalCart(carts.length));

      dispatch(isSuccess());
      toast.success("Xoá khoá học thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      toast.warning("Xoá khoá học thất bại", { position: "bottom-right" });
    }
  };

  const handleBuyLater = async () => {
    const params = { wishlist: true, coupon: "" };
    try {
      const response = await cartApi.addCouponToCart(
        cartItem?.course?._id,
        params
      );

      console.log(response);
    } catch (error) {
      console.log("lỗi rồi", { error });
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
        <form
          style={{ display: "flex", flexDirection: "row", gap: 2, height: 35 }}
        >
          <Input placeholder="Nhập coupon" style={{ height: 35 }} />
          <Button variant="contained" color="success">
            Áp dụng mã
          </Button>
        </form>
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
        <span onClick={handleBuyLater}>Mua sau</span>
        <span onClick={handleDeleteCart}>Loại bỏ</span>
      </div>
    </div>
  );
};

export default CartItem;
