import React from "react";
import Image from "src/components/Image/Image";
import { ICart } from "src/types/cart";
import "./CartItem.scss";

interface CartItemProps {
  cartItem?: ICart;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  console.log(cartItem);

  return (
    <div className="cart-item">
      <div className="image">
        <Image width={250} src={cartItem?.course?.thumbnail} />
      </div>
      <div className="info">
        <span className="title">{cartItem?.course?.name}</span>
      </div>
    </div>
  );
};

export default CartItem;
