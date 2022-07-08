import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import invoicesApi from "src/apis/invoicesApi";
import Input from "src/components/Input";
import Table from "src/components/Table/Table";
import useTypingDebounce from "src/hooks/useTypingDebounce";
import { IInvoice } from "src/types/invoice";
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
    field: "transactionId",
    headerName: "Mã giao dịch",
    width: 180,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "paymentMethod",
    headerName: "Phương thức thanh toán",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Ngày mua",
    width: 180,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "fullName",
    headerName: "Người mua",
    width: 150,
  },
  {
    field: "totalPrice",
    headerName: "Thành tiền",
    width: 150,
  },
];

export default function InvoiceList() {
  document.title = "Quản lý hoá đơn";

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<IInvoice[]>([]);

  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  //debounce
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [name, setName] = useState<string>();

  useEffect(() => {
    getInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, name]);

  useEffect(() => {
    setName(debouncedValue);
  }, [debouncedValue]);

  //   const goToCourseDetail = (id: any) => {
  //     let data: any;
  //     data = invoices.filter((invoices) => invoices._id === id);
  //     // console.log("data nef", data[0].slug);
  //     navigate(`${data[0].slug}`);
  //   };

  const getInvoices = async () => {
    setLoading(true);
    const params = { page, limit: pageSize, name };
    try {
      const response = await invoicesApi.getInvoices(params);
      //   console.log("response", response);
      const { invoices, total }: any = response;

      if (invoices.length > 0) {
        const keys = getHeaderColumns(invoices[0]);
        const data = getNewHeaderColumn(invoices, keys, page, pageSize);

        const invoiceData = data.map((data, index) => {
          return {
            ...data,
            fullName: invoices[index].user.fullName,
          };
        });
        console.log("courseData", invoiceData);
        setInvoices(invoiceData);
      } else {
        setInvoices(invoices);
      }

      setLoading(false);
      setTotal(total);
    } catch (error) {
      setLoading(false);
      console.log("lỗi rồi", { error });
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
            placeholder="Nhập tên khoá học"
            onChange={(e: any) => setValue(e.target.value)}
          />

          {/* <InputSelect
        defaultValue={publish}
        list={statusTypes}
        onChange={(e) => setPublish(e.target.value)}
      /> */}
        </Box>
      }
      isLoading={loading}
      title="Danh sách thông tin hoá đơn"
      columnsData={columsHeader}
      getRowId={(row) => row._id}
      onPage={(page) => setPage(Number(page))}
      onPageSize={(pageSize) => setPageSize(Number(pageSize))}
      total={total}
      rowsData={invoices}
      btnAdd={false}
      //   onViewItemDetail={goToCourseDetail}
      isModify={false}
      btnMultiDeleted={false}
      isCheckBoxSelection={false}
      // handleAddItem={handleCreate}
      // onDeleteItem={handleDelete}
      // onModifyItem={handleModifyItem}
      // onDeleteSelectMultiItem={handleMultiDeleted}
    />
  );
}
