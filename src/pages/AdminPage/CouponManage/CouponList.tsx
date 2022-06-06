import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import couponApi from "src/apis/couponApi";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import Table from "src/components/Table/Table";
import { statusTypes } from "src/data";
import useTypingDebounce from "src/hooks/useTypingDebounce";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils/table";

const columsHeader: GridColDef[] = [
  {
    field: "_id",
    headerName: "STT",
    width: 100,
    hide: true,
  },
  {
    field: "id",
    headerName: "STT",
    width: 60,
    align: "center",
    headerAlign: "center",
  },

  {
    field: "title",
    headerName: "Mã khuyến mãi",
    width: 200,
  },
  {
    field: "author",
    headerName: "Người tạo",
    width: 200,
  },
  {
    field: "isActive",
    headerName: "Trạng thái",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "expireDate",
    headerName: "Ngày hết hạn",
    width: 200,
  },
  {
    field: "apply",
    headerName: "Áp dụng",
    width: 100,
  },
];

const CouponList = () => {
  document.title = "Quản lý mã giảm giá";
  const [loading, setLoading] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<any>([]);
  const [isActive, setIsActive] = useState<boolean>(true);

  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  //debounce
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [email, setEmail] = useState<string>();

  // modal
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showMultiDelete, setShowMultiDelete] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  useEffect(() => {
    getCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    showDelete,
    showMultiDelete,
    showCreate,
    showUpdate,
    isActive,
    email,
    page,
    pageSize,
  ]);

  const getCoupons = async () => {
    setLoading(true);
    const params = { page, limit: pageSize, active: isActive };

    try {
      const response = await couponApi.getCoupons(params);
      const { coupons, total }: any = response;
      console.log("coupon", response);

      if (coupons.length > 0) {
        const keys = getHeaderColumns(coupons[0]);
        const data = getNewHeaderColumn(coupons, keys, page, pageSize);

        const couponData = data.map((data, index) => {
          return {
            ...data,
            author: coupons[index].author.fullName,
          };
        });

        setCoupons(couponData);
      } else {
        setCoupons(coupons);
      }
      setLoading(false);
      setTotal(total);
    } catch (error) {
      console.log("lỗi rồi", { error });
      setLoading(false);
    }
  };

  return (
    <Table
      btnSearch={
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Input
            style={{ width: 250 }}
            placeholder="Tìm kiếm bằng địa chỉ email"
            onChange={(e: any) => setValue(e.target.value)}
          />

          <InputSelect
            defaultValue={isActive}
            list={statusTypes}
            onChange={(e) => setIsActive(e.target.value)}
          />
        </Box>
      }
      titleBtnAdd="Tạo mã giảm giá mới"
      isLoading={loading}
      title="Danh sách thông tin mã giảm giá"
      columnsData={columsHeader}
      rowsData={coupons}
      total={total}
      // handleAddItem={handleCreate}
      // onDeleteItem={handleDelete}
      // onModifyItem={handleModifyItem}
      // onDeleteSelectMultiItem={handleMultiDeleted}
    />
  );
};

export default CouponList;
