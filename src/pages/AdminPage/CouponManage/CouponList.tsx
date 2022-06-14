import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import couponApi from "src/apis/couponApi";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import Table from "src/components/Table/Table";
import { statusTypes } from "src/data";
import useTypingDebounce from "src/hooks/useTypingDebounce";
import { ICounpon } from "src/types";
import { getHeaderColumns, getNewHeaderColumn } from "src/utils/table";
import CouponDetail from "./CouponDetail";
import CreateCoupon from "./CreateCoupon";
import MultiDeleteCoupon from "./MultiDeleteCoupon";
import UpdateCoupon from "./UpdateCoupon";

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
    field: "startDate",
    headerName: "Ngày bắt đầu",
    width: 160,
  },
  {
    field: "expireDate",
    headerName: "Ngày hết hạn",
    width: 160,
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
  const [coupons, setCoupons] = useState<ICounpon[]>([]);
  const [couponIds, setCouponIds] = useState<string[] | number[]>([]);
  const [couponId, setCouponId] = useState<string | number>("");
  const [isActive, setIsActive] = useState<boolean>(true);

  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  //debounce
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [title, setTitle] = useState<string>();

  // modal
  const [showMultiDelete, setShowMultiDelete] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  useEffect(() => {
    getCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    showMultiDelete,
    showCreate,
    showUpdate,
    isActive,
    title,
    page,
    pageSize,
  ]);

  useEffect(() => {
    setTitle(debouncedValue);
  }, [debouncedValue]);

  const getCoupons = async () => {
    setLoading(true);
    const params = { page, limit: pageSize, active: isActive, title };

    try {
      const response = await couponApi.getCoupons(params);
      const { coupons, total }: any = response;
      // console.log("coupon", response);

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

  const handleMultiDeleted = (ids: string[] | number[]) => {
    setCouponIds(ids);
    setShowMultiDelete(true);
  };
  const handleViewDetail = (id: string | number) => {
    setCouponId(id);
    setShowDetail(true);
  };
  const handleModifyItem = (id: string | number) => {
    setCouponId(id);
    setShowUpdate(true);
  };

  return (
    <>
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
              placeholder="Nhập tên mã giảm giá"
              onChange={(e: any) => setValue(e.target.value)}
            />

            <InputSelect
              defaultValue={isActive}
              list={statusTypes}
              onChange={(e) => setIsActive(e.target.value)}
            />
          </Box>
        }
        getRowId={(row) => row._id}
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
        total={total}
        titleBtnMultiDelete="Xoá mã khuyến mãi"
        titleBtnAdd="Tạo mã giảm giá mới"
        isLoading={loading}
        title="Danh sách thông tin mã giảm giá"
        columnsData={columsHeader}
        rowsData={coupons}
        handleAddItem={() => setShowCreate(true)}
        onViewItemDetail={handleViewDetail}
        onModifyItem={handleModifyItem}
        onDeleteSelectMultiItem={handleMultiDeleted}
      />
      <CreateCoupon
        show={showCreate}
        onClose={() => setShowCreate(false)}
        setShow={setShowCreate}
      />
      <MultiDeleteCoupon
        ids={couponIds}
        show={showMultiDelete}
        onClose={() => setShowMultiDelete(false)}
        setShow={setShowMultiDelete}
      />
      <CouponDetail
        id={couponId}
        show={showDetail}
        onClose={() => setShowDetail(false)}
      />
      <UpdateCoupon
        id={couponId}
        show={showUpdate}
        onClose={() => setShowUpdate(false)}
        setShow={setShowUpdate}
      />
    </>
  );
};

export default CouponList;
