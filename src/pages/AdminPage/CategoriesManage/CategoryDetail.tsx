import React, { useEffect, useState } from "react";
import categoryApi from "src/apis/categoryApi";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import ModalContainer from "src/components/ModalContainer";
import { categoryTypes, statusTypes } from "src/data/searchInfo";
import { ICategory } from "src/types";

interface CategoryDetailProps {
  id: string | number;
  show?: boolean;
  onClose?: () => void;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({
  id,
  show = false,
  onClose,
}) => {
  const [categoryDetail, setCategoryDetail] = useState<ICategory>({});

  useEffect(() => {
    id && getCategoryDetail(id);
  }, [id]);

  const getCategoryDetail = async (id: any) => {
    try {
      const response = await categoryApi.getCategoryDetail(id);
      const { category }: any = response;
      setCategoryDetail(category);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <ModalContainer
      width={700}
      title="Thông tin chi tiết danh mục"
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
        <InputSelect
          label="Trạng thái"
          list={categoryTypes}
          defaultValue={categoryDetail.isPending}
          disabled
        />
      </form>
    </ModalContainer>
  );
};

export default CategoryDetail;
