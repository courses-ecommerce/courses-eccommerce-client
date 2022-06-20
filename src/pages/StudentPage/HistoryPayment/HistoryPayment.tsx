import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "src/apis/userApi";
import Table from "src/components/Table/Table";
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
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "transactionId",
    headerName: "Mã giao dịch",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "paymentMethod",
    headerName: "Phương thức thanh toán",
    width: 220,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "paymentPrice",
    headerName: "Giá mua",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "totalDiscount",
    headerName: "Giảm giá",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
];

const HistoryPayment = () => {
  document.title = "Lịch sử thanh toán";
  const [loading, setLoading] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<IInvoice[]>([]);

  //pagination
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    getHistoryPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, page]);

  const getHistoryPayment = async () => {
    try {
      const response = await userApi.getHistoryPayment();
      console.log("ádadas", response);
      const { invoices, total }: any = response;
      console.log("invoices", invoices);
      if (invoices.length > 0) {
        const keys = getHeaderColumns(invoices[0]);
        const data = getNewHeaderColumn(invoices, keys, page, pageSize);

        const invoiceData = data.map((data, index) => {
          return {
            ...data,
          };
        });
        setInvoices(invoiceData);
      } else {
        setInvoices(invoices);
      }
      setLoading(false);
      setTotal(total);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="history-payment">
      {/* <h3>Lịch sử thanh toán</h3> */}
      <Table
        title="Danh sách thông tin lịch sử thanh toán"
        titleBtnAdd="Tạo tài khoản mới"
        isLoading={loading}
        columnsData={columsHeader}
        getRowId={(row) => row._id}
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
        total={total}
        rowsData={invoices}
        btnAdd={false}
        isCheckBoxSelection={false}
        isModify={false}
        btnMultiDeleted={false}
        onViewItemDetail={(id) => navigate(`${id}`)}
        // handleAddItem={handleCreate}
        // onDeleteItem={handleDelete}
        // onModifyItem={handleModifyItem}
        // onDeleteSelectMultiItem={handleMultiDeleted}
      />
    </div>
  );
};

export default HistoryPayment;
