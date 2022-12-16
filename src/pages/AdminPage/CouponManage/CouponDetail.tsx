import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import couponApi from "src/apis/couponApi";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import ModalContainer from "src/components/ModalContainer";
import { discountApplyTypes, discountTypes } from "src/data/searchInfo";
import { ICoupon } from "src/types/cart";

import formatDate from "src/utils/formatDay";

interface CouponDetailProps {
  id: string | number;
  show?: boolean;
  onClose?: () => void;
}

const CouponDetail: React.FC<CouponDetailProps> = ({
  id,
  show = false,
  onClose,
}) => {
  const [couponDetail, setCouponDetail] = useState<ICoupon>({});

  useEffect(() => {
    id && getCategoryDetail(id);
  }, [id]);

  const getCategoryDetail = async (id: any) => {
    try {
      const response = await couponApi.getCouponDetail(id);
      const { coupon }: any = response;
      // console.log("details laf", response);
      setCouponDetail(coupon);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <ModalContainer
      title="Thông tin chi tiết mã giảm giá"
      open={show}
      onClose={onClose}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Input
            label="Tên mã giảm giá"
            placeholder="Nhập tên mã giảm giá"
            value={couponDetail.title}
            disabled
          />
          <Input
            label="Người tạo"
            placeholder="Nhập tên mã giảm giá"
            value={couponDetail.author?.fullName}
            disabled
          />
          <InputSelect
            label="Đơn vị tính"
            list={discountTypes}
            defaultValue={couponDetail.type}
            disabled
          />
          <Input
            disabled
            label="Ngày bắt đầu"
            // type="datetime-local"
            value={formatDate.getDate(
              couponDetail.startDate,
              "dd-MM-yyyy hh:mm"
            )}
          />
          <Input
            disabled
            label="Ngày hết hạn"
            // type="datetime-local"
            value={formatDate.getDate(
              couponDetail.expireDate,
              "dd-MM-yyyy hh:mm"
            )}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <InputSelect
            disabled
            label="Phạm vi áp dụng"
            list={discountApplyTypes}
            defaultValue={couponDetail.apply}
          />
          <Input
            disabled
            label="Còn lại"
            placeholder="Nhập số lượng giảm"
            value={`${couponDetail.remain}/${couponDetail.number}`}
          />

          <Input
            disabled
            label={`Số lượng giảm ${
              couponDetail.type === "percent" ? "(Phần trăm)" : "(VNĐ)"
            }`}
            placeholder="Nhập số lượng giảm"
            value={couponDetail.amount}
          />
          <Input
            disabled
            label="Giảm giá tối đa (VNĐ) - Chỉ dành cho đơn vị tính là %"
            placeholder="Nhập giá tối đa"
            value={couponDetail.maxDiscount}
          />
          <Input
            disabled
            label="Giá tối thiểu (VNĐ)"
            placeholder="Nhập giá tối thiểu"
            value={couponDetail.minPrice}
          />
        </Box>
      </form>
    </ModalContainer>
  );
};

export default CouponDetail;
