import React, { useEffect, useState } from "react";
import categoryApi from "src/apis/categoryApi";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import ModalContainer from "src/components/ModalContainer";
import { statusTypes } from "src/data";
import { ICategory } from "src/types";

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
  const [categoryDetail, setCouponDetail] = useState<ICategory>({});

  useEffect(() => {
    id && getCouponDetail(id);
  }, [id]);

  const getCouponDetail = async (id: any) => {
    try {
      // const response = await categoryApi.getCouponDetail(id);
      // const { category }: any = response;
      // setCouponDetail(category);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <ModalContainer
      width={700}
      title="Thông tin chi tiết mã giảm giá"
      open={show}
      onClose={onClose}
    >
      <form>
        <Input label="Tên danh mục" value={categoryDetail.name} disabled />
        <Input label="slug" value={categoryDetail.slug} disabled />

        <InputSelect
          label="Xuất bản"
          list={statusTypes}
          defaultValue={categoryDetail.publish}
          disabled
        />
      </form>
    </ModalContainer>
  );
};

export default CouponDetail;
